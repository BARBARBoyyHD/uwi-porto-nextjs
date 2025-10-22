'use server'

import { createClient } from '@/utils/supabaseClient'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    console.error('Login failed:', error.message)
    return
  }

  redirect('/admin/dashboard') // change to wherever you want after login
}
