import DailyStreakCard from "./DailyStreakCard";
import FeaturedRewardCard from "./FeaturedRewardCard";
import PointsBalanceCard from "./PointsBalanceCard";

export default function EarnTab({ balance }: { balance: number }) {
  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
        Your Rewards Journey
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PointsBalanceCard balance={balance} />
        <DailyStreakCard />
        <FeaturedRewardCard />
      </div>

      <h2 className="text-2xl font-bold text-purple-700 mt-12">
        Earn More Points
      </h2>
      <div className="text-center text-gray-500 py-8">
        More ways to earn coming soon...
      </div>
    </>
  );
}
