
import type { Reward } from "../../hooks/useRewards";
import { useUser } from "../../hooks/useUser";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Coins } from "lucide-react";

interface RewardCardProps {
  reward: Reward;
  onRedeem: (reward: Reward) => void;
}

export function RewardCard({ reward, onRedeem }: RewardCardProps) {
  const { balance } = useUser(); 

  const isAffordable = balance !== null && balance >= reward.cost_in_coins;
  const isOutOfStock = reward.stock_quantity <= 0;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video relative">
        <img
          src={reward.image_url}
          alt={reward.title}
          className="object-cover w-full h-full"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              Sold Out
            </Badge>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{reward.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {reward.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-lg font-bold text-amber-600">
          <Coins className="w-6 h-6" />
          {reward.cost_in_coins.toLocaleString()}
        </div>
        <Button
          onClick={() => onRedeem(reward)}
          disabled={!isAffordable || isOutOfStock}
          variant={isAffordable ? "default" : "secondary"}
        >
          {isOutOfStock ? "Sold Out" : isAffordable ? "Redeem" : "Not Enough Coins"}
        </Button>
      </CardFooter>
    </Card>
  );
}