'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import { Upload, Trash2, Copy, Check, ImageIcon, FileText, Film, X, Loader2, Search } from 'lucide-react'
import { uploadMediaAction, deleteMediaAction, listMediaAction } from './actions'

interface MediaFile {
  name: string
  url: string
  size: number
  type: string
  created_at: string
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

function getFileIcon(type: string) {
  if (type.startsWith('image/')) return ImageIcon
  if (type.startsWith('video/')) return Film
  return FileText
}

export default function MediaPageClient({ initialFiles }: { initialFiles: MediaFile[] }) {
  const [files, setFiles] = useState<MediaFile[]>(initialFiles)
  const [uploading, setUploading] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [isPending, startTransition] = useTransition()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredFiles = files.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadMediaAction(formData)

    if (result.error) {
      alert(`Upload failed: ${result.error}`)
    } else {
      // Refresh the file list
      startTransition(async () => {
        const fresh = await listMediaAction()
        setFiles(fresh.files || [])
      })
    }

    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleDelete = async (path: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    const formData = new FormData()
    formData.append('path', path)
    const result = await deleteMediaAction(formData)

    if (result.error) {
      alert(`Delete failed: ${result.error}`)
    } else {
      setFiles(prev => prev.filter(f => f.name !== path))
      if (selectedFile?.name === path) setSelectedFile(null)
    }
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary mb-1">Media Library</h1>
          <p className="text-text-secondary">Upload and manage images for your blog posts.</p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/mp4,.pdf"
            onChange={handleUpload}
            className="hidden"
            id="media-upload-input"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="btn-primary text-sm"
          >
            {uploading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
            ) : (
              <><Upload className="w-4 h-4" /> Upload New</>
            )}
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search media files..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white"
        />
      </div>

      <div className="flex gap-6">
        {/* Grid */}
        <div className="flex-1">
          {filteredFiles.length === 0 ? (
            <div className="card p-16 text-center border-dashed border-2 border-slate-300">
              <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-primary opacity-60" />
              </div>
              <p className="text-lg font-bold text-text-primary mb-2">No media files</p>
              <p className="text-text-secondary mb-6 max-w-md mx-auto">
                Upload images, videos, or documents to use in your blog posts.
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary text-sm"
              >
                <Upload className="w-4 h-4" /> Upload First File
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredFiles.map(file => {
                const isImage = file.type.startsWith('image/')
                const Icon = getFileIcon(file.type)
                const isSelected = selectedFile?.name === file.name

                return (
                  <div
                    key={file.name}
                    onClick={() => setSelectedFile(file)}
                    className={`group relative rounded-lg border-2 overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                      isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200 hover:border-primary/40'
                    }`}
                  >
                    <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                      {isImage ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Icon className="w-10 h-10 text-gray-400" />
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium text-gray-700 truncate" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-[10px] text-gray-400">{formatFileSize(file.size)}</p>
                    </div>
                    {/* Checkmark when selected */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Detail sidebar */}
        {selectedFile && (
          <div className="w-80 shrink-0 card p-0 sticky top-0 self-start">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-sm text-text-primary">Attachment Details</h3>
              <button onClick={() => setSelectedFile(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              {/* Preview */}
              <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                {selectedFile.type.startsWith('image/') ? (
                  <img src={selectedFile.url} alt={selectedFile.name} className="w-full h-full object-contain" />
                ) : (
                  <FileText className="w-12 h-12 text-gray-300" />
                )}
              </div>

              {/* Meta */}
              <dl className="space-y-3 text-sm mb-6">
                <div>
                  <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">File name</dt>
                  <dd className="text-gray-700 break-all">{selectedFile.name}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">File type</dt>
                  <dd className="text-gray-700">{selectedFile.type}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">File size</dt>
                  <dd className="text-gray-700">{formatFileSize(selectedFile.size)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">File URL</dt>
                  <dd className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={selectedFile.url}
                      className="flex-1 text-xs border border-gray-200 rounded px-2 py-1.5 bg-gray-50 text-gray-600 truncate"
                    />
                    <button
                      onClick={() => copyUrl(selectedFile.url)}
                      className="p-1.5 text-gray-500 hover:text-primary border border-gray-200 rounded transition-colors"
                      title="Copy URL"
                    >
                      {copiedUrl === selectedFile.url ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </dd>
                </div>
              </dl>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => copyUrl(selectedFile.url)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-primary bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  <Copy className="w-4 h-4" /> Copy URL
                </button>
                <button
                  onClick={() => handleDelete(selectedFile.name)}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
