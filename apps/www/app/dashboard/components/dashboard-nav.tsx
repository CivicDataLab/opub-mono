"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, Text } from "@opub-cdl/ui";

import { SidebarNavItem } from "types";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import styles from "../dashboard.module.scss";

interface DashboardNavProps {
  items: SidebarNavItem[];
}
export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname();

  if (items && !items.length) {
    return null;
  }

  return (
    <nav>
      {items.map((item, index) => {
        const icon = Icons[item.icon || "arrowRight"];
        return (
          item.href &&
          <Link key={index} href={item.disabled ? "/" : item.href}>
            <div
              className={cn(
                styles.NavItem,
                path === item.href && styles["NavItem--active"],
                item.disabled && styles["NavItem--disabled"]
              )}
            >
              <span className={styles.Indicator} />
              <div>
                <Icon source={icon} />
                <Text fontWeight="medium">
                  {item.title}
                </Text>
              </div>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
