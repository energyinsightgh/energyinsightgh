import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Energy Insight',
  description: 'Privacy Policy and data collection guidelines for Energy Insight.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header section */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-site py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a192f] tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Content section */}
      <div className="container-site py-12 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-14 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xl text-slate-600 mb-10 font-medium leading-relaxed">
            At Energy Insight, we are committed to protecting your privacy. Our mission is to empower individuals and organizations to optimize their energy consumption while promoting sustainability. This Privacy Policy explains how your personal and business information is collected, used, and disclosed by Energy Insight.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-[#0a192f] mt-12 mb-6">1. Information We Collect</h2>
          <p className="text-slate-600 mb-6 leading-relaxed text-[1.05rem]">
            We collect information from you when you visit our website, contact us, or engage with our services. The personal information that we collect depends on the context of your interactions with us, but it may include:
          </p>
          <ul className="list-disc pl-8 text-slate-600 mb-10 space-y-3 text-[1.05rem]">
            <li><strong>Contact Information:</strong> Names, phone numbers, email addresses, and postal addresses required to initiate consultations.</li>
            <li><strong>Business Information:</strong> Details about your facility, energy usage, and operational systems necessary to provide our auditing, carbon accounting, and environmental assessment services.</li>
            <li><strong>Automatically Collected Information:</strong> We may automatically collect certain information about your equipment, browsing actions, and patterns to improve our platform experience.</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-[#0a192f] mt-12 mb-6">2. How We Use Your Information</h2>
          <p className="text-slate-600 mb-6 leading-relaxed text-[1.05rem]">
            We use personal information collected via our website for a variety of business purposes described below:
          </p>
          <ul className="list-disc pl-8 text-slate-600 mb-10 space-y-3 text-[1.05rem]">
            <li>To facilitate the delivery of services you request from us, including Energy Audits and Compliance checking.</li>
            <li>To communicate with you and respond to your inquiries effectively.</li>
            <li>To send you strategic assessments, performance analysis, and customized cost-reduction plans.</li>
            <li>To improve our website functionality, overall user experience, and service offerings.</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-[#0a192f] mt-12 mb-6">3. Will Your Information Be Shared?</h2>
          <p className="text-slate-600 mb-10 leading-relaxed text-[1.05rem]">
            We do not sell, rent, or trade your personal information to third parties. We only share information with your absolute consent, to comply with applicable laws, to provide you with services (e.g., sharing necessary details with certified compliance standards partners like the Energy Commission for licensing purposes), to protect your rights, or to fulfill business obligations.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-[#0a192f] mt-12 mb-6">4. Security of Your Information</h2>
          <p className="text-slate-600 mb-10 leading-relaxed text-[1.05rem]">
            We have implemented appropriate technical and organizational security measures—comparable to the standards we use in our structural audits—designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Transmission of personal information to and from our website is at your own risk.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-[#0a192f] mt-12 mb-6">5. Your Privacy Rights</h2>
          <p className="text-slate-600 mb-10 leading-relaxed text-[1.05rem]">
            Depending on your location and applicable data protection laws, you may have the right to request access to the personal information we collect from you, change that information, or delete it under certain circumstances. To request to review, update, or delete your personal information, please submit a request to us using our <Link href="/contact" className="text-[#14b8a6] hover:underline font-semibold">Contact form</Link>.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-[#0a192f] mt-12 mb-6">6. Updates to This Policy</h2>
          <p className="text-slate-600 mb-10 leading-relaxed text-[1.05rem]">
            We may update this privacy policy from time to time as our operations and consulting standards evolve. The updated version will be indicated by an updated &quot;Last updated&quot; date at the top of this page. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-[#0a192f] mt-12 mb-6">7. Contact Us</h2>
          <p className="text-slate-600 mb-10 leading-relaxed text-[1.05rem]">
            If you have questions or comments about this notice, you may contact our data protection officer or our team directly at our offices. We are committed to fostering energy literacy and protecting the privacy of all the individuals and organizations we empower.
          </p>
          
          <div className="mt-16 bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[#0a192f] font-bold text-lg mb-1">Energy Insight</p>
              <p className="text-slate-500">Smarter Energy for your Business</p>
            </div>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-[#0a192f] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#0a192f]/90 transition-colors"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
