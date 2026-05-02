'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Strikethrough,
  Underline,
  Minus,
  Table,
  Undo2,
  Redo2,
  Maximize2,
  Type,
  Code,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Settings2,
  TableProperties,
  ArrowDownToLine,
  ArrowRightToLine
} from 'lucide-react'
import { cn } from '@/lib/utils'
import MediaPickerModal from './MediaPickerModal'

interface WPEditorProps {
  id?: string
  name?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  slug?: string
}

export default function WPEditor({ id, name, value, onChange, placeholder, slug }: WPEditorProps) {
  const [mode, setMode] = useState<'visual' | 'code'>('visual')
  const [showMediaPicker, setShowMediaPicker] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showAdvancedToolbar, setShowAdvancedToolbar] = useState(false)
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({})
  const editorRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  const updateActiveFormats = useCallback(() => {
    if (mode === 'visual') {
      setActiveFormats({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        strikethrough: document.queryCommandState('strikethrough'),
        underline: document.queryCommandState('underline'),
        insertUnorderedList: document.queryCommandState('insertUnorderedList'),
        insertOrderedList: document.queryCommandState('insertOrderedList'),
        justifyLeft: document.queryCommandState('justifyLeft'),
        justifyCenter: document.queryCommandState('justifyCenter'),
        justifyRight: document.queryCommandState('justifyRight'),
        justifyFull: document.queryCommandState('justifyFull'),
      })
    }
  }, [mode])

  // Monitor selection changes for active format updates
  useEffect(() => {
    document.addEventListener('selectionchange', updateActiveFormats)
    return () => document.removeEventListener('selectionchange', updateActiveFormats)
  }, [updateActiveFormats])

  // Sync state to visual editor when it's first loaded or when switching to visual mode
  useEffect(() => {
    if (mode === 'visual' && editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '<p><br></p>'
    }
  }, [mode, value])

  const handleVisualChange = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML
      if (html !== value) {
        onChange(html)
      }
    }
  }

  const execCommand = (command: string, value: string | undefined = undefined) => {
    if (mode === 'visual') {
      document.execCommand(command, false, value)
      handleVisualChange()
      updateActiveFormats()
      editorRef.current?.focus()
    } else {
      // Code mode logic (original tag wrapping)
      wrapSelection(command, value)
    }
  }

  const wrapSelection = (command: string, cmdValue?: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    let prefix = ''
    let suffix = ''

    switch (command) {
      case 'bold': prefix = '<strong>'; suffix = '</strong>'; break
      case 'italic': prefix = '<em>'; suffix = '</em>'; break
      case 'strikethrough': prefix = '<del>'; suffix = '</del>'; break
      case 'underline': prefix = '<u>'; suffix = '</u>'; break
      case 'insertUnorderedList': prefix = '<ul>\n  <li>'; suffix = '</li>\n</ul>'; break
      case 'insertOrderedList': prefix = '<ol>\n  <li>'; suffix = '</li>\n</ol>'; break
      case 'formatBlock': 
        if (cmdValue === 'blockquote') { prefix = '<blockquote>'; suffix = '</blockquote>' }
        else { prefix = `<${cmdValue}>`; suffix = `</${cmdValue}>` }
        break
      default: break
    }

    const newText = value.substring(0, start) + prefix + selectedText + suffix + value.substring(end)
    onChange(newText)

    setTimeout(() => {
      textarea.focus()
      const newCursorPos = selectedText
        ? start + prefix.length + selectedText.length + suffix.length
        : start + prefix.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const handleMediaInsert = (url: string) => {
    const altText = prompt('Enter alt text for the image (important for SEO/accessibility):', 'image') || 'image'
    const imgHtml = `<figure style="display: block; width: 60%; max-width: 100%; margin: 1.5rem auto;" class="wp-image-wrapper">
      <img src="${url}" alt="${altText}" style="width: 100%; height: auto; display: block;" class="rounded-lg shadow-md" />
      <figcaption contenteditable="true" style="text-align: center; color: #6b7280; font-size: 0.875rem; margin-top: 0.5rem; padding: 0.25rem; min-height: 1.5rem; outline: none; font-style: italic; border: 1px dashed transparent;" title="Type caption here">Type caption for image (optional)</figcaption>
    </figure><p><br></p>`
    if (mode === 'visual') {
      execCommand('insertHTML', imgHtml)
    } else {
      const textarea = textareaRef.current
      if (!textarea) return
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newText = value.substring(0, start) + imgHtml + value.substring(end)
      onChange(newText)
    }
  }

  const handleHeadingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    if (mode === 'visual') {
      execCommand('formatBlock', val)
    } else {
      wrapSelection('formatBlock', val)
    }
    e.target.value = "" // Reset select
  }

  const handleInsertLink = () => {
    const url = prompt('Enter URL:')
    if (!url) return

    if (mode === 'visual') {
      execCommand('createLink', url)
    } else {
      const textarea = textareaRef.current
      if (!textarea) return
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = value.substring(start, end) || 'link text'
      const newText = value.substring(0, start) + `<a href="${url}" class="text-accent hover:underline">${selectedText}</a>` + value.substring(end)
      onChange(newText)
    }
  }

  const handleInsertTable = () => {
    const rowsStr = prompt('Number of rows:', '2')
    const colsStr = prompt('Number of columns:', '2')
    if (!rowsStr || !colsStr) return
    const rows = parseInt(rowsStr, 10)
    const cols = parseInt(colsStr, 10)
    if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) return

    let tableHtml = '\n<div style="width: 100%; border: 1px dashed transparent; padding: 4px;" class="wp-table-wrapper"><table class="w-full border-collapse border border-gray-200 my-4">\n  <thead>\n    <tr>\n'
    for (let c = 0; c < cols; c++) {
      tableHtml += `      <th class="border border-gray-200 p-2 bg-gray-50">&nbsp;</th>\n`
    }
    tableHtml += '    </tr>\n  </thead>\n  <tbody>\n'
    for (let r = 0; r < rows; r++) {
      tableHtml += '    <tr>\n'
      for (let c = 0; c < cols; c++) {
        tableHtml += '      <td class="border border-gray-200 p-2">&nbsp;</td>\n'
      }
      tableHtml += '    </tr>\n'
    }
    tableHtml += '  </tbody>\n</table></div>\n<p><br></p>\n'

    if (mode === 'visual') {
      execCommand('insertHTML', tableHtml)
    } else {
      const textarea = textareaRef.current
      if (!textarea) return
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newText = value.substring(0, start) + tableHtml + value.substring(end)
      onChange(newText)
    }
  }

  const handleAddRow = () => {
    if (mode !== 'visual') return
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return
    let node: Node | null = selection.anchorNode
    while (node && node.nodeName !== 'TR' && node !== editorRef.current) {
      node = node.parentNode
    }
    if (!node || node === editorRef.current) {
      alert('Please place cursor inside a table row to add a new row.')
      return
    }
    const tr = node as HTMLTableRowElement
    const cols = tr.children.length
    const newTr = document.createElement('tr')
    for(let i=0; i<cols; i++) {
      const td = document.createElement('td')
      td.className = "border border-gray-200 p-2"
      td.innerHTML = "&nbsp;"
      newTr.appendChild(td)
    }
    tr.parentNode?.insertBefore(newTr, tr.nextSibling)
    handleVisualChange()
  }

  const handleAddCol = () => {
    if (mode !== 'visual') return
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return
    let node: Node | null = selection.anchorNode
    while (node && node.nodeName !== 'TD' && node.nodeName !== 'TH' && node !== editorRef.current) {
      node = node.parentNode
    }
    if (!node || node === editorRef.current) {
      alert('Please place cursor inside a table cell to add a new column.')
      return
    }
    const cell = node as HTMLTableCellElement
    const tr = cell.parentNode as HTMLTableRowElement
    const table = tr.closest('table')
    if (!table) return
    
    const cellIndex = Array.from(tr.children).indexOf(cell)
    
    const allRows = table.querySelectorAll('tr')
    allRows.forEach(row => {
      const isHeader = row.parentNode?.nodeName === 'THEAD'
      const newCell = document.createElement(isHeader ? 'th' : 'td')
      newCell.className = isHeader ? "border border-gray-200 p-2 bg-gray-50" : "border border-gray-200 p-2"
      newCell.innerHTML = "&nbsp;"
      const referenceCell = row.children[cellIndex]
      if (referenceCell) {
        row.insertBefore(newCell, referenceCell.nextSibling)
      } else {
        row.appendChild(newCell)
      }
    })
    handleVisualChange()
  }

  const handleInsertReadMore = () => {
    if (mode === 'visual') {
      execCommand('insertHTML', '<hr class="wp-read-more" style="border:0; height:1px; background:#ccc; margin:20px 0; display:block;" data-content="READ MORE" />')
    } else {
      wrapSelection('insertHTML', '<!--more-->')
    }
  }

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Removed prompt to favor mouse drag resizing
  }

  const primaryToolbarButtons = [
    { icon: Bold, label: 'Bold', action: () => execCommand('bold'), commandName: 'bold' },
    { icon: Italic, label: 'Italic', action: () => execCommand('italic'), commandName: 'italic' },
    null,
    { icon: List, label: 'Bulleted list', action: () => execCommand('insertUnorderedList'), commandName: 'insertUnorderedList' },
    { icon: ListOrdered, label: 'Numbered list', action: () => execCommand('insertOrderedList'), commandName: 'insertOrderedList' },
    { icon: Quote, label: 'Blockquote', action: () => execCommand('formatBlock', 'blockquote'), commandName: 'formatBlock' },
    null,
    { icon: AlignLeft, label: 'Align left', action: () => execCommand('justifyLeft'), commandName: 'justifyLeft' },
    { icon: AlignCenter, label: 'Align center', action: () => execCommand('justifyCenter'), commandName: 'justifyCenter' },
    { icon: AlignRight, label: 'Align right', action: () => execCommand('justifyRight'), commandName: 'justifyRight' },
    null,
    { icon: LinkIcon, label: 'Insert link', action: handleInsertLink },
    { icon: MoreHorizontal, label: 'Insert Read More tag', action: handleInsertReadMore },
  ]

  const advancedToolbarButtons = [
    { icon: Strikethrough, label: 'Strikethrough', action: () => execCommand('strikethrough'), commandName: 'strikethrough' },
    { icon: Underline, label: 'Underline', action: () => execCommand('underline'), commandName: 'underline' },
    { icon: Minus, label: 'Horizontal line', action: () => execCommand('insertHorizontalRule') },
    { icon: Table, label: 'Insert Table', action: handleInsertTable },
    { icon: ArrowDownToLine, label: 'Add Row Below', action: handleAddRow },
    { icon: ArrowRightToLine, label: 'Add Col Right', action: handleAddCol },
  ]

  const codeHelperButtons = [
    { label: 'b', title: 'Bold', action: () => wrapSelection('bold') },
    { label: 'i', title: 'Italic', action: () => wrapSelection('italic') },
    { label: 'link', title: 'Link', action: handleInsertLink },
    { label: 'b-quote', title: 'Blockquote', action: () => wrapSelection('formatBlock', 'blockquote') },
    { label: 'del', title: 'Strikethrough', action: () => wrapSelection('strikethrough'), highlight: true },
    { label: 'img', title: 'Image', action: () => setShowMediaPicker(true) },
    { label: 'ul', title: 'UL', action: () => wrapSelection('insertUnorderedList') },
    { label: 'ol', title: 'OL', action: () => wrapSelection('insertOrderedList') },
    { label: 'code', title: 'Code', action: () => {
      const textarea = textareaRef.current
      if (!textarea) return
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selected = value.substring(start, end)
      onChange(value.substring(0, start) + '<code>' + selected + '</code>' + value.substring(end))
    }},
    { label: 'more', title: 'Read more', action: () => {
      const textarea = textareaRef.current
      if (!textarea) return
      const start = textarea.selectionStart
      onChange(value.substring(0, start) + '<!--more-->' + value.substring(start))
    }},
  ]

  return (
    <>
      <div className={cn(
        "border border-gray-300 rounded-sm bg-white overflow-hidden shadow-sm flex flex-col",
        isFullscreen && "fixed inset-0 z-[60] rounded-none h-screen"
      )}>
        {/* Permalink Display */}
        {slug !== undefined && (
          <div className="px-4 py-2 bg-white border-b border-gray-200 text-sm text-gray-600 flex items-center gap-2">
            <span className="font-medium text-gray-500">Permalink:</span>
            <span className="text-blue-600 underline truncate">
              {typeof window !== 'undefined' ? window.location.origin : ''}/blog/{slug || 'post-slug'}
            </span>
            <button type="button" className="px-2 py-0.5 text-xs border border-gray-300 rounded-sm bg-[#f7f7f7] hover:bg-white text-gray-600 transition-colors ml-2">
              Edit
            </button>
          </div>
        )}

        {/* Editor Tabs */}
        <div className="flex items-center justify-between bg-[#f1f1f1] border-b border-gray-300 px-2 pt-2">
          <div className="flex gap-2 pb-2 pl-2">
            <button
              type="button"
              onClick={() => setShowMediaPicker(true)}
              className="flex items-center gap-2 border border-gray-400 bg-[#f7f7f7] hover:bg-white text-gray-700 px-3 py-1 text-sm rounded-sm font-medium transition-colors"
            >
              <ImageIcon className="w-4 h-4 text-blue-600" />
              Add Media
            </button>
          </div>
          <div className="flex">
            <button
              type="button"
              onClick={() => setMode('visual')}
              className={cn(
                "px-4 py-1.5 text-[13px] border-t border-l border-r rounded-t-sm -mb-px transition-colors",
                mode === 'visual'
                  ? "bg-white border-gray-300 text-gray-800 font-bold"
                  : "bg-transparent border-transparent text-gray-600 hover:text-gray-800"
              )}
            >
              Visual
            </button>
            <button
              type="button"
              onClick={() => setMode('code')}
              className={cn(
                "px-4 py-1.5 text-[13px] border-t border-l border-r rounded-t-sm -mb-px transition-colors",
                mode === 'code'
                  ? "bg-white border-gray-300 text-gray-800 font-bold"
                  : "bg-transparent border-transparent text-gray-600 hover:text-gray-800"
              )}
            >
              Code
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 px-3 py-2 flex flex-wrap gap-1 items-center sticky top-0 z-10">
          {mode === 'visual' ? (
            <>
              <select
                onChange={handleHeadingChange}
                defaultValue=""
                className="text-[13px] border border-gray-300 rounded-sm py-0.5 px-2 focus:outline-none focus:border-blue-500 bg-white mr-3 text-gray-700 cursor-pointer h-7"
              >
                <option value="" disabled>Paragraph</option>
                <option value="p">Paragraph</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="h4">Heading 4</option>
                <option value="pre">Preformatted</option>
              </select>

              {primaryToolbarButtons.map((btn, idx) => {
                if (btn === null) return <div key={`sep1-${idx}`} className="w-px h-5 bg-gray-300 mx-2" />
                const Icon = btn.icon
                const isActive = btn.commandName ? activeFormats[btn.commandName] : false
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={btn.action}
                    title={btn.label}
                    className={cn("p-1.5 rounded-sm transition-colors", isActive ? "text-blue-600 bg-blue-50 border border-blue-200" : "text-gray-600 hover:text-blue-600 hover:bg-gray-100")}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </button>
                )
              })}

              <div className="flex-1" />
              <button
                type="button"
                onClick={() => setShowAdvancedToolbar(!showAdvancedToolbar)}
                title="Toolbar Toggle"
                className={cn("p-1 rounded-sm transition-colors ml-auto mr-2", showAdvancedToolbar ? "text-blue-600 bg-blue-50 border border-blue-200" : "text-gray-600 hover:text-blue-600 hover:bg-gray-100")}
              >
                <Settings2 className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="flex flex-wrap gap-1">
              {codeHelperButtons.map((btn, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={btn.action}
                  title={btn.title}
                  className={cn(
                    "px-2 py-0.5 text-[11px] border rounded-sm font-medium transition-colors min-w-[28px] h-7",
                    btn.highlight
                      ? "border-gray-400 bg-gray-600 text-white hover:bg-gray-700"
                      : "border-gray-300 bg-[#f7f7f7] text-gray-700 hover:bg-white hover:border-gray-400"
                  )}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title="Fullscreen"
            className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Advanced Toolbar row */}
        {mode === 'visual' && showAdvancedToolbar && (
          <div className="bg-gray-50 border-b border-gray-200 px-3 py-1 flex flex-wrap gap-1 items-center sticky top-[44px] z-10">
            {advancedToolbarButtons.map((btn, idx) => {
                const Icon = btn.icon
                const isActive = btn.commandName ? activeFormats[btn.commandName] : false
                return (
                  <button
                    key={`adv-${idx}`}
                    type="button"
                    onClick={btn.action}
                    title={btn.label}
                    className={cn("p-1.5 rounded-sm transition-colors", isActive ? "text-blue-600 bg-blue-50 border border-blue-200" : "text-gray-600 hover:text-blue-600 hover:bg-gray-200")}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </button>
                )
            })}
          </div>
        )}

        {/* Content Area */}
        <div className={cn("relative flex-1 bg-white", isFullscreen ? "min-h-0 overflow-y-auto" : "min-h-[400px] max-h-[600px] overflow-y-auto")}>
          {mode === 'visual' ? (
            <div
              ref={editorRef}
              contentEditable
              onInput={handleVisualChange}
              onBlur={handleVisualChange}
              onMouseUp={updateActiveFormats}
              onKeyUp={updateActiveFormats}
              onClick={handleImageClick}
              className="w-full h-full p-6 focus:outline-none prose prose-sm max-w-none prose-primary"
              style={{ 
                minHeight: '400px',
                fontFamily: "Georgia, 'Times New Roman', serif",
                lineHeight: '1.6'
              }}
            />
          ) : (
            <textarea
              ref={textareaRef}
              id={id}
              name={name}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder || 'Write your HTML code here...'}
              className="w-full h-full p-4 resize-none focus:outline-none font-mono text-[13px] leading-relaxed bg-[#f9f9f9] border-t-2 border-red-400"
              style={{ minHeight: '400px' }}
            />
          )}
        </div>

        {/* Footer Info */}
        <div className="px-4 py-2 bg-[#f5f5f5] border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
          <div className="flex gap-5">
            <span>Word count: {value.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length}</span>
            <span>Character count: {value.replace(/<[^>]*>/g, '').length} (excluding HTML)</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
             Ready
          </div>
        </div>
      </div>

      <MediaPickerModal
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={handleMediaInsert}
      />
      
      <style jsx global>{`
        [contenteditable] {
          cursor: text;
        }
        [contenteditable]:empty:before {
          content: "${placeholder || 'Start writing...'}";
          color: #94a3b8;
          pointer-events: none;
        }
        .prose img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1.5rem auto;
        }
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }
        .prose table th, .prose table td {
          border: 1px solid #e2e8f0;
          padding: 0.75rem;
        }
        .wp-image-wrapper {
          resize: both;
          overflow: hidden;
        }
        .wp-table-wrapper {
          resize: both;
          overflow: hidden;
          border: 1px dashed #ccc !important;
        }
        hr.wp-read-more {
          display: flex;
          align-items: center;
          justify-content: center;
          border: none !important;
          border-top: 1px dashed #ccc !important;
          margin: 2rem 0 !important;
          position: relative;
          background: transparent !important;
          height: 1px !important;
        }
        hr.wp-read-more::after {
          content: "READ MORE";
          position: absolute;
          top: -10px;
          background: #fff;
          padding: 0 10px;
          font-size: 10px;
          color: #999;
          font-weight: bold;
          border: 1px solid #ccc;
          border-radius: 2px;
        }
      `}</style>
    </>
  )
}
