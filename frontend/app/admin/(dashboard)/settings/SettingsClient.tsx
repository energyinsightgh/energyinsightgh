'use client'

import { useState, useRef, useEffect } from 'react'
import { Moon, Sun, Globe, Bell, Shield, Paintbrush, User, Upload, Loader2, X } from 'lucide-react'
import { uploadMediaAction } from '@/app/admin/(dashboard)/media/actions'

export default function SettingsClient({ userEmail }: { userEmail: string }) {
  const [siteName, setSiteName] = useState('Energy Insight GH')
  const [contactEmail, setContactEmail] = useState('energyinsightgh@gmail.com')
  
  const [authorName, setAuthorName] = useState('energyinsightgh')
  const [authorAvatar, setAuthorAvatar] = useState('')
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const avatarRef = useRef<HTMLInputElement>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('ei_settings')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.siteName) setSiteName(parsed.siteName)
        if (parsed.contactEmail) setContactEmail(parsed.contactEmail)
        if (parsed.authorName) setAuthorName(parsed.authorName)
        if (parsed.authorAvatar) setAuthorAvatar(parsed.authorAvatar)
      } catch (e) {}
    }
  }, [])

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      localStorage.setItem('ei_settings', JSON.stringify({
        siteName, contactEmail, authorName, authorAvatar
      }))
      setIsSaving(false)
      alert('Settings saved successfully!')
    }, 600)
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingAvatar(true)

    const formData = new FormData()
    formData.append('file', file)
    const result = await uploadMediaAction(formData)

    if (result.error) {
      alert(`Upload failed: ${result.error}`)
    } else if (result.path) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/media/${result.path}`
      setAuthorAvatar(publicUrl)
    }

    setUploadingAvatar(false)
    if (avatarRef.current) avatarRef.current.value = ''
  }

  return (
    <div className="grid gap-8">
      {/* Author Profile */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
          <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
            <User className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-text-primary">Author Profile</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">Default Author Name</label>
              <input 
                type="text" 
                value={authorName} 
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none" 
              />
              <p className="text-xs text-text-secondary mt-1">This name will be used as the default author for new blog posts.</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Author Avatar / Favicon</label>
              {authorAvatar ? (
                <div className="flex items-center gap-4">
                  <img src={authorAvatar} alt="Author Avatar" className="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-sm" />
                  <button type="button" onClick={() => setAuthorAvatar('')} className="text-red-600 text-sm hover:underline">Remove Image</button>
                </div>
              ) : (
                <div>
                  <input
                    ref={avatarRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => avatarRef.current?.click()}
                    disabled={uploadingAvatar}
                    className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full hover:border-blue-400 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center gap-2 text-gray-500 overflow-hidden"
                  >
                    {uploadingAvatar ? (
                      <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                    ) : (
                      <>
                        <Upload className="w-6 h-6" />
                        <span className="text-xs font-medium px-2 text-center">Upload Avatar</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Site Settings */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
          <div className="bg-green-100 p-2 rounded-lg text-green-600">
            <Globe className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-text-primary">Site Configuration</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">Site Name</label>
              <input 
                type="text" 
                value={siteName} 
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1">Contact Email</label>
              <input 
                type="email" 
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Appearance Settings */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
            <Paintbrush className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-text-primary">Appearance</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-text-primary mb-1">Theme Mode</h3>
              <p className="text-sm text-text-secondary">Toggle between light and dark mode for the admin panel.</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button className="flex items-center gap-2 px-4 py-2 bg-white shadow-sm rounded-md text-sm font-bold text-primary">
                <Sun className="w-4 h-4" /> Light
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-slate-500 hover:text-text-primary transition-colors cursor-not-allowed opacity-50" title="Dark mode coming soon">
                <Moon className="w-4 h-4" /> Dark
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
          <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
            <Bell className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-text-primary">Notifications</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-text-primary mb-1">New Client Emails</h3>
              <p className="text-sm text-text-secondary">Receive an alert when someone joins the newsletter.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <hr className="border-gray-100" />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-text-primary mb-1">Contact Form Submissions</h3>
              <p className="text-sm text-text-secondary">Receive an alert when someone submits the contact form.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
          <div className="bg-red-100 p-2 rounded-lg text-red-600">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-text-primary">Security</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-text-primary mb-1">Admin Account</h3>
              <p className="text-sm text-text-secondary">Logged in as {userEmail}</p>
            </div>
            <button className="px-4 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200">
              Change Password
            </button>
          </div>
        </div>
      </section>

      <div className="flex justify-end pt-4 pb-8 border-t border-gray-200 mt-8">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary text-lg px-8 py-3 shadow-lg"
        >
          {isSaving ? 'Saving All Settings...' : 'Save All Settings'}
        </button>
      </div>
    </div>
  )
}
