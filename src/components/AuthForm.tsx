import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

import { useState } from "react";
import { z } from "zod";
import { supabase } from "../lib/supabaseClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const authSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => !data.confirmPassword || data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

type AuthFormData = z.infer<typeof authSchema>;

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    setLoading(true);

    const { error } = isSignUp
      ? await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        })
      : await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

    if (error) {
      toast("Error: " + error.message);
    } else {
      toast(
        isSignUp
          ? "Sign up successful! Check your email."
          : "Logged in successfully!"
      );
      reset();
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#9013fe] to-[#6D28D9] px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-2xl border-none">
        <CardHeader className="text-center space-y-2 pt-8">
          <CardTitle className="text-3xl font-bold text-[#6D28D9]">
            {isSignUp ? "Create Your Account" : "Log in to flowva"}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {isSignUp
              ? "Sign up to manage your tools"
              : "Log in to receive personalized recommendations"}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder={isSignUp ? "your@email.com" : "user@example.com"}
                className="h-12 rounded-xl"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 rounded-xl pr-16"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#9013fe] hover:underline"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password (signup only) */}
            {isSignUp && (
              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 rounded-xl pr-16"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#9013fe] hover:underline"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}

            {/* Forgot password */}
            {!isSignUp && (
              <div className="text-right text-sm">
                <button
                  type="button"
                  className="text-[#9013fe] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-full text-white text-lg bg-linear-to-r from-[#9013fe] to-[#6D28D9] hover:opacity-95 transition"
            >
              {isSignUp ? "Sign up Account" : "Sign in"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-sm text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          {/* Toggle */}
          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                reset();
              }}
              className="text-[#9013fe] font-medium hover:underline"
            >
              {isSignUp ? "Log In" : "Sign up"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
