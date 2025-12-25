import { Calendar, Bell, Award, Zap, UserPlus, Gift } from "lucide-react";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { useRewards } from "../hooks/useRewards";
import type { Reward } from "../types/reward.types";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "@radix-ui/react-progress";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/Skeleton";
import { RewardCard } from "../components/rewards/RewardCard";
import RedeemModal from "../components/rewards/RedeemModal";
import rewardImage from "../assets/rewardImage.png";

export default function RewardsPage() {
  const { balance } = useUser();
  const { rewards, loading: rewardsLoading } = useRewards();
  const [mainTab, setMainTab] = useState("earn");
  const [redeemFilter, setRedeemFilter] = useState("all");
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRedeemClick = (reward: Reward) => {
    setSelectedReward(reward);
    setModalOpen(true);
  };

  const filteredRedeemRewards = rewards.filter((r) => {
    if (redeemFilter === "unlocked") return (balance ?? 0) >= r.cost_in_coins;
    if (redeemFilter === "locked") return (balance ?? 0) < r.cost_in_coins;
    if (redeemFilter === "coming") return false;
    return true;
  });

  return (
    <div className=" p-8 min-h-screen bg-gray-50 container">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl ">Rewards Hub</h1>
          <p className="text-sm text-gray-600">
            Earn points, unlock rewards, and celebrate your progress!
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <Badge
              className="absolute -top-2 -right-2 text-xs"
              variant="destructive"
            >
              1
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 px-4">
        <Tabs value={mainTab} onValueChange={setMainTab}>
          <div className="relative flex gap-2 items-start bg-gray-100 p-1 max-w-md mb-8">
            <div className="relative flex w-full ">
              <div
                className="absolute top-1 bottom-1 left-1 right-1/2 bg-linear-to-r rounded-t-lg from-purple-200 to-purple-400 shadow-md transition-all duration-300 ease-out"
                style={{
                  transform:
                    mainTab === "earn" ? "translateX(0%)" : "translateX(100%)",
                }}
              />
              <div
                className="absolute bottom-0 h-1 bg-purple-700 rounded-full left-1 right-1/2 transition-all duration-300 ease-out"
                style={{
                  transform:
                    mainTab === "earn" ? "translateX(0%)" : "translateX(100%)",
                }}
              />

              <button
                onClick={() => setMainTab("earn")}
                className={`
          relative z-10 flex-1 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300
          ${mainTab === "earn" ? "text-white" : "text-gray-500"}
        `}
              >
                Earn Points
              </button>

              <button
                onClick={() => setMainTab("redeem")}
                className={`
          relative z-10 flex-1 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300
          ${mainTab === "redeem" ? "text-white" : "text-gray-500"}
        `}
              >
                Redeem Rewards
              </button>
            </div>
          </div>

          <TabsContent value="earn" className="space-y-8">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 bg-linear-to-r from-purple-600 to-purple-800 bg-clip-text pb-2 relative">
                <span className="absolute left-0 top-0 w-2 h-full bg-purple-600 " />
                <span className="ml-4">Your Rewards Journey</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="max-w-md mx-auto border-0 shadow-2xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl ">
                <CardHeader className="pb-4  text-gray-600 bg-linear-to-r from-emerald-50 to-blue-50 pt-4">
                  <CardTitle className="flex items-center gap-3 text-xl font-bold">
                    <Award className="w-7 h-7 text-purple-700 " />
                    Points Balance
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 pb-8 px-6">
                  <div className="text-center mb-8 flex justify-between">
                    <span className="text-5xl font-black text-purple-700 ">
                      0
                    </span>
                    <span className="w-10 h-10 bg-linear-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                      ⭐
                    </span>
                  </div>

                  <div className="flex">
                    <span>Progress to $5 Gift Card</span>
                    <span className="ml-auto font-mono text-purple-600 font-bold">
                      0/5000
                    </span>
                  </div>
                  <div className="mb-6">
                    <Progress
                      value={0}
                      className="h-3 bg-gray-200 [&>div]:bg-linear-to-r [&>div]:from-yellow-400 [&>div]:to-orange-500 [&>div]:shadow-lg rounded-full border-2 border-gray-200"
                    />
                  </div>

                  <p className="text-sm text-gray-700 font-medium">
                    🚀 Just getting started — keep earning points!
                  </p>
                </CardContent>
              </Card>

              <Card className="max-w-md mx-auto overflow-hidden rounded-3xl border-0 shadow-2xl bg-white">
                <CardHeader className="pb-4  text-gray-600 bg-linear-to-r from-emerald-50 to-blue-50 pt-4">
                  <CardTitle className="flex items-center gap-3 text-xl font-bold">
                    <Calendar className="w-6 h-6" />
                    Daily Streak
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-4xl font-bold text-blue-600">0 day</p>
                  <div className="flex justify-center gap-2 my-4">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
                      <div
                        key={day}
                        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Check in daily to earn +5 points
                  </p>
                  <div className="flex items-center justify-center w-full h-12 rounded-full bg-purple-600 hover:bg-purple-700 gap-4">
                    <Zap className="w-6 h-6 text-white" />
                    <span className="text-white">Claim Today's Points</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="max-w-md mx-auto overflow-hidden rounded-3xl border-0 shadow-2xl bg-white">
                <div className="bg-linear-to-br from-purple-600 via-purple-400 to-blue-500 text-white p-4 rounded-t-3xl">
                  <Badge className="w-fit bg-white/25 text-white border-0 px-4 py-1 text-sm font-medium rounded-full">
                    Featured
                  </Badge>

                  <div className=" flex items-center justify-between">
                    <h3 className="text-2xl font-bold">Top Tool Spotlight</h3>

                    <div className="w-20 h-20 rounded-full overflow-hidden">
                      <img
                        src={rewardImage}
                        alt="Reclaim.ai logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <h4 className="text-2xl font-bold ">Reclaim</h4>
                </div>

                <div className="bg-white pt-10 pb-6 px-6">
                  <div className="flex items-start gap-4 -mt-12">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-7 h-7 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        Automate and Optimize Your Schedule
                      </p>
                      <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                        Reclaim.ai is an AI-powered calendar assistant that
                        automatically schedules your tasks, meetings, and breaks
                        to boost productivity. Free to try — earn Flowva Points
                        when you sign up!
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="flex-1 bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full font-semibold shadow-lg"
                    >
                      <UserPlus className="w-8 h-8 mr-2" />
                      Sign up
                    </Button>

                    <Button
                      size="lg"
                      className="flex-1 bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full font-semibold shadow-lg"
                    >
                      <Gift className="w-8 h-8 mr-2" />
                      Claim 50 pts
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <h2 className="text-2xl font-bold text-purple-700">
              Earn More Points
            </h2>
            <div className="text-center text-gray-500 py-8">
              More ways to earn coming soon...
            </div>
          </TabsContent>

          <TabsContent value="redeem">
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
                  All Rewards{" "}
                  <Badge variant="secondary" className="ml-2">
                    {rewards.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="unlocked">Unlocked</TabsTrigger>
                <TabsTrigger value="locked">Locked</TabsTrigger>
                <TabsTrigger value="coming">Coming Soon</TabsTrigger>
              </TabsList>
            </Tabs>

            {rewardsLoading ? (
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
                    onRedeem={handleRedeemClick}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <RedeemModal
        reward={selectedReward}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
