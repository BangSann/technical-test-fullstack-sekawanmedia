import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { BreadcrumbItem, Driver } from '@/types';
import { Head } from '@inertiajs/react';
import { EyeIcon, PenSquareIcon, PlusIcon, TrashIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Drivers',
        href: 'dashboard/users',
    },
];

const DriversPage = ({ drivers_data }: { drivers_data: Driver[] }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
                    <Input placeholder="Search" className="w-full sm:w-1/3" />
                    <Button className="w-full sm:w-auto">
                        <PlusIcon />
                        Tambah Driver
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {drivers_data?.map((driver) => (
                            <TableRow>
                                <TableCell>{driver?.name}</TableCell>
                                <TableCell>{driver?.phone}</TableCell>
                                <TableCell>{driver?.status}</TableCell>
                                <TableCell className="float-right space-x-1">
                                    <Button size={'icon'} variant={'outline'}>
                                        <EyeIcon />
                                    </Button>
                                    <Button size={'icon'} variant={'default'}>
                                        <PenSquareIcon />
                                    </Button>
                                    <Button
                                        size={'icon'}
                                        variant={'destructive'}
                                    >
                                        <TrashIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
};

export default DriversPage;
