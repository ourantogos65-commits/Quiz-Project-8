import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default function Layout({ children }: { children: React.ReactNode }) {
  //  const cookieStore = await cookies();
  //  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <>
      <Navbar />
      <SidebarProvider>
        <div className="flex mt-20">
          <AppSidebar />
          <SidebarTrigger className=" items-center flex justify-center " />
        </div>

        <main className="w-full  flex justify-center items-center ">
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
