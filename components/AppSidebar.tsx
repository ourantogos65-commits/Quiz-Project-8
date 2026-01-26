"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { ArticleType } from "@/lib/type";

interface AppSidebarProps {
  onSelect: (item: ArticleType) => void;
}

export function AppSidebar({ onSelect }: AppSidebarProps) {
  const [history, setHistory] = useState<ArticleType[]>([]);

  const getArticles = async () => {
    const res = await fetch("/api/articles");
    const result = await res.json();
    setHistory(result);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <Sidebar collapsible="icon" className="w-[250px]">
      <SidebarContent className="mt-20">
        <SidebarGroup>
          <SidebarGroupLabel>History</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className=" overflow-hidden overflow-y-auto">
              {history.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton onClick={() => onSelect(item)}>
                    {item.title.length > 25
                      ? item.title.slice(0, 25) + "..."
                      : item.title}
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
