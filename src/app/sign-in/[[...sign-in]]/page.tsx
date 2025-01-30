"use client";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function page() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center justify-center p-3">
      <SignIn
        appearance={{
          baseTheme: theme === "light" ? undefined : dark
        }}
      />
    </div>
  );
}
