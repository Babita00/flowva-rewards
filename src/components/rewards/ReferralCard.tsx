import { useState } from "react";
import {
  Users,
  Copy,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useUser } from "../../hooks/useUser";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export default function ReferAndEarn() {
  const { user } = useUser();
  const [copied, setCopied] = useState(false);

  const referralLink = `${window.location.origin}/signup/?ref=${user?.id}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="bg-white max-w-6xl mx-auto p-8 rounded-3xl shadow-2xl border-0">
      <CardHeader className="flex items-center gap-3 mb-6">
        <span className="w-1 h-6 bg-purple-600 rounded-full" />
        <CardTitle className="text-2xl font-semibold">Refer & Earn</CardTitle>
      </CardHeader>

      <div className="flex items-start gap-4 bg-purple-50 rounded-2xl p-6 mb-10">
        <div className="text-purple-600">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <p className="font-medium text-gray-800">Share Your Link</p>
          <p className="text-sm text-gray-600">
            Invite friends and earn 25 points when they join!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center mb-12">
        <div>
          <p className="text-3xl font-semibold text-purple-600">0</p>
          <p className="text-sm text-gray-600 mt-1">Referrals</p>
        </div>
        <div>
          <p className="text-3xl font-semibold text-purple-600">0</p>
          <p className="text-sm text-gray-600 mt-1">Points Earned</p>
        </div>
      </div>

      <CardContent className="bg-purple-50 rounded-2xl p-6">
        <p className="text-sm text-gray-700 mb-3">
          Your personal referral link:
        </p>

        <div className="flex items-center gap-3">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 bg-white"
          />

          <Button
            onClick={copyLink}
            size="lg"
            className="rounded-xl border border-purple-600 text-purple-600 hover:bg-purple-100 transition"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </Button>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button className="w-10 h-10 p-0 rounded-full bg-blue-600 text-white flex items-center justify-center">
            <Facebook className="w-4 h-4" />
          </Button>

          <Button className="w-10 h-10 p-0 rounded-full bg-black text-white flex items-center justify-center">
            <Twitter className="w-4 h-4" />
          </Button>

          <Button className="w-10 h-10 p-0 rounded-full bg-blue-700 text-white flex items-center justify-center">
            <Linkedin className="w-4 h-4" />
          </Button>

          <Button className="w-10 h-10 p-0 rounded-full bg-green-500 text-white flex items-center justify-center">
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
