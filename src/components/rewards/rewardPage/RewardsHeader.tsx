import { Bell } from "lucide-react";
import { Badge } from "../../ui/badge";

export default function RewardsHeader() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold">Rewards Hub</h1>
        <p className="text-sm text-gray-600">
          Earn points, unlock rewards, and celebrate your progress!
        </p>
      </div>

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
  );
}
