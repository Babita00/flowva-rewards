import { useState } from "react";
import { useUser } from "./useUser";
import { supabase } from "../lib/supabaseClient";
import { toast } from "sonner";

export const useDailyClaim = () => {
  const { refetchBalance } = useUser();
  const [loading, setLoading] = useState(false);
  const [claimedToday, setClaimedToday] = useState(false);

  const checkIfClaimedToday = async () => {
    const today = new Date().toISOString().split("T")[0];
    const { data } = await supabase
      .from("daily_checkins")
      .select("id")
      .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
      .eq("claimed_at", today);

    if (data && data.length > 0) {
      setClaimedToday(true);
    }
  };

  const claim = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc("claim_daily_points");

    if (error || !data.success) {
      toast("Already claimed today or error occurred");
    } else {
      await refetchBalance();
      setClaimedToday(true);
      toast("+5 points claimed!");
    }
    setLoading(false);
  };

  return { claim, loading, claimedToday, checkIfClaimedToday };
};
