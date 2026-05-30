'use client';
import { SIDEBAR_ITEMS_BODY } from '@/constants/sidebar/sidebar-items-body';
import { SIDEBAR_ITEMS_FOOTER } from '@/constants/sidebar/sidebar-items-footer';
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
          {SIDEBAR_ITEMS_BODY.map((item) => (
            <SidebarItem icon={item.icon} name={item.name} link={item.link} key={item.name} />
          ))}
        </SidebarBody>

        <SidebarFooter>
          {SIDEBAR_ITEMS_FOOTER.map((item) => (
            <SidebarItem
              action={item.action}
              icon={item.icon}
              name={item.name}
              link={item.link}
              key={item.name}
            />
          ))}
        </SidebarFooter>
      </SidebarContainer>
    );
}
