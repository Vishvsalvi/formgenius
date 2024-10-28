"use client"

import * as React from "react"
import {
  BookOpen,
  Database,
  ClipboardType
} from "lucide-react"
import { NavMain, } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  
} from "@/components/ui/sidebar"
import { useSession } from "next-auth/react";
import { getAllForms } from "@/app/actions/form"
import { useQuery } from "@tanstack/react-query";
import { NavUser } from "./nav-user"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const userId = session?.user?.email;
  const getForms = async () => {
    if (!userId) return []; // Early return if no userId

    try {
      const forms = await getAllForms(userId);
      return forms;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const { data: formData, error, isLoading } = useQuery({
    queryKey: ['forms', userId],
    queryFn: getForms,
    enabled: !!userId, // This will prevent the query from running if no userId is available
  });

  const resultFormData = formData?.map((form) => {
    return {
      title: form.title,
      url: `/results/${form.id}/${userId}`,
      icon: BookOpen,
    };
  });

  const data = {
    navMain: [
      {
        title: "My Forms",
        url: "/dashboard",
        icon: ClipboardType
        ,
      },
      {
        title: "Results",
        url: "/result",
        icon: Database,
        items: resultFormData,
      },
    ],
    user: session?.user, // Add user property to data object
  };

  if (!userId) return null; // Handle early return if not authorized
  if (isLoading)
    return <div className="flex justify-center items-center h-screen">Loading</div>;
  if (error)
    return <div className="flex justify-center items-center h-screen text-red-500">Error loading form data</div>;
  if (!formData) return null;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
       {/* <Link href="/" className="text-sm font-bold tracking-tighter m-2 text-black" >FormGenius 🧠</Link>  */}
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}