import type { PostgrestError, AuthError } from "@supabase/supabase-js";

export type SupabaseError = PostgrestError | AuthError | Error | null;
