import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase.auth.signInWithPassword({
    email: process.env.GUEST_EMAIL!,
    password: process.env.GUEST_PASSWORD!,
  })

  if (error || !data.session) {
    return NextResponse.json({ error: error?.message ?? 'ログイン失敗' }, { status: 400 })
  }

  return NextResponse.json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  })
}
