import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
    isShow?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface Region {
    id: number;
    name: string;
}
export interface Role {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
    region: Region;
    [key: string]: unknown; // This allows for additional properties...
}
export interface Driver {
    id: number;
    name: string;
    phone: string;
    status: string;
}
export interface Vehicles {
    id: number;
    plate_number: string;
    region: Region;
    status: string;
    ownership: string;
    type: string;
}
export interface VehiclesOrder {
    id: number;
    user: User;
    user_id: number;
    vehicle: Vehicles;
    vehicle_id: number;
    driver: Driver;
    driver_id: number;
    purpose: string;
    start_date: string;
    end_date: string;
    status: string;
}

export interface VehicleOrderApproval {
    id: number;
    order: VehiclesOrder;
    order_id: number;
    approver: User;
    approver_id: number;
    level: number;
    status: string;
}
