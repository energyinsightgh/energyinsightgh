#!/usr/bin/env tsx
/**
 * energyinsightgh — DB Link Verification
 * ----------------------------------------
 * Run: npm run verify-db
 *
 * This script MUST return PASS on both tables before any UI data
 * fetching logic is wired up. Per B.L.A.S.T. Phase 2 (Link) gate.
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// Load .env.local manually (tsx doesn't auto-load it)
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local')
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local not found. Copy .env.local.example → .env.local and fill in credentials.')
    process.exit(1)
  }
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const [key, ...rest] = trimmed.split('=')
    if (key && rest.length > 0) {
      process.env[key.trim()] = rest.join('=').trim()
    }
  }
}

async function verifyTable(
  supabase: ReturnType<typeof createClient>,
  tableName: string
): Promise<{ table: string; status: 'PASS' | 'FAIL'; detail: string }> {
  try {
    const { data, error } = await supabase.from(tableName).select('id').limit(1)
    if (error) {
      return { table: tableName, status: 'FAIL', detail: error.message }
    }
    return {
      table: tableName,
      status: 'PASS',
      detail: `Connected. Row count sample: ${data?.length ?? 0}`,
    }
  } catch (err) {
    return {
      table: tableName,
      status: 'FAIL',
      detail: err instanceof Error ? err.message : String(err),
    }
  }
}

async function main() {
  console.log('\n🔗 energyinsightgh — B.L.A.S.T. Phase 2 Link Verification')
  console.log('='.repeat(55))

  loadEnv()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    console.error('\n❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
    process.exit(1)
  }

  console.log(`\n📡 Connecting to: ${url}`)

  // Use service role key for verification (bypasses RLS)
  const supabase = createClient(url, serviceKey)

  const tables = ['services', 'blog_posts']
  const results = await Promise.all(tables.map((t) => verifyTable(supabase, t)))

  console.log('\n┌─────────────────────────────────────────────┐')
  console.log('│          LINK VERIFICATION RESULTS           │')
  console.log('├─────────────────────────────────────────────┤')

  let allPass = true
  for (const result of results) {
    const icon = result.status === 'PASS' ? '✅' : '❌'
    console.log(`│ ${icon} ${result.table.padEnd(22)} ${result.status}  │`)
    console.log(`│   ${result.detail.substring(0, 43).padEnd(43)} │`)
    if (result.status === 'FAIL') allPass = false
  }

  console.log('└─────────────────────────────────────────────┘')

  if (allPass) {
    console.log('\n✅ LINK GATE: PASS — Safe to proceed with UI data wiring.\n')
    process.exit(0)
  } else {
    console.log('\n❌ LINK GATE: FAIL — Do NOT proceed with UI data wiring.')
    console.log('   Action: Run the migration SQL in Supabase Dashboard → SQL Editor.')
    console.log('   File: supabase/migrations/001_initial_schema.sql\n')
    process.exit(1)
  }
}

main()
