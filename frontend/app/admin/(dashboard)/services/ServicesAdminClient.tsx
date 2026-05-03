'use client'

import { useState, useRef } from 'react'
import { GripVertical, Plus, X, ChevronDown, ChevronUp, CheckCircle, XCircle, Building2, Cpu, BarChart2, GraduationCap, ClipboardList, Trash2, Loader2 } from 'lucide-react'
import type { Service } from '@/types'
import { updateServiceAction, createServiceAction, reorderServicesAction, deleteServiceAction } from './actions'
import WPEditor from '@/components/admin/WPEditor'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Cpu, BarChart2, GraduationCap, ClipboardList,
}

const ICON_OPTIONS = [
  { value: 'Building2', label: 'Building (Facility)' },
  { value: 'Cpu', label: 'CPU (Technology)' },
  { value: 'BarChart2', label: 'Chart (Analytics)' },
  { value: 'GraduationCap', label: 'Graduation (Training)' },
  { value: 'ClipboardList', label: 'Clipboard (Audit)' },
]

interface ServiceCardProps {
  service: Service
  index: number
  isDragging: boolean
  onDragStart: (index: number) => void
  onDragEnter: (index: number) => void
  onDragEnd: () => void
  onDelete: (id: string) => void
  onUpdated: (updated: Service) => void
}

function ServiceCard({ service, index, isDragging, onDragStart, onDragEnter, onDragEnd, onDelete, onUpdated }: ServiceCardProps) {
  const Icon = iconMap[service.icon_name] ?? Building2
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [fullDescription, setFullDescription] = useState(service.full_description || '')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    const formData = new FormData(e.currentTarget)
    formData.append('full_description', fullDescription)
    const result = await updateServiceAction(service.id, formData)
    setIsSaving(false)
    if (result.error) {
      alert(`Error saving: ${result.error}`)
    } else {
      // Optimistic update
      const title = formData.get('title') as string
      const short_description = formData.get('short_description') as string
      onUpdated({ ...service, title, short_description, full_description: fullDescription })
      setIsEditing(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Delete "${service.title}"? This cannot be undone.`)) return
    setIsDeleting(true)
    const result = await deleteServiceAction(service.id)
    if (result.error) {
      alert(`Error deleting: ${result.error}`)
      setIsDeleting(false)
    } else {
      onDelete(service.id)
    }
  }

  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragEnter={() => onDragEnter(index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      className={`bg-white rounded-xl border transition-all duration-200 ${isDragging ? 'border-primary shadow-lg scale-[1.01] opacity-80' : 'border-gray-200 shadow-sm'}`}
    >
      <div className="p-5 flex items-start gap-4">
        {/* Drag Handle */}
        <div
          className="mt-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          title="Drag to reorder"
        >
          <GripVertical className="w-5 h-5" />
        </div>

        {/* Icon */}
        <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-gray-900 text-base">{service.title}</h3>
              <span className="text-xs text-gray-400">#{service.display_order}</span>
              {service.is_active ? (
                <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3 h-3" /> Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">
                  <XCircle className="w-3 h-3" /> Inactive
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-md font-medium transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit'}
                {isEditing ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Delete service"
              >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1 truncate">{service.short_description}</p>
        </div>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="border-t border-gray-100 p-5 space-y-4 bg-gray-50/50 rounded-b-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Service Title <span className="text-red-500">*</span></label>
              <input
                name="title"
                defaultValue={service.title}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Icon</label>
              <select
                name="icon_name"
                defaultValue={service.icon_name}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm bg-white"
              >
                {ICON_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Short Description <span className="text-red-500">*</span></label>
            <textarea
              name="short_description"
              defaultValue={service.short_description}
              required
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Description</label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <WPEditor
                id={`editor-${service.id}`}
                value={fullDescription}
                onChange={setFullDescription}
                placeholder="Write the full service description here..."
              />
            </div>
          </div>
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

// ────────────────────────────────────────────────────
// Add New Service Modal
// ────────────────────────────────────────────────────
function AddServiceModal({ onClose, onCreated }: { onClose: () => void; onCreated: (s: Service) => void }) {
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    const formData = new FormData(e.currentTarget)
    const result = await createServiceAction(formData)
    setIsSaving(false)
    if (result.error) {
      alert(`Error creating service: ${result.error}`)
    } else {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" /> Add New Service
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Service Title <span className="text-red-500">*</span></label>
            <input
              name="title"
              required
              placeholder="e.g. Energy Audit"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Short Description <span className="text-red-500">*</span></label>
            <textarea
              name="short_description"
              required
              rows={3}
              placeholder="Brief summary of this service (max 120 chars recommended)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Icon</label>
            <select
              name="icon_name"
              defaultValue="Building2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm bg-white"
            >
              {ICON_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</> : <><Plus className="w-4 h-4" /> Create Service</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────
// Main Client Component
// ────────────────────────────────────────────────────
export default function ServicesAdminClient({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [showAddModal, setShowAddModal] = useState(false)
  const [isSavingOrder, setIsSavingOrder] = useState(false)
  const [orderSaved, setOrderSaved] = useState(false)
  const dragIndex = useRef<number | null>(null)
  const dragOverIndex = useRef<number | null>(null)

  const handleDragStart = (index: number) => {
    dragIndex.current = index
  }

  const handleDragEnter = (index: number) => {
    dragOverIndex.current = index
    if (dragIndex.current === null || dragIndex.current === index) return
    const reordered = [...services]
    const dragged = reordered.splice(dragIndex.current, 1)[0]
    reordered.splice(index, 0, dragged)
    dragIndex.current = index
    setServices(reordered)
  }

  const handleDragEnd = async () => {
    dragIndex.current = null
    dragOverIndex.current = null
    // Persist order to DB
    setIsSavingOrder(true)
    const result = await reorderServicesAction(services.map(s => s.id))
    setIsSavingOrder(false)
    if (result.error) {
      alert(`Failed to save order: ${result.error}`)
    } else {
      setOrderSaved(true)
      setTimeout(() => setOrderSaved(false), 3000)
    }
  }

  const handleDelete = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id))
  }

  const handleUpdated = (updated: Service) => {
    setServices(prev => prev.map(s => s.id === updated.id ? updated : s))
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
            <GripVertical className="w-4 h-4 inline" />
            Drag the <span className="font-semibold text-gray-700">≡</span> handle to reorder. Changes are saved automatically.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isSavingOrder && (
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Loader2 className="w-4 h-4 animate-spin" /> Saving order…
            </span>
          )}
          {orderSaved && (
            <span className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Order saved!
            </span>
          )}
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" /> Add New Service
          </button>
        </div>
      </div>

      {/* Service List */}
      {services.length === 0 ? (
        <div className="text-center py-20 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
          <ClipboardList className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-lg font-medium">No services yet</p>
          <p className="text-sm mt-1">Click &quot;Add New Service&quot; to get started.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isDragging={dragIndex.current === index}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              onDragEnd={handleDragEnd}
              onDelete={handleDelete}
              onUpdated={handleUpdated}
            />
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <AddServiceModal
          onClose={() => setShowAddModal(false)}
          onCreated={(s) => {
            setServices(prev => [...prev, s])
            setShowAddModal(false)
          }}
        />
      )}
    </div>
  )
}
