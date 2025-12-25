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
import { BreadcrumbItem, Driver, Vehicles } from '@/types';
import { Head } from '@inertiajs/react';
import { EyeIcon, PenSquareIcon, PlusIcon, TrashIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Vehicles',
        href: 'dashboard/vehicles',
    },
];

const VehiclesPage = ({ vehicles_data }: { vehicles_data: Vehicles[] }) => {
    console.log(vehicles_data)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
                    <Input placeholder="Search" className="w-full sm:w-1/3" />
                    <Button className="w-full sm:w-auto">
                        <PlusIcon />
                        Tambah Kendaraan
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Plate Number</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Ownership</TableHead>
                            <TableHead>Region</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vehicles_data?.map((vehicle) => (
                            <TableRow>
                                <TableCell>{vehicle?.plate_number}</TableCell>
                                <TableCell>{vehicle?.type}</TableCell>
                                <TableCell>{vehicle?.ownership}</TableCell>
                                <TableCell>{vehicle?.region?.name}</TableCell>
                                <TableCell>{vehicle?.status}</TableCell>
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

export default VehiclesPage;
