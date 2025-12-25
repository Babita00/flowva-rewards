export type Reward = {
  id: string;
  title: string;
  description: string;
  cost_in_coins: number;
  image_url: string;
  category: string;
  stock_quantity: number;
  created_at?: string;
  is_coming_soon?: boolean;
};
