import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { handleSupabaseError } from "../utils/supabaseErrorHandler";

interface UseUserBalanceResult {
  balance: number | null;
  loading: boolean;
  refetchBalance: () => Promise<void>;
}

export const useUserBalance = (userId?: string): UseUserBalanceResult => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const refetchBalance = async () => {
    if (!userId) {
      setBalance(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("coin_balance")
      .eq("id", userId)
      .single();

    if (error) {
      handleSupabaseError(error, {
        context: "Refetching user balance",
        fallbackMessage: "Could not load coin balance. Showing 0.",
      });
      setBalance(0);
    } else {
      setBalance(data.coin_balance);
    }

    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchInitialBalance = async () => {
      if (!userId) {
        if (isMounted) {
          setBalance(null);
          setLoading(false);
        }
        return;
      }

      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("coin_balance")
        .eq("id", userId)
        .single();

      if (!isMounted) return;

      if (error) {
        handleSupabaseError(error, {
          context: "Fetching user balance (initial)",
          fallbackMessage: "Could not load coin balance. Showing 0.",
        });
        setBalance(0);
      } else {
        setBalance(data.coin_balance);
      }

      setLoading(false);
    };

    fetchInitialBalance();

    if (!userId) return;

    const channel = supabase
      .channel("profile-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          if (isMounted) {
            setBalance(payload.new.coin_balance);
          }
        }
      )
      .subscribe((_status, err) => {
        if (err) {
          console.error("[Realtime Subscription Error] profile-changes", err);
        }
      });

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return {
    balance,
    loading,
    refetchBalance,
  };
};
