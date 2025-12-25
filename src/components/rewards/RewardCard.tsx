
import { Coins, Gift, DollarSign, Laptop, BookOpen } from "lucide-react"; 
import type { Reward } from "../../types/reward.types";
import { useUser } from "../../hooks/useUser";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

interface RewardCardProps {
  reward: Reward & { is_coming_soon?: boolean }; 
  onRedeem: (reward: Reward) => void;
}

export function RewardCard({ reward, onRedeem }: RewardCardProps) {
  const { balance } = useUser();

  const isAffordable = balance !== null && balance >= reward.cost_in_coins;
  const isOutOfStock = reward.stock_quantity <= 0;
  const isComingSoon = reward.is_coming_soon === true;

  const getIcon = () => {
    switch (reward.category) {
      case "giftcard":
      case "popular":
        return <Gift className="w-12 h-12 text-purple-600" />;
      case "cashback":
        return <DollarSign className="w-12 h-12 text-green-600" />;
      case "tool":
        return reward.title.toLowerCase().includes("course") ? 
          <BookOpen className="w-12 h-12 text-indigo-600" /> : 
          <Laptop className="w-12 h-12 text-blue-600" />;
      default:
        return <Gift className="w-12 h-12 text-purple-600" />;
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-xl border-0 shadow-lg">
      <div className="py-6 bg-purple-50/50">
        <div className="w-10 h-10 mx-auto bg-purple-100 rounded-lg p-2 flex items-center justify-center">
          {getIcon()}
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2 text-center">{reward.title}</CardTitle>
        <CardDescription className="text-sm line-clamp-3 text-center text-gray-600">
          {reward.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex flex-col gap-4 pt-4">
        <div className="flex items-center justify-center gap-2 text-xl font-bold text-amber-600">
          <Coins className="w-6 h-6" />
          {reward.cost_in_coins.toLocaleString()} pts
        </div>

        <Button
          className="w-full mb-4 rounded-lg py-6 bg-gray-300"
          disabled={!isAffordable || isOutOfStock || isComingSoon}
          variant={isAffordable && !isOutOfStock && !isComingSoon ? "default" : "secondary"}
          onClick={() => onRedeem(reward)}  
        >
          {isComingSoon ? "Coming Soon" :
           isOutOfStock ? "Sold Out" :
           isAffordable ? "Redeem" : "Locked"}
        </Button>
      </CardFooter>
    </Card>
  );
}