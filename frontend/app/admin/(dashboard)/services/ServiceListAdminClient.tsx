'use client'

import { useState } from 'react'
import { Plus, GripVertical, Loader2 } from 'lucide-react'
import type { Service } from '@/types'
import ServiceAdminCard from '@/components/admin/ServiceAdminCard'
import { reorderServicesAction, addServiceAction } from './actions'
import { useRouter } from 'next/navigation'

export default function ServiceListAdminClient({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState(initialServices)
  const [isSavingOrder, setIsSavingOrder] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const router = useRouter()

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString())
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    const dragIndexStr = e.dataTransfer.getData('text/plain')
    if (!dragIndexStr) return
    const dragIndex = parseInt(dragIndexStr, 10)
    
    if (dragIndex === dropIndex) return
    
    const newServices = [...services]
    const [draggedItem] = newServices.splice(dragIndex, 1)
    newServices.splice(dropIndex, 0, draggedItem)
    
    // Update display_order client side
    const updatedServices = newServices.map((srv, idx) => ({ ...srv, display_order: idx + 1 }))
    setServices(updatedServices)
    
    // Save to backend
    setIsSavingOrder(true)
    const updates = updatedServices.map(s => ({ id: s.id, display_order: s.display_order }))
    await reorderServicesAction(updates)
    setIsSavingOrder(false)
  }

  const handleAddService = async () => {
    setIsAdding(true)
    const res = await addServiceAction()
    if (res.error) {
      alert(`Error adding service: ${res.error}`)
    } else {
      router.refresh()
    }
    setIsAdding(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Services</h1>
          <p className="text-text-secondary text-sm mt-1">
            Service cards are seeded from the database. Update content directly in Supabase.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {isSavingOrder && <span className="text-sm text-blue-600 font-semibold animate-pulse">Saving order...</span>}
          <button 
            onClick={handleAddService} 
            disabled={isAdding}
            className="btn-primary flex items-center gap-2 px-4 py-2 text-sm rounded-lg"
          >
            {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {isAdding ? 'Adding...' : 'Add New Service'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {services.map((service, index) => (
          <div 
            key={service.id} 
            className="flex gap-3 items-start bg-gray-50/50 p-2 rounded-xl border border-dashed border-transparent hover:border-gray-200 transition-colors"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <div 
              className="mt-[22px] cursor-grab active:cursor-grabbing p-1.5 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-700 transition-colors"
              title="Drag to reorder"
            >
              <GripVertical className="w-5 h-5" />
            </div>
            <div className="flex-1 pointer-events-auto">
              {/* Wrapping the ServiceAdminCard to ensure it doesn't interfere with the drag container's drag handles, although native drag drops the whole block */}
              <ServiceAdminCard service={service} icon_name={service.icon_name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
