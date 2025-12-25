import { Calendar, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

const DailyStreakCard = () => {
  return (
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
  );
};

export default DailyStreakCard;
