"use client";

import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const router = useRouter();
  console.log(user);
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  return (
    <>
      <SignedIn>
        {user && (
          <div>
            {" "}
            <SidebarProvider>
              <main className="">{children}</main>
            </SidebarProvider>
          </div>
        )}
      </SignedIn>
    </>
  );
}
