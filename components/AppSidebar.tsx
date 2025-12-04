



"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { ArticleType } from "@/lib/type";

export function AppSidebar() {
  const [history, setHistory] = useState<ArticleType[]>([]);
  const getArticles = async () => {
    const res = await fetch("/api/articles");
    const result = await res.json();
    console.log(result, "history title");
    setHistory(result);
  };
  useEffect(() => {
    getArticles();
  }, []);
  return (
    <Sidebar collapsible="icon" className="">
      <SidebarContent className="mt-20  ">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {history.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <p>{item.title}</p>
                    {/* <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a> */}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
