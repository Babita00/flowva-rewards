import SectionHeading from "../../shared/SectionHeading";
import DailyStreakCard from "./DailyStreakCard";
import FeaturedRewardCard from "./FeaturedRewardCard";
import PointsBalanceCard from "./PointsBalanceCard";
import ReferralCard from "../ReferralCard";
import EarnMorePoints from "../EarnMorePoints";

export default function EarnTab({ balance }: { balance: number }) {
  return (
    <>
      <SectionHeading title="Your Rewards Journey" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PointsBalanceCard balance={balance} />
        <DailyStreakCard />
        <FeaturedRewardCard />
      </div>
      <div className="mt-2">
        <EarnMorePoints />
      </div>

      <div className="mt-2">
        <ReferralCard />
      </div>
    </>
  );
}
