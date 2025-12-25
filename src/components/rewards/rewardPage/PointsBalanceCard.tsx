import { Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Progress } from "@radix-ui/react-progress";
import { GOAL } from "../../../constants/constants";


const PointsBalanceCard = ({ balance }: { balance: number }) => {
  const progress = Math.min((balance / GOAL) * 100, 100);

  return (
    <Card className="max-w-md mx-auto border-0 shadow-2xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl">
      <CardHeader className="pb-4 text-gray-600 bg-linear-to-r from-emerald-50 to-blue-50 pt-4">
        <CardTitle className="flex items-center gap-3 text-xl font-bold">
          <Award className="w-7 h-7 text-purple-700" />
          Points Balance
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6 pb-8 px-6">
        <div className="text-center mb-8 flex justify-between">
          <span className="text-5xl font-black text-purple-700">
            {balance}
          </span>
          <span className="w-10 h-10 bg-linear-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
            ⭐
          </span>
        </div>

        <div className="flex">
          <span>Progress to $5 Gift Card</span>
          <span className="ml-auto font-mono text-purple-600 font-bold">
            {balance}/{GOAL}
          </span>
        </div>

        <div className="mb-6">
          <Progress
            value={progress}
            className="h-3 bg-gray-200 [&>div]:bg-linear-to-r [&>div]:from-yellow-400 [&>div]:to-orange-500 [&>div]:shadow-lg rounded-full border-2 border-gray-200"
          />
        </div>

        <p className="text-sm text-gray-700 font-medium">
          🚀 Just getting started — keep earning points!
        </p>
      </CardContent>
    </Card>
  );
};

export default PointsBalanceCard;
