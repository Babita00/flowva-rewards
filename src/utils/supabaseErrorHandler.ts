import type { PostgrestError, AuthError } from "@supabase/supabase-js";
import type { SupabaseCode } from "../constants/supabaseCodes";
import { SUPABASE_ERROR_MESSAGES } from "../constants/supabaseErrorMessages";

export type SupabaseError = PostgrestError | AuthError | null;

interface HandleSupabaseErrorOptions {
  context: string;
  fallbackMessage?: string;
  onError?: (message: string) => void;
  throwError?: boolean;
  silent?: boolean;
}

const isSupabaseCode = (code: unknown): code is SupabaseCode => {
  return typeof code === "string" && code in SUPABASE_ERROR_MESSAGES;
};

const getUserFriendlyMessage = (
  error: Exclude<SupabaseError, null>,
  fallback: string
) => {
  if (isSupabaseCode(error.code)) {
    return SUPABASE_ERROR_MESSAGES[error.code];
  }

  return error.message || fallback;
};

export const handleSupabaseError = (
  error: SupabaseError,
  options: HandleSupabaseErrorOptions
) => {
  if (!error) return;

  const message = getUserFriendlyMessage(
    error,
    options.fallbackMessage || "Something went wrong. Please try again."
  );

  if (!options.silent) {
    console.error(`[Supabase Error] ${options.context}`, {
      code: error.code,
      error,
    });
  }

  options.onError?.(message);

  if (options.throwError) {
    throw new Error(message);
  }
};
