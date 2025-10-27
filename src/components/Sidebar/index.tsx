'use client';
import { sidebarItemsBody } from '@/constants/sidebar/sidebar-items-body';
import { sidebarItemsFooter } from '@/constants/sidebar/sidebar-items-footer';
import { usePathname } from 'next/navigation';
import { SidebarBody } from './SidebarBody';
import { SidebarContainer } from './SidebarContainer';
import { SidebarFooter } from './SidebarFooter';
import { SidebarHeader } from './SidebarHeader';
import { SidebarItem } from './SidebarItem';

export function Sidebar() {
  const path = usePathname();

  if (!path.startsWith('/confirmar-exclusao'))
    return (
      <SidebarContainer>
        <SidebarHeader />
        <SidebarBody>
          {sidebarItemsBody.map((item) => (
            <SidebarItem icon={item.icon} name={item.name} link={item.link} key={item.name} />
          ))}
        </SidebarBody>

        <SidebarFooter>
          {sidebarItemsFooter.map((item) => (
            <SidebarItem icon={item.icon} name={item.name} link={item.link} key={item.name} />
          ))}
        </SidebarFooter>
      </SidebarContainer>
    );
}
