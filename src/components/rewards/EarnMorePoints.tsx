import { Share2, Star } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";

const EarnMorePoints=() => {
  return (
    <>
      <SectionHeading title="Earn More Points" />
    <div className="bg-white p-8">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
        <div className="flex gap-4 p-6 rounded-2xl border border-gray-200 bg-white">
          <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
            <Star className="w-5 h-5" />
          </div>

          <div className="space-y-3">
            <p className="font-medium">Refer and win 10,000 points!</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners
              of <span className="text-purple-600 font-medium"> 10,000 points</span>.
              Friends must complete onboarding to qualify
            </p>
          </div>
        </div>

        <div className="flex gap-4 p-6 rounded-2xl border-2 border-purple-500 bg-white items-start">
          <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
            <Share2 className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">Share Your Stack</p>
                <p className="text-sm text-gray-500">Earn +25 pts</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-700">Share your tool stack</p>

              <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-purple-50 text-purple-600 font-medium hover:bg-purple-100 transition">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default EarnMorePoints;