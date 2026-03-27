import { Zap, TrendingDown, ShieldCheck } from 'lucide-react'

const benefits = [
  {
    icon: Zap,
    title: 'Waste Avoidance',
    description:
      'Identify and eliminate energy waste through precision audits, real-time monitoring, and actionable engineering recommendations tailored to your facility.',
  },
  {
    icon: TrendingDown,
    title: 'Expenditure Reduction',
    description:
      'Cut operational energy costs with data-driven system optimization — clients typically achieve 15–30% reduction in energy spend within 12 months.',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory Compliance',
    description:
      'Meet national and regional energy efficiency standards with confidence. We guide you through Ghana Energy Commission requirements and ISO 50001 certification.',
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container-site">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Why Energy Efficiency Matters Now
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
            In West Africa&apos;s growing economy, energy is your largest controllable cost.
            Smart energy management is not a luxury — it is a competitive advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="card p-8 text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-50 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <benefit.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">{benefit.title}</h3>
              <p className="text-text-secondary leading-relaxed text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
