const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf-8').split('\n').reduce((a, l) => {
  const parts = l.split('=');
  if(parts.length >= 2) a[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/['"]/g, '');
  return a;
}, {});
fetch(env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/services?select=id,title,slug,short_description', {
  headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY }
}).then(r => r.json()).then(data => {
  console.log(JSON.stringify(data, null, 2));
}).catch(console.error);
