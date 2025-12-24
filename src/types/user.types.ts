import type { User } from "@supabase/supabase-js";

export type UserContextType = {
  user: User | null;
  balance: number | null;
  loading: boolean;
  refetchBalance: () => Promise<void>;
};
