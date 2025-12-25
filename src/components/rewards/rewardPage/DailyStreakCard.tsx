import { Calendar, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { WEEK_DAYS } from "../../../types/week.types";
import { useDailyClaim } from "../../../hooks/useDailyClaim";

const DailyStreakCard = () => {
  const { currentStreak, claimedToday, loading, claim } = useDailyClaim();

  return (
    <Card className="max-w-md mx-auto overflow-hidden rounded-3xl border-0 shadow-2xl bg-white">
      <CardHeader className="pb-4  text-gray-600 bg-linear-to-r from-emerald-50 to-blue-50 pt-4">
        <CardTitle className="flex items-center gap-3 text-xl font-bold">
          <Calendar className="w-6 h-6" />
          Daily Streak
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-4xl font-bold text-purple-600">
          {currentStreak} {currentStreak === 1 ? "day" : "days"}
        </p>

        <div className="flex justify-center gap-2 my-4">
          {WEEK_DAYS.map((day, index) => (
            <div
              key={day}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                index < currentStreak % 7
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <p className="text-sm text-center text-gray-600 mb-4">
          Check in daily to earn +5 points
        </p>

        <div
          onClick={!claimedToday && !loading ? claim : undefined}
          className={`flex items-center justify-center w-full h-12 rounded-full gap-4 mb-4
            ${
              claimedToday
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 cursor-pointer"
            }`}
        >
          <Zap className="w-6 h-6 text-white" />
          <span className="text-white">
            {loading
              ? "Claiming..."
              : claimedToday
              ? "Claimed Today ✓"
              : "Claim Today's Points"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyStreakCard;
