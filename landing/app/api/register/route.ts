import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)

export async function POST(req: NextRequest) {
  const { name, contact, role, ai_knowledge, pain_points, heard_from } = await req.json()

  const { error } = await supabase.from('registrations').insert([
    { name, contact, role, ai_knowledge, pain_points, heard_from },
  ])
  if (error) {
    console.error('Supabase error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL
  if (scriptUrl) {
    try {
      await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, role, ai_knowledge, pain_points, heard_from }),
      })
    } catch (e) {
      console.error('Google Sheets sync failed:', e)
    }
  }

  return NextResponse.json({ success: true })
}
