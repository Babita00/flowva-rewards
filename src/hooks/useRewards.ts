import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { handleSupabaseError } from "../utils/supabaseErrorHandler";
import type { Reward } from "../types/reward.types";

export const useRewards = () => {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("rewards")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        handleSupabaseError(error, {
          context: "Fetching rewards",
          fallbackMessage: "Could not load rewards. Please try again later.",
        });
        setRewards([]);
      } else {
        setRewards(data || []);
      }

      setLoading(false);
    };

    fetchRewards();
  }, []);

  return { rewards, loading };
};
