# Flowva Rewards Hub Clone

A pixel-perfect, fully functional clone of the FlowvaHub Rewards system built with modern technologies.  

This project replicates the real FlowvaHub experience: earn points through daily check-ins, redeem for gift cards and tools, refer friends, and enjoy a beautiful, gamified interface with confetti celebrations!

---

## Features

- **Authentication** – Secure sign-up/login with email/password (powered by Supabase Auth)  
- **Daily Check-in** – Claim +5 points once per day with streak tracking  
- **Real-time Balance** – Coin balance updates instantly across tabs  
- **Rewards Store** – Browse and redeem rewards (gift cards, tools, cashback)  
  - Filters: All Rewards, Unlocked, Locked, Coming Soon  
  - States: Redeem, Locked, Sold Out, Coming Soon  
- **Confetti Animation** – Celebrate successful redemptions with colorful confetti 
- **Referral System** – Share unique link, earn points when friends join  
- **Beautiful Toasts** – Success/error feedback using Sonner  
- **Responsive & Modern UI** – Built with Tailwind CSS + shadcn/ui components  
- **Secure Backend** – Supabase with Row Level Security, atomic transactions, triggers  

---

## Tech Stack

- **Frontend:** React + Vite + TypeScript + Tailwind CSS + shadcn/ui  
- **Backend/Database:** Supabase (PostgreSQL + Auth + Realtime + RPC functions)  
- **Icons:** Lucide React  
- **Toasts:** Sonner  
- **Confetti:** canvas-confetti  
- **Form Handling:** react-hook-form + zod  

---

## Project Structure
```
src/
├── components/
│ ├── rewards/
│ │ ├── RewardCard.tsx
│ │ ├── RedeemModal.tsx
│ │ ├── PointsBalanceCard.tsx
│ │ ├── DailyStreakCard.tsx
│ │ ├── FeaturedRewardCard.tsx
│ │ └── ReferralCard.tsx
│ └── AuthForm.tsx
├── hooks/
│ ├── useUser.ts
│ ├── useRewards.ts
│ ├── useDailyClaim.ts
├── context/
│ └── UserContext.tsx
├── lib/
│ └── supabaseClient.ts
├── pages/
│ └── RewardsPage.tsx
└── App.tsx