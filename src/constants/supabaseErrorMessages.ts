import type { SupabaseCode } from "./supabaseCodes";

export const SUPABASE_ERROR_MESSAGES: Record<SupabaseCode, string> = {
  "42501": "You don’t have permission to perform this action.",
  "23505": "This record already exists.",
  PGRST116: "No data found.",
  "auth/weak-password":
    "Password is too weak. Please use at least 6 characters.",
  "auth/email-already-exists": "An account with this email already exists.",
};
