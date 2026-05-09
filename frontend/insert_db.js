const fs = require('fs');
const crypto = require('crypto');
const env = fs.readFileSync('.env.local', 'utf-8').split('\n').reduce((a, l) => {
  const parts = l.split('=');
  if(parts.length >= 2) a[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/['"]/g, '');
  return a;
}, {});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;

async function run() {
  const newServices = [
    { 
      id: crypto.randomUUID(), 
      title: 'Energy Audit', 
      slug: 'energy-audit', 
      short_description: 'Comprehensive evaluation of facility energy consumption to identify waste and prescribe high-ROI measures.', 
      full_description: 'Detailed analysis of your energy systems to identify inefficiencies and actionable insights to eliminate waste. We meticulously inspect key components of your infrastructure to ensure zero leakage and peak efficiency. Our audits are designed to provide a comprehensive roadmap for sustainable energy management, drastically reducing your long-term operational costs.',
      icon_name: 'ClipboardList', display_order: 1, is_active: true 
    },
    { 
      id: crypto.randomUUID(), 
      title: 'Carbon Accounting', 
      slug: 'carbon-accounting', 
      short_description: 'Precise tracking, measurement, and reporting of your organization\'s greenhouse gas emissions.', 
      full_description: 'Carbon accounting is no longer a corporate buzzword—it is a rigorous, essential practice for modern enterprises aiming for sustainable growth. Our comprehensive carbon accounting and reporting services allow you to systematically quantify, monitor, and manage your greenhouse gas emissions across all scopes. By partnering with us, you gain transparent, data-driven insights that not only ensure stringent regulatory compliance and investor confidence but also highlight lucrative operational inefficiencies waiting to be resolved.',
      icon_name: 'BarChart2', display_order: 2, is_active: true 
    },
    { 
      id: crypto.randomUUID(), 
      title: 'Environmental Assessment', 
      slug: 'environmental-assessment', 
      short_description: 'Rigorous environmental impact evaluations to mitigate risks and ensure regulatory compliance.', 
      full_description: 'Our Environmental Assessment services deliver an in-depth, scientific evaluation of your facility’s ecological footprint. Through rigorous site inspections, data collection, and compliance benchmarking, we identify potential environmental risks before they escalate into costly liabilities. We provide actionable, strategic recommendations that minimize waste generation, optimize resource utilization, and ensure your operations harmonize seamlessly with local and international environmental standards—safeguarding both your reputation and the planet.',
      icon_name: 'Building2', display_order: 3, is_active: true 
    },
    { 
      id: crypto.randomUUID(), 
      title: 'Training & Consultancy', 
      slug: 'training-consultancy', 
      short_description: 'Empowering your workforce with expert knowledge and tailored strategies for sustained energy efficiency.', 
      full_description: 'Empowering your workforce with expert knowledge and tailored strategies to cultivate a culture of sustained energy awareness and efficiency. Our consultancy services provide ongoing support and deep-dive analytics to ensure your team is equipped with the latest methodologies in energy management and carbon footprint reduction.',
      icon_name: 'GraduationCap', display_order: 4, is_active: true 
    },
    { 
      id: crypto.randomUUID(), 
      title: 'Preconstruction Lighting Design & Optimization', 
      slug: 'preconstruction-lighting-design', 
      short_description: 'Strategic integration of energy-efficient lighting and power systems during the design phase.', 
      full_description: 'Strategic integration of energy-efficient lighting and power systems during the pre-construction phase to maximize energy efficiency, reduce long-term operational costs, and enhance visual comfort for occupants. Our optimization ensures that your facility is built from the ground up with sustainability and cost-savings engineered directly into the blueprints.',
      icon_name: 'Cpu', display_order: 5, is_active: true 
    },
    { 
      id: crypto.randomUUID(), 
      title: 'Load Inventory Analysis', 
      slug: 'load-inventory-analysis', 
      short_description: 'Detailed mapping and quantification of all electrical loads across your facility.', 
      full_description: 'Detailed mapping and quantification of all electrical loads across your facility to establish an accurate baseline for energy management. We analyze the power draw of individual systems and machinery, allowing us to pinpoint disproportionate consumers of energy and provide targeted strategies for demand reduction and peak shaving.',
      icon_name: 'BarChart2', display_order: 6, is_active: true 
    },
    { 
      id: crypto.randomUUID(), 
      title: 'System Design', 
      slug: 'system-design', 
      short_description: 'Expert engineering of robust, energy-efficient electrical and mechanical systems.', 
      full_description: 'Expert engineering of robust, energy-efficient electrical and mechanical systems tailored to your facility\'s unique operational demands. We utilize state-of-the-art modeling software to design infrastructures that minimize energy loss, enhance reliability, and seamlessly integrate renewable energy sources where applicable.',
      icon_name: 'Cpu', display_order: 7, is_active: true 
    },
    { 
      id: crypto.randomUUID(), 
      title: 'Facility Inspection', 
      slug: 'facility-inspection', 
      short_description: 'Thorough on-site assessments of your building\'s infrastructure to detect inefficiencies.', 
      full_description: 'Thorough on-site assessments of your building\'s infrastructure to detect inefficiencies, safety hazards, and areas for immediate optimization. Our specialized inspection teams utilize advanced diagnostic tools, including thermal imaging and power quality analyzers, to uncover hidden issues and ensure your systems operate at optimal performance levels.',
      icon_name: 'Building2', display_order: 8, is_active: true 
    }
  ];

  for (const s of newServices) {
    const res = await fetch(`${url}/rest/v1/services`, {
      method: 'POST',
      headers: { 'apikey': key, 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
      body: JSON.stringify(s)
    });
    if (!res.ok) {
        console.error('Failed to insert:', s.title, await res.text());
    } else {
        console.log('Successfully inserted:', s.title);
    }
  }
}
run().catch(console.error);
