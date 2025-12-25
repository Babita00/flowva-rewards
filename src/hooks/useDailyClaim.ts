import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useUser } from "./useUser";
import { supabase } from "../lib/supabaseClient";

export const useDailyClaim = () => {
  const { refetchBalance } = useUser();
  const [loading, setLoading] = useState(false);
  const [claimedToday, setClaimedToday] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);

  const checkStatus = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const today = new Date().toISOString().split("T")[0];

    const { data: todayData } = await supabase
      .from("daily_checkins")
      .select("streak")
      .eq("user_id", user.id)
      .eq("claimed_at", today)
      .maybeSingle();

    if (todayData) {
      setClaimedToday(true);
      setCurrentStreak(todayData.streak);
      return;
    }

    const { data: latest } = await supabase
      .from("daily_checkins")
      .select("streak")
      .eq("user_id", user.id)
      .order("claimed_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    setCurrentStreak(latest?.streak || 0);
    setClaimedToday(false);
  };

  const claim = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc("claim_daily_points");

    if (error || !data?.success) {
      toast.error("Oops!", {
        description: data?.message || "Could not claim points. Try again.",
      });
    } else {
      await refetchBalance();
      setClaimedToday(true);
      setCurrentStreak(data.streak);
      toast.success("Daily points claimed!", {
        description: `+5 points • Streak: ${data.streak} day${
          data.streak > 1 ? "s" : ""
        }`,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      await checkStatus();
    };
    init();
  }, []);

  return { claim, loading, claimedToday, currentStreak };
};
