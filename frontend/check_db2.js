const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf-8').split('\n').reduce((a, l) => {
  const parts = l.split('=');
  if(parts.length >= 2) a[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/['"]/g, '');
  return a;
}, {});
fetch(env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/services?select=*', {
  headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY }
}).then(r => r.json()).then(data => {
  console.log('Services Count:', data.length);
  if(data.error) console.error(data.error);
  else console.log(JSON.stringify(data.map(d => ({id: d.id, title: d.title, slug: d.slug})), null, 2));
}).catch(console.error);
