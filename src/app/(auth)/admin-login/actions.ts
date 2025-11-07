'use server'

import { createClient } from '@/utils/supabaseClient'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { success: false, message: error.message }
  }
  console.log(email,password,supabase)
  // ✅ Jangan redirect di sini
  return { success: true }
}
