'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, ChevronDown, ChevronUp, Building2, Cpu, BarChart2, GraduationCap, ClipboardList } from 'lucide-react'
import type { Service } from '@/types'
import { updateServiceAction } from '@/app/admin/(dashboard)/services/actions'
import WPEditor from './WPEditor'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2, Cpu, BarChart2, GraduationCap, ClipboardList,
}

interface ServiceAdminCardProps {
  service: Service
  icon_name: string
}

export default function ServiceAdminCard({ service, icon_name }: ServiceAdminCardProps) {
  const Icon = iconMap[icon_name] ?? Building2
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
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
      setIsEditing(false)
    }
  }

  return (
    <div className="card p-6 border-gray-200 shadow-sm transition-all bg-white rounded-lg">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary-50 text-primary flex items-center justify-center shrink-0 mt-1">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-text-primary text-lg">{service.title}</h3>
              <span className="text-xs text-text-muted">Order: {service.display_order}</span>
              {service.is_active ? (
                <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3 h-3" /> Active
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  <XCircle className="w-3 h-3" /> Inactive
                </span>
              )}
            </div>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium bg-blue-50 px-3 py-1.5 rounded-md"
            >
              {isEditing ? 'Cancel Edit' : 'Edit content'}
              {isEditing ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-text-secondary text-sm">{service.short_description}</p>
        </div>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="mt-6 pt-6 border-t border-gray-100 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Service Title</label>
            <input 
              name="title" 
              defaultValue={service.title} 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Short Description</label>
            <textarea 
              name="short_description" 
              defaultValue={service.short_description} 
              required
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Description (Readable Content Area)</label>
            <div className="border border-gray-300 rounded-md">
              <WPEditor 
                id={`editor-${service.id}`}
                value={fullDescription}
                onChange={setFullDescription}
                placeholder="Write the full description for this service here..."
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button 
              type="submit" 
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
