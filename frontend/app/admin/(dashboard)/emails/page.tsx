import { createClient } from '@/lib/supabase/server'
import { ClientEmail } from '@/types'
import { formatDate } from '@/lib/utils'
import { Mail, Trash2 } from 'lucide-react'

export const revalidate = 0 // Disable cache for admin pages

export default async function AdminEmailsPage() {
  const supabase = await createClient()

  // Ensure user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return <div>Unauthorized</div>
  }

  // Fetch client emails
  const { data, error } = await supabase
    .from('client_emails')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Database Error (client_emails): ${error.message}`)

  const emails = (data as ClientEmail[]) || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-text-primary">Clients Emails</h1>
        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-text-secondary shadow-sm">
          Total Subscribers: {emails.length}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-text-secondary uppercase tracking-wider">
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Date Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {emails.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-text-muted">
                    <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    No emails collected yet.
                  </td>
                </tr>
              ) : (
                emails.map((email, index) => (
                  <tr key={email.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-text-muted font-medium">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-text-primary">
                        {email.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        email.source === 'newsletter' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {email.source === 'newsletter' ? 'Newsletter' : 'Contact Form'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary whitespace-nowrap">
                      {formatDate(email.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
