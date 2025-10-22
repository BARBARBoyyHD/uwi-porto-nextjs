'use server'

import { createClient } from '@/utils/supabaseClient'
import { redirect } from 'next/navigation'

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options:{
        emailRedirectTo: `/confirm`
    }
  })

  if (error) {
    console.error('Signup failed:', error.message)
    return
  }

  redirect('/admin-login') // redirect back to login after signup
}
