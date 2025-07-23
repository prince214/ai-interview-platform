"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "./button";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (res.ok) {
        router.push("/sign-in");
      } else {
        toast.error("Logout failure!");
      }
    } catch {
      toast.error("Logout failure!");
    }
  };
  return (
    <Button onClick={handleLogout} className="btn-primary max-sm:w-full">
      Logout
    </Button>
  );
};

export default LogoutButton;
