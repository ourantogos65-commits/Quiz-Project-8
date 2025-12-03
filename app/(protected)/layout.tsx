
// import { AppSidebar } from "@/components/AppSidebar";
// import Navbar from "@/components/Navbar";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

// export default function Layout({ children }: { children: React.ReactNode }) {

//   //  const cookieStore = await cookies();
//   //  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

//   return (
//     <>
  
//       {/* <Navbar />
//       <SidebarProvider>
//         <div className="flex mt-22">
//           <AppSidebar />
//           <SidebarTrigger className=" items-center flex justify-center " />
//         </div>

//         <main className="w-full  flex justify-center items-center ">
//           {children}
//         </main>
//       </SidebarProvider> */}
//     </>
//   );
// }
"use client"


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
     
        {user && <div>
          {children}
        </div> }
      </SignedIn>

    </>
  );
}
