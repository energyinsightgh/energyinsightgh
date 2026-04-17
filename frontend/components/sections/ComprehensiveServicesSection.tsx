import Image from 'next/image'
import Link from 'next/link'

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

export function ComprehensiveServicesSection() {
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
          {comprehensiveServices.map((service, index) => {
            const isEven = index % 2 === 0;

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
                      src={service.image}
                      alt={service.title}
                      fill
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
                  <p className="text-lg text-text-secondary leading-relaxed mb-8">
                    {service.description}
                    <span>....</span>
                    <Link 
                      href={`/services/${service.slug}`} 
                      className="text-primary font-bold hover:underline ml-1"
                    >
                      Read more
                    </Link>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
