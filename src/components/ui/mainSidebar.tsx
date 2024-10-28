"use client"
import { useState } from "react"
import { IconBrandTabler, IconLogout, IconSettings, IconArrowLeft, IconListNumbers, IconReportAnalytics } from "@tabler/icons-react"
import {Sidebar, SidebarBody, SidebarLink} from "@/components/ui/sidebar"



export default function SidebarComponent() {
    const links = [
      {
        label: "My forms",
        href: "/dashboard",
        icon: (
          <IconListNumbers className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
      },
      {
        label: "Results",
        href: "/results",
        icon: (
          <IconReportAnalytics className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          
        ),
      },
      
    ]
    const [open, setOpen] = useState(false)
  
    return (
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <>FormGenius🧠</> : null}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              {/* <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            /> */}
            </div>
          </SidebarBody>
        </Sidebar>
    )
  }