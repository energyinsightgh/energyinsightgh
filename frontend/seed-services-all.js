const fs = require('fs');

const envStr = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envStr.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) env[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/['"]/g, '');
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;

async function run() {
  const services = [
    { title: 'Energy Audit', slug: 'energy-audit', short_description: 'Comprehensive evaluation of your facility\'s energy consumption to identify waste and prescribe actionable, high-ROI efficiency measures.', icon_name: 'ClipboardList', display_order: 1, is_active: true },
    { title: 'Carbon Accounting', slug: 'carbon-accounting', short_description: 'Carbon accounting is an essential practice for modern enterprises aiming for sustainable growth. Our comprehensive carbon accounting and reporting services allow you to systematically quantify, monitor, and manage your greenhouse gas emissions across all scopes. By partnering with us, you gain transparent, data-driven insights that not only ensure stringent regulatory compliance and investor confidence but also highlight lucrative operational inefficiencies waiting to be resolved.', icon_name: 'BarChart2', display_order: 2, is_active: true },
    { title: 'Environmental Assessment', slug: 'environmental-assessment', short_description: 'Our Environmental Assessment services deliver an in-depth, scientific evaluation of your facility’s ecological footprint. Through rigorous site inspections, data collection, and compliance benchmarking, we identify potential environmental risks before they escalate into costly liabilities. We provide actionable, strategic recommendations that minimize waste generation, optimize resource utilization, and ensure your operations harmonize seamlessly with local and international environmental standards.', icon_name: 'Building2', display_order: 3, is_active: true },
    { title: 'Training & Consultancy', slug: 'training-consultancy', short_description: 'Empowering your workforce with expert knowledge and tailored strategies to cultivate a culture of sustained energy awareness and efficiency.', icon_name: 'GraduationCap', display_order: 4, is_active: true },
    { title: 'Preconstruction Lighting Design & Optimization', slug: 'preconstruction-lighting-design', short_description: 'Strategic integration of energy-efficient lighting and power systems during the design phase to minimize long-term operational costs.', icon_name: 'Cpu', display_order: 5, is_active: true },
    { title: 'Load Inventory Analysis', slug: 'load-inventory-analysis', short_description: 'Detailed breakdown and categorization of all energy-consuming equipment to establish an accurate baseline for energy management.', icon_name: 'BarChart2', display_order: 6, is_active: true },
    { title: 'System Design', slug: 'system-design', short_description: 'Expert engineering of robust, energy-efficient electrical and mechanical systems tailored to your facility\'s unique operational demands.', icon_name: 'Cpu', display_order: 7, is_active: true },
    { title: 'Facility Inspection', slug: 'facility-inspection', short_description: 'Thorough on-site assessments of your building\'s infrastructure to detect inefficiencies, safety hazards, and areas for immediate optimization.', icon_name: 'Building2', display_order: 8, is_active: true }
  ];

  for (const s of services) {
    const getRes = await fetch(`${url}/rest/v1/services?slug=eq.${s.slug}`, {
      headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
    });
    const data = await getRes.json();
    if (data && data.length > 0) {
      await fetch(`${url}/rest/v1/services?slug=eq.${s.slug}`, {
        method: 'PATCH',
        headers: { 'apikey': key, 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(s)
      });
      console.log('Updated', s.title);
    } else {
      await fetch(`${url}/rest/v1/services`, {
        method: 'POST',
        headers: { 'apikey': key, 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
        body: JSON.stringify(s)
      });
      console.log('Inserted', s.title);
    }
  }
  
  // also clean up any duplicate slugs or old names if we changed slug
  console.log('done seeding services');
}
run().catch(console.error);
