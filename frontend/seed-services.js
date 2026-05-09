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
    { title: 'Carbon Accounting', slug: 'carbon-accounting', short_description: 'Precise tracking, measurement, and reporting of your organization\'s greenhouse gas emissions to ensure compliance and support sustainability goals.', icon_name: 'BarChart2', display_order: 2, is_active: true },
    { title: 'Environmental Assessment', slug: 'environmental-assessment', short_description: 'Rigorous environmental impact evaluations to mitigate risks, ensure regulatory compliance, and promote eco-friendly operational practices.', icon_name: 'Building2', display_order: 3, is_active: true },
    { title: 'Training & Consultancy', slug: 'training-consultancy', short_description: 'Empowering your workforce with expert knowledge and tailored strategies to cultivate a culture of sustained energy awareness and efficiency.', icon_name: 'GraduationCap', display_order: 4, is_active: true },
    { title: 'Preconstruction, lighting design and optimization', slug: 'preconstruction-lighting-design', short_description: 'Strategic integration of energy-efficient lighting and power systems during the design phase to minimize long-term operational costs.', icon_name: 'Cpu', display_order: 5, is_active: true }
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
  console.log('done seeding services');
}
run().catch(console.error);
