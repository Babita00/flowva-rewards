import { Tabs, TabsList } from "../../ui/tabs";
import { Skeleton } from "../../ui/Skeleton";
import type { Reward } from "../../../types/reward.types";
import { RewardCard } from "../RewardCard";
import SectionHeading from "../../shared/SectionHeading";
import RewardTabTrigger from "./RewardTabTrigger";

interface RedeemTabProps {
  rewards: Reward[];
  loading: boolean;
  redeemFilter: string;
  setRedeemFilter: (value: string) => void;
  onRedeem: (reward: Reward) => void;
  balance: number;
}

export default function RedeemTab({
  rewards,
  loading,
  redeemFilter,
  setRedeemFilter,
  onRedeem,
  balance,
}: RedeemTabProps) {
  const filteredRedeemRewards = rewards.filter((r) => {
    if (redeemFilter === "all") return !r.is_coming_soon;
    if (redeemFilter === "unlocked")
      return !r.is_coming_soon && balance >= r.cost_in_coins;
    if (redeemFilter === "locked")
      return !r.is_coming_soon && balance < r.cost_in_coins;
    if (redeemFilter === "coming")
      return r.is_coming_soon === true;

    return true;
  });
  const counts = {
    all: rewards.filter((r) => !r.is_coming_soon).length,

    unlocked: rewards.filter(
      (r) => !r.is_coming_soon && balance >= r.cost_in_coins
    ).length,

    locked: rewards.filter(
      (r) => !r.is_coming_soon && balance < r.cost_in_coins
    ).length,

    coming: rewards.filter((r) => r.is_coming_soon).length,
  };

  return (
    <>
      <SectionHeading title="Redeem Your Points" />
      <Tabs
        value={redeemFilter}
        onValueChange={setRedeemFilter}
        className="mb-8"
      >
        <TabsList className="flex w-full max-w-3xl gap-10 bg-transparent">
          <RewardTabTrigger
            value="all"
            label="All Rewards"
            count={counts.all}
          />

          <RewardTabTrigger
            value="unlocked"
            label="Unlocked"
            count={counts.unlocked}
          />

          <RewardTabTrigger
            value="locked"
            label="Locked"
            count={counts.locked}
          />

          <RewardTabTrigger
            value="coming"
            label="Coming Soon"
            count={counts.coming}
          />
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square rounded-xl" />
              <Skeleton className="h-8" />
              <Skeleton className="h-16" />
            </div>
          ))}
        </div>
      ) : filteredRedeemRewards.length === 0 ? (
        <p className="text-center py-12 text-gray-500 text-xl">
          No rewards available in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRedeemRewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              onRedeem={onRedeem}
            />
          ))}
        </div>
      )}
    </>
  );
}
