
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { useRewards, type Reward } from "../hooks/useRewards";
import { Coins } from "lucide-react";
import { Skeleton } from "../components/ui/Skeleton";
import { RewardCard } from "../components/rewards/RewardCard";
import { toast } from "sonner";

const RewardsPage = () => {
  const { user, balance, loading: userLoading } = useUser();
  const { rewards, loading: rewardsLoading } = useRewards();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "popular", "giftcard", "tool", "cashback"];

  const filteredRewards = rewards.filter((r) =>
    selectedCategory === "all" ? true : r.category === selectedCategory
  );

  const handleRedeem = (reward: Reward) => {
    toast(`Redeem clicked for: ${reward.title}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Please log in to view rewards.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50">
      {/* Balance Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur shadow-md z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">Rewards Store</h1>
            <div className="flex items-center gap-4 bg-amber-50 px-6 py-4 rounded-2xl shadow-inner">
              <Coins className="w-10 h-10 text-amber-600" />
              <div>
                <p className="text-sm text-gray-600">Your Flowva Coins</p>
                <p className="text-3xl font-bold text-amber-700">
                  {userLoading ? "..." : balance?.toLocaleString() ?? "0"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-full font-medium capitalize transition-all ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 shadow hover:shadow-md"
              }`}
            >
              {cat === "all" ? "All Rewards" : cat.replace("giftcard", "Gift Cards").replace("tool", "Tools")}
            </button>
          ))}
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        {rewardsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-video" />
                <Skeleton className="h-10" />
                <Skeleton className="h-20" />
              </div>
            ))}
          </div>
        ) : filteredRewards.length === 0 ? (
          <p className="text-center text-gray-500 py-12 text-xl">No rewards in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} onRedeem={handleRedeem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RewardsPage;