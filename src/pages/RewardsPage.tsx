import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { useRewards } from "../hooks/useRewards";
import type { Reward } from "../types/reward.types";
import RedeemModal from "../components/rewards/RedeemModal";
import RewardsHeader from "../components/rewards/rewardPage/RewardsHeader";
import RewardsTabs from "../components/rewards/rewardPage/RewardsTabs";

export default function RewardsPage() {
  const { balance } = useUser();
  const { rewards, loading } = useRewards();

  const [mainTab, setMainTab] = useState("earn");
  const [redeemFilter, setRedeemFilter] = useState("all");
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRedeemClick = (reward: Reward) => {
    setSelectedReward(reward);
    setModalOpen(true);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50 container">
      <RewardsHeader />

      <RewardsTabs
        mainTab={mainTab}
        setMainTab={setMainTab}
        balance={balance ?? 0}
        rewards={rewards}
        rewardsLoading={loading}
        redeemFilter={redeemFilter}
        setRedeemFilter={setRedeemFilter}
        onRedeem={handleRedeemClick}
      />

      <RedeemModal
        reward={selectedReward}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
