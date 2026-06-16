import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const stripHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
};

const getFallbackImage = (title: string, slug: string) => {
  const t = title?.toLowerCase() || '';
  if (t.includes('load') || t.includes('inventory')) return '/images/services/energy-audit.jpg';
  if (t.includes('audit')) return '/images/services/energy-audit.jpg';
  if (t.includes('carbon')) return '/images/services/carbon-accounting.jpg';
  if (t.includes('environ') || t.includes('assess')) return '/images/services/environmental-assessment.jpg';
  if (t.includes('train') || t.includes('consult')) return '/images/services/consulting-training.jpg';
  if (t.includes('light') || t.includes('design') || t.includes('system')) return '/images/services/lighting-optimization.jpg';
  if (t.includes('inspection')) return '/images/services/energy-audit.jpg';
  return `/images/services/${slug}.jpg`;
};

const comprehensiveServices = [
  {
    title: "Energy Audit",
    description: "Detailed analysis of your energy systems to identify inefficiencies and actionable insights to eliminate waste. We meticulously inspect key components of your infrastructure to ensure zero leakage and peak efficiency",
    slug: "energy-audit",
    image: "/images/services/energy-audit.jpg",
  },
  {
    title: "Carbon Accounting",
    description: "Track and report your organization's greenhouse gas emissions with precision. We help you meet regulatory compliance standards and achieve your sustainability goals effortlessly",
    slug: "carbon-accounting",
    image: "/images/services/carbon-accounting.jpg",
  },
  {
    title: "Environmental Assessment",
    description: "Comprehensive evaluation of your facility's environmental footprint to ensure strict regulatory compliance, operational safety, and a sustainable impact on the surrounding ecosystem",
    slug: "environmental-assessment",
    image: "/images/services/environmental-assessment.jpg",
  },
  {
    title: "Consulting & Training",
    description: "Expert guidance and capacity building programs designed to empower your workforce. We foster energy literacy and equip your team with established energy management best practices",
    slug: "consulting-training",
    image: "/images/services/consulting-training.jpg",
  },
  {
    title: "Pre-Construction Lighting Design & Optimization",
    description: "Strategic lighting design integration during the pre-construction phase to maximize energy efficiency, reduce long-term operational costs, and enhance visual comfort for occupants",
    slug: "lighting-optimization",
    image: "/images/services/lighting-optimization.jpg",
  }
]

export async function ComprehensiveServicesSection() {
  const supabase = await createClient()
  const { data: servicesData } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  const services = servicesData && servicesData.length > 0 ? servicesData : comprehensiveServices
  
  const allowedHomeServices = [
    'energy-audit',
    'carbon-accounting',
    'environmental-assessment',
    'training-consultancy',
    'preconstruction-lighting-design'
  ];

  const homeServices = services
    .filter((s: any) => allowedHomeServices.includes(s.slug))
    .filter((s: any, index: number, self: any[]) => index === self.findIndex((t) => t.slug === s.slug))
    .sort((a: any, b: any) => allowedHomeServices.indexOf(a.slug) - allowedHomeServices.indexOf(b.slug));

  return (
    <section className="section-padding bg-[#f8fafc]">
      <div className="container-site">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-[#f5a623]/20 rounded-full px-5 py-1.5 text-xs text-[#f5a623] font-bold shadow-[0_0_20px_rgba(245,166,35,0.2)] mb-5 tracking-wide uppercase">
            Our Offerings
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Services That Drive{' '}
            <span className="relative inline-block pb-2">
              <span>Transformation</span>
              <svg
                viewBox="0 0 300 20"
                className="absolute left-0 right-0 -bottom-1 w-full h-4 text-[#f5a623]"
                preserveAspectRatio="none"
              >
                <path
                  d="M5 15 Q 150 2 295 15"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="transparent"
                  className="opacity-90"
                />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-text-secondary">
            From granular environmental assessments to holistic energy audits, our comprehensive service portfolio is engineered entirely around achieving maximum efficiency and cost reduction for your facility.
          </p>
        </div>

        <div className="space-y-24 mt-16">
          {homeServices.map((service: any, index: number) => {
            const isEven = index % 2 === 0;
            const imageSrc = service.image || getFallbackImage(service.title, service.slug);
            const rawDescription = service.full_description || service.description || '';
            const description = stripHtml(rawDescription).slice(0, 250) + (rawDescription.length > 250 ? '...' : '');

            const benefitsMap: Record<string, string[]> = {
              'energy-audit': [
                'Identify critical energy waste and leakages',
                'Actionable insights for immediate cost savings',
                'Optimize system performance to peak efficiency'
              ],
              'carbon-accounting': [
                'Precise tracking of greenhouse gas emissions',
                'Ensure strict regulatory compliance',
                'Enhance corporate sustainability reputation'
              ],
              'environmental-assessment': [
                'Comprehensive footprint evaluation',
                'Mitigate environmental and operational risks',
                'Ensure safety and ecological harmony'
              ],
              'training-consultancy': [
                'Empower your workforce with energy literacy',
                'Implement global best practices in management',
                'Long-term capacity building for sustainable operations'
              ],
              'preconstruction-lighting-design': [
                'Strategic integration during planning phases',
                'Maximize efficiency and reduce lifetime costs',
                'Enhance visual comfort and productivity'
              ]
            };
            const benefits = benefitsMap[service.slug] || [
              'Maximize operational efficiency',
              'Reduce long-term energy costs',
              'Ensure regulatory compliance'
            ];

            return (
              <div
                key={service.title}
                className={`flex flex-col md:flex-row gap-12 items-center ${
                  !isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-divider">
                    <Image
                      src={imageSrc}
                      alt={service.title}
                      fill
                      priority={index < 2}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-text-primary mb-6">
                    {service.title}
                  </h3>
                  <p className="text-lg text-text-secondary leading-relaxed mb-6">
                    {description}
                    <span>....</span>
                  </p>

                  <ul className="space-y-3 mb-8">
                    {benefits.map((benefit: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-text-secondary">
                        <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="bg-accent hover:bg-accent/90 text-white px-6 py-2.5 rounded-full font-bold transition-all text-sm inline-flex items-center gap-2 shadow-lg shadow-accent/20"
                    >
                      Request this service
                    </Link>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-primary font-bold hover:text-primary-600 transition-colors px-4 py-2 text-sm"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
