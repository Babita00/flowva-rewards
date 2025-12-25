import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { Badge } from "../../ui/badge";
import { Skeleton } from "../../ui/Skeleton";
import type { Reward } from "../../../types/reward.types";
import { RewardCard } from "../RewardCard";

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
    if (redeemFilter === "unlocked") return balance >= r.cost_in_coins;
    if (redeemFilter === "locked") return balance < r.cost_in_coins;
    if (redeemFilter === "coming") return false;
    return true;
  });

  return (
    <>
      <h2 className="text-2xl font-bold text-purple-700 mb-6">
        Redeem Your Points
      </h2>

      <Tabs
        value={redeemFilter}
        onValueChange={setRedeemFilter}
        className="mb-8"
      >
        <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
          <TabsTrigger value="all">
            All Rewards
            <Badge variant="secondary" className="ml-2">
              {rewards.length}
            </Badge>
          </TabsTrigger>

          <TabsTrigger value="unlocked">Unlocked</TabsTrigger>
          <TabsTrigger value="locked">Locked</TabsTrigger>
          <TabsTrigger value="coming">Coming Soon</TabsTrigger>
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
