import { supabase } from "./server";
import { createClient } from "./supabaseClient";

export async function AdminRole() {
  const admin = await createClient();
  return admin;
}

export async function publicRole(){
  return supabase
}