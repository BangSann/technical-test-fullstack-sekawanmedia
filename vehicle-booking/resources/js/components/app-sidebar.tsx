import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { CheckIcon, LayoutGrid, PersonStandingIcon, TruckIcon, UserIcon, Users2Icon } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
            isShow: auth.user.role_id == '1' || auth.user.role_id == '2',
        },
        {
            title: 'Users',
            href: '/dashboard/users',
            icon: Users2Icon,
            isShow: auth.user.role_id == '1',
        },
        {
            title: 'Drivers',
            href: '/dashboard/drivers',
            icon: UserIcon,
            isShow: auth.user.role_id == '1',
        },
        {
            title: 'Vehicles',
            href: '/dashboard/vehicles',
            icon: TruckIcon,
            isShow: auth.user.role_id == '1',
        },
        {
            title: 'Vehicle Order',
            href: '/dashboard/vehicle-order',
            icon: TruckIcon,
            isShow: auth.user.role_id == "1",
        },
        {
            title: 'Order Approval',
            href: '/dashboard/vehicle-order-approval',
            icon: CheckIcon,
            isShow: auth.user.role_id == '2',
        },
    ];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
