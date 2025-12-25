import type { Reward } from "../../../types/reward.types";
import { Tabs, TabsContent } from "../../ui/tabs";
import EarnTab from "./EarnTab";
import RedeemTab from "./RedeemTab";

interface RewardTabProps {
  mainTab: string;
  setMainTab: (v: string) => void;
  balance: number;
  rewards: Reward[];
  rewardsLoading: boolean;
  redeemFilter: string;
  setRedeemFilter: (v: string) => void;
  onRedeem: (reward: Reward) => void;
}

const RewardsTabs = (props: RewardTabProps) => {
  return (
    <div className="max-w-7xl mx-auto mt-8 p-1">
      <Tabs value={props.mainTab} onValueChange={props.setMainTab}>
        <div className="relative flex gap-2 items-start max-w-md mb-8 ">
          <div className="relative flex w-full">
            <div
              className="absolute top-1 bottom-1 left-1 right-1/2 bg-linear-to-r rounded-t-lg from-purple-200 to-purple-400 transition-all duration-300 ease-out"
              style={{
                transform:
                  props.mainTab === "earn"
                    ? "translateX(0%)"
                    : "translateX(100%)",
              }}
            />

            <div
              className="absolute bottom-0 h-1 bg-purple-700  left-1 right-1/2 transition-all duration-300 ease-out "
              style={{
                transform:
                  props.mainTab === "earn"
                    ? "translateX(0%)"
                    : "translateX(100%)",
              }}
            />

            <button
              onClick={() => props.setMainTab("earn")}
              className={`relative z-10 flex-1 px-8 py-3 text-lg transition-all duration-300 ${
                props.mainTab === "earn"
                  ? "text-white"
                  : "text-gray-500"
              }`}
            >
              Earn Points
            </button>

            <button
              onClick={() => props.setMainTab("redeem")}
              className={`relative z-10 flex-1 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 ${
                props.mainTab === "redeem"
                  ? "text-white"
                  : "text-gray-500"
              }`}
            >
              Redeem Rewards
            </button>
          </div>
        </div>

        <TabsContent value="earn">
          <EarnTab balance={props.balance} />
        </TabsContent>

        <TabsContent value="redeem">
          <RedeemTab
            rewards={props.rewards}
            loading={props.rewardsLoading}
            redeemFilter={props.redeemFilter}
            setRedeemFilter={props.setRedeemFilter}
            onRedeem={props.onRedeem}
            balance={props.balance}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RewardsTabs;
