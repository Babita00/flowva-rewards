
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Coins } from "lucide-react"
import { useState } from "react"
import type { Reward } from "../../types/reward.types"
import { useUser } from "../../hooks/useUser"
import { supabase } from "../../lib/supabaseClient"
import { handleSupabaseError } from "../../utils/supabaseErrorHandler"
import { toast } from "sonner"

interface RedeemModalProps {
  reward: Reward | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

 const RedeemModal=({ reward, open, onOpenChange }: RedeemModalProps) =>{
  const { balance, refetchBalance } = useUser()
  const [loading, setLoading] = useState(false)

  if (!reward) return null

  const handleConfirm = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .rpc('redeem_reward', {
        p_reward_id: reward.id,
        p_user_id: (await supabase.auth.getUser()).data.user?.id,
      })

    if (error) {
      handleSupabaseError(error, {
        context: "Redeeming reward",
        fallbackMessage: "Redemption failed. Please try again.",
        onError: (msg) => toast(msg), 
      })
    } else if (data.success) {
      await refetchBalance() 
      toast("Reward redeemed successfully! Check your email or dashboard.")
      onOpenChange(false)
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Redemption</DialogTitle>
          <DialogDescription>
            Are you sure you want to redeem this reward?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          <img
            src={reward.image_url}
            alt={reward.title}
            className="w-48 h-48 object-cover rounded-lg"
          />
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">{reward.title}</h3>
            <p className="text-muted-foreground">{reward.description}</p>
            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-amber-600">
              <Coins className="w-8 h-8" />
              {reward.cost_in_coins.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">
              Your balance: {balance?.toLocaleString()} coins
            </p>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {loading ? "Processing..." : "Confirm & Redeem"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default RedeemModal;