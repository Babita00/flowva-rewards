import { Calendar, Gift, UserPlus } from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Card } from "../../ui/card";
import rewardImage from "../../../assets/rewardImage.png"
const FeaturedRewardCard = () => {
  return (
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
              Reclaim.ai is an AI-powered calendar assistant that automatically
              schedules your tasks, meetings, and breaks to boost productivity.
              Free to try — earn Flowva Points when you sign up!
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
  );
}

export default FeaturedRewardCard;