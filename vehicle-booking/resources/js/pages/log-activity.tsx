import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

const LogActivityPage = ({
    logActivity_data,
}: {
    logActivity_data: Array<{ activity: string; created_at: string }>;
}) => {
    return (
        <AppLayout>
            <Head title="Log Activity" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <Link href={'/dashboard'} className='text-blue-600 underline'>Back to dashboard</Link>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Activity</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logActivity_data?.map((log) => (
                            <TableRow>
                                <TableCell>{log.activity}</TableCell>
                                <TableCell>
                                    {log.created_at?.split('T')[0]}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
};

export default LogActivityPage;
