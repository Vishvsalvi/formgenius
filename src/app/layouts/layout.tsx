import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Suspense } from "react"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
        <SidebarTrigger />
      <Suspense fallback={<h1>Loading...</h1>} >
        {children}
      </Suspense>
    </SidebarProvider>
  )
}
