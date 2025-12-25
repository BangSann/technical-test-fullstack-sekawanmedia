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
import { BreadcrumbItem, User } from '@/types';
import { Head } from '@inertiajs/react';
import { EyeIcon, PenSquareIcon, PlusIcon, TrashIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Users',
        href: 'dashboard/users',
    },
];

const UsersPage = ({ users_data }: { users_data: User[] }) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col items-center justify-between sm:flex-row gap-2">
                    <Input placeholder="Search" className="w-full sm:w-1/3" />
                    <Button className='w-full sm:w-auto'>
                        <PlusIcon />
                        Tambah Pengguna
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Region</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users_data?.map((user) => (
                            <TableRow>
                                <TableCell>{user?.name}</TableCell>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell>{user?.role?.name}</TableCell>
                                <TableCell>{user?.region?.name}</TableCell>
                                <TableCell className="space-x-1 float-right">
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

export default UsersPage;
