'use client'

import { useState, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Category } from '@/types'
import WPEditor from './WPEditor'
import { ChevronUp, MapPin, Eye, Calendar, ImageIcon, X, Upload, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { slugify } from '@/lib/utils'
import { uploadMediaAction } from '@/app/admin/(dashboard)/media/actions'

interface WPPostFormProps {
  action: (formData: FormData) => Promise<void>
  initialData?: any
  categories: Category[]
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-[#2271b1] hover:bg-[#135e96] border border-[#2271b1] text-white px-4 py-1.5 rounded-[3px] text-sm font-medium transition-colors disabled:opacity-50"
    >
      {pending ? 'Saving...' : 'Publish'}
    </button>
  )
}

export default function WPPostForm({ action, initialData, categories: initialCategories }: WPPostFormProps) {
  const [content, setContent] = useState(initialData?.content || '')
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [categoryTab, setCategoryTab] = useState<'all' | 'most_used'>('all')
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const [addingCategory, setAddingCategory] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialData?.category_id || '')

  // Tags state
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [tagInput, setTagInput] = useState('')

  // Featured image state
  const [featuredImage, setFeaturedImage] = useState<string>(initialData?.cover_image_url || '')
  const [uploadingImage, setUploadingImage] = useState(false)
  const featuredImageRef = useRef<HTMLInputElement>(null)

  // Slug for permalink
  const [title, setTitle] = useState(initialData?.title || '')
  const slug = initialData?.slug || slugify(title)
  const formRef = useRef<HTMLFormElement>(null)

  // Publish Widget State
  const [isEditingVisibility, setIsEditingVisibility] = useState(false)
  const [visibility, setVisibility] = useState('Public')
  const [isEditingPublish, setIsEditingPublish] = useState(false)
  const [publishDate, setPublishDate] = useState('immediately')

  // ---- Category functions ----
  const handleAddCategory = async () => {
    if (!newCatName.trim()) return
    setAddingCategory(true)
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCatName.trim() }),
      })
      if (res.ok) {
        const newCat = await res.json()
        setCategories(prev => [...prev, newCat])
        setSelectedCategoryId(newCat.id)
        setNewCatName('')
        setShowAddCategory(false)
      } else {
        const err = await res.json()
        alert(`Failed to add category: ${err.error || 'Unknown error'}`)
      }
    } catch (e) {
      alert('Failed to add category')
    }
    setAddingCategory(false)
  }

  // ---- Tag functions ----
  const addTag = () => {
    const newTags = tagInput.split(',').map(t => t.trim()).filter(Boolean)
    if (newTags.length > 0) {
      setTags(prev => Array.from(new Set([...prev, ...newTags])))
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag))
  }

  // ---- Featured image ----
  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImage(true)

    const formData = new FormData()
    formData.append('file', file)
    const result = await uploadMediaAction(formData)

    if (result.error) {
      alert(`Upload failed: ${result.error}`)
    } else if (result.path) {
      // Construct the public URL
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/media/${result.path}`
      setFeaturedImage(publicUrl)
    }

    setUploadingImage(false)
    if (featuredImageRef.current) featuredImageRef.current.value = ''
  }

  return (
    <form ref={formRef} action={action} className="flex gap-5 max-w-7xl mx-auto mt-2">

      {/* Left Column: Editor */}
      <div className="flex-1 space-y-4 min-w-0">
        <div>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add title"
            required
            className="w-full px-3 py-1.5 text-xl border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 placeholder:text-gray-400 font-semibold"
          />
        </div>

        {/* Hidden fields */}
        {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}
        <input type="hidden" name="content" value={content} />
        <input type="hidden" name="tags" value={tags.join(', ')} />
        <input type="hidden" name="category_id" value={selectedCategoryId} />
        <input type="hidden" name="cover_image_url" value={featuredImage} />

        {/* WP Editor */}
        <WPEditor
          value={content}
          onChange={setContent}
          slug={slug}
        />

        {/* Excerpt Widget */}
        <div className="border border-gray-300 bg-white rounded-sm">
          <div className="px-3 py-1.5 border-b border-gray-200 bg-[#f1f1f1] flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 text-sm">Excerpt</h3>
            <ChevronUp className="w-4 h-4 text-gray-500" />
          </div>
          <div className="p-3">
            <textarea
              name="excerpt"
              defaultValue={initialData?.excerpt}
              rows={3}
              maxLength={200}
              placeholder="Excerpts are optional hand-crafted summaries of your content that can be used in your theme..."
              className="w-full p-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-blue-500 resize-y"
            />
          </div>
        </div>

        {/* SEO Widget */}
        <div className="border border-gray-300 bg-white rounded-sm">
          <div className="px-3 py-1.5 border-b border-gray-200 bg-[#f1f1f1] flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 text-sm">SEO Meta Info</h3>
            <ChevronUp className="w-4 h-4 text-gray-500" />
          </div>
          <div className="p-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Focus Keyword</label>
              <input type="text" className="w-full p-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Meta Description</label>
              <textarea rows={2} className="w-full p-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-blue-500 resize-none" />
              <p className="text-[10px] text-gray-500 mt-1">Leave blank to use the excerpt as the meta description.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sidebar Widgets */}
      <div className="w-72 space-y-4 shrink-0">

        {/* Publish Widget */}
        <div className="border border-gray-300 bg-white rounded-sm">
          <div className="px-3 py-1.5 border-b border-gray-200 bg-[#f1f1f1] flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 text-sm">Publish</h3>
            <ChevronUp className="w-4 h-4 text-gray-500" />
          </div>
          <div className="p-3 space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={() => {
                  const statusSelect = formRef.current?.elements.namedItem('status') as HTMLSelectElement;
                  if (statusSelect) statusSelect.value = 'draft';
                  formRef.current?.requestSubmit();
                }}
                className="border border-gray-300 bg-[#f7f7f7] hover:bg-white px-3 py-1 rounded-sm text-gray-700 transition-colors"
              >
                Save Draft
              </button>
              <button 
                type="button" 
                onClick={() => window.open(`/blog/${slug}?preview=true`, '_blank')}
                className="border border-gray-300 bg-[#f7f7f7] hover:bg-white px-3 py-1 rounded-sm text-gray-700 transition-colors"
              >
                Preview
              </button>
            </div>

            <div className="space-y-2 py-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>Status:</span>
                </div>
                <select name="status" defaultValue={initialData?.status || 'draft'} className="text-xs border border-gray-300 rounded-sm p-1 focus:border-blue-500 outline-none">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              
              <div className="text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span>Visibility: <strong>{visibility}</strong></span>
                  </div>
                  <button type="button" onClick={() => setIsEditingVisibility(!isEditingVisibility)} className="text-blue-600 hover:underline text-xs">Edit</button>
                </div>
                {isEditingVisibility && (
                  <div className="mt-2 ml-6 space-y-1 bg-gray-50 p-2 border border-gray-200 rounded-sm text-xs">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="visibility" value="Public" checked={visibility === 'Public'} onChange={(e) => setVisibility(e.target.value)} /> Public
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="visibility" value="Password Protected" checked={visibility === 'Password Protected'} onChange={(e) => setVisibility(e.target.value)} /> Password Protected
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="visibility" value="Private" checked={visibility === 'Private'} onChange={(e) => setVisibility(e.target.value)} /> Private
                    </label>
                    <div className="mt-2 flex gap-2">
                      <button type="button" onClick={() => setIsEditingVisibility(false)} className="bg-gray-200 px-2 py-1 rounded-sm">OK</button>
                      <button type="button" onClick={() => setIsEditingVisibility(false)} className="text-gray-500 hover:underline">Cancel</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Publish <strong>{publishDate}</strong></span>
                  </div>
                  <button type="button" onClick={() => setIsEditingPublish(!isEditingPublish)} className="text-blue-600 hover:underline text-xs">Edit</button>
                </div>
                {isEditingPublish && (
                  <div className="mt-2 ml-6 space-y-2 bg-gray-50 p-2 border border-gray-200 rounded-sm text-xs">
                    <div className="flex gap-1 items-center">
                      <select className="border border-gray-300 rounded-sm p-1"><option>May</option></select>
                      <input type="text" className="w-8 border border-gray-300 rounded-sm p-1" defaultValue="02" /> ,
                      <input type="text" className="w-12 border border-gray-300 rounded-sm p-1" defaultValue="2026" />
                      @ <input type="text" className="w-8 border border-gray-300 rounded-sm p-1" defaultValue="18" /> :
                      <input type="text" className="w-8 border border-gray-300 rounded-sm p-1" defaultValue="30" />
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button type="button" onClick={() => { setPublishDate('scheduled'); setIsEditingPublish(false); }} className="bg-gray-200 px-2 py-1 rounded-sm">OK</button>
                      <button type="button" onClick={() => setIsEditingPublish(false)} className="text-gray-500 hover:underline">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <Link href="/admin/blog" className="text-red-600 hover:underline text-xs">
                Move to Trash
              </Link>
              <SubmitButton />
              <input type="hidden" name="author" value={initialData?.author || 'energyinsightgh'} />
            </div>
          </div>
        </div>

        {/* Categories Widget — FUNCTIONAL */}
        <div className="border border-gray-300 bg-white rounded-sm">
          <div className="px-3 py-1.5 border-b border-gray-200 bg-[#f1f1f1] flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 text-sm">Categories</h3>
            <ChevronUp className="w-4 h-4 text-gray-500" />
          </div>
          <div className="p-3">
            {/* Tabs */}
            <div className="flex text-sm mb-3 border-b border-gray-300">
              <button
                type="button"
                onClick={() => setCategoryTab('all')}
                className={`px-2 py-1 -mb-px transition-colors ${
                  categoryTab === 'all'
                    ? 'border border-gray-300 border-b-white bg-white relative z-10 text-gray-800 font-medium'
                    : 'text-blue-600 hover:underline'
                }`}
              >
                All Categories
              </button>
              <button
                type="button"
                onClick={() => setCategoryTab('most_used')}
                className={`px-2 py-1 -mb-px transition-colors ${
                  categoryTab === 'most_used'
                    ? 'border border-gray-300 border-b-white bg-white relative z-10 text-gray-800 font-medium'
                    : 'text-blue-600 hover:underline'
                }`}
              >
                Most Used
              </button>
            </div>

            {/* Category list */}
            <div className="border border-gray-300 p-2 h-32 overflow-y-auto space-y-1 bg-[#fdfdfd] mb-3 rounded-sm">
              {categories.length === 0 ? (
                <p className="text-sm text-gray-500 italic py-2 text-center">No categories yet.</p>
              ) : (
                (categoryTab === 'most_used' ? categories.slice(0, 5) : categories).map(cat => (
                  <label key={cat.id} className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 px-1 py-0.5 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategoryId === cat.id}
                      onChange={() => setSelectedCategoryId(selectedCategoryId === cat.id ? '' : cat.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    {cat.name}
                  </label>
                ))
              )}
            </div>

            {/* Add New Category inline */}
            {showAddCategory ? (
              <div className="space-y-2 border border-gray-200 p-2 rounded-sm bg-gray-50">
                <input
                  type="text"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="New category name"
                  className="w-full p-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-blue-500"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    disabled={addingCategory || !newCatName.trim()}
                    className="bg-[#2271b1] text-white px-3 py-1 text-xs rounded-sm hover:bg-[#135e96] disabled:opacity-50 transition-colors"
                  >
                    {addingCategory ? 'Adding...' : 'Add New Category'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowAddCategory(false); setNewCatName('') }}
                    className="text-gray-500 hover:text-gray-700 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAddCategory(true)}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>+</span> Add New Category
              </button>
            )}
          </div>
        </div>

        {/* Tags Widget — FUNCTIONAL */}
        <div className="border border-gray-300 bg-white rounded-sm">
          <div className="px-3 py-2 border-b border-gray-200 bg-[#f1f1f1] flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 text-sm">Tags</h3>
            <ChevronUp className="w-4 h-4 text-gray-500" />
          </div>
          <div className="p-3">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { e.preventDefault(); addTag() }
                }}
                placeholder="Add tag..."
                className="flex-1 p-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={addTag}
                className="border border-gray-300 bg-[#f7f7f7] hover:bg-white px-3 py-1 rounded-sm text-gray-700 transition-colors text-sm"
              >
                Add
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-2 italic">Separate tags with commas</p>

            {/* Tag chips */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 bg-gray-100 border border-gray-200 text-gray-700 text-xs px-2 py-1 rounded-sm">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Featured Image Widget */}
        <div className="border border-gray-300 bg-white rounded-sm">
          <div className="px-3 py-2 border-b border-gray-200 bg-[#f1f1f1] flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 text-sm">Featured Image</h3>
            <ChevronUp className="w-4 h-4 text-gray-500" />
          </div>
          <div className="p-3">
            {featuredImage ? (
              <div className="space-y-2">
                <div className="relative rounded-sm overflow-hidden border border-gray-200">
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="w-full h-40 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFeaturedImage('')}
                    className="absolute top-2 right-2 w-6 h-6 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setFeaturedImage('')}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove featured image
                </button>
              </div>
            ) : (
              <div>
                <input
                  ref={featuredImageRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFeaturedImageUpload}
                  className="hidden"
                  id="featured-image-upload"
                />
                <button
                  type="button"
                  onClick={() => featuredImageRef.current?.click()}
                  disabled={uploadingImage}
                  className="w-full py-6 border-2 border-dashed border-gray-300 rounded-sm hover:border-blue-400 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center gap-2 text-gray-500"
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                      <span className="text-sm">Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-6 h-6" />
                      <span className="text-sm font-medium">Set featured image</span>
                      <span className="text-xs text-gray-400">Click to upload</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </form>
  )
}
