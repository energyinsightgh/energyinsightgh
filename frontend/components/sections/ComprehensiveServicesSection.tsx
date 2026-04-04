import Image from 'next/image'

const comprehensiveServices = [
  {
    title: "Energy Audit",
    description: "Detailed analysis of your energy systems to identify inefficiencies and actionable insights to eliminate waste. We meticulously inspect key components of your infrastructure to ensure zero leakage and peak efficiency.",
    image: "/images/services/Energy Audit.jpg",
    tags: [
      "Lighting System", "Refrigeration System", "Ceiling Fans", "Air Conditioning System",
      "Chiller System", "Cooling Tower", "Pumps", "Compressor", "Boiler", "Motors", "Transformer"
    ]
  },
  {
    title: "Carbon Accounting",
    description: "Track and report your organization's greenhouse gas emissions with precision. We help you meet regulatory compliance standards and achieve your sustainability goals effortlessly.",
    image: "/images/services/Carbon Accounting.jpg",
    tags: []
  },
  {
    title: "Environmental Assessment",
    description: "Comprehensive evaluation of your facility's environmental footprint to ensure strict regulatory compliance, operational safety, and a sustainable impact on the surrounding ecosystem.",
    image: "/images/services/Environmental Assessment.jpg",
    tags: []
  },
  {
    title: "Consulting & Training",
    description: "Expert guidance and capacity building programs designed to empower your workforce. We foster energy literacy and equip your team with established energy management best practices.",
    image: "/images/services/Consulting and training.jpg",
    tags: []
  },
  {
    title: "Pre-Construction Lighting Design & Optimization",
    description: "Strategic lighting design integration during the pre-construction phase to maximize energy efficiency, reduce long-term operational costs, and enhance visual comfort for occupants.",
    image: "/images/services/Pre-Contruction Lighting Design & Optimization.jpg",
    tags: []
  }
]

export function ComprehensiveServicesSection() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-site">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-[#f5a623]/20 rounded-full px-5 py-1.5 text-xs text-[#f5a623] font-bold shadow-[0_0_20px_rgba(245,166,35,0.2)] mb-5 tracking-wide uppercase">
            Our Offerings
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Services That Drive Transformation
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
                  </p>

                  {/* Tags for specific services (like Energy Audit) */}
                  {service.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-primary-50 text-primary-900 border border-primary-200 rounded-full text-sm font-medium shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
