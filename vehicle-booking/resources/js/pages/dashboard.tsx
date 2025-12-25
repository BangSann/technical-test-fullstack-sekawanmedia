import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
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
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Bar, BarChart } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const chartConfig = {
    total_orders: {
        label: 'Total Order',
        color: '#2563eb',
    },
} satisfies ChartConfig;

export default function Dashboard({
    log_activity,
    vehicles_order,
    total_main_data,
}: {
    log_activity: Array<{
        activity: string;
        created_at: string;
    }>;
    vehicles_order: Array<{
        month_number: number;
        month: string;
        total_orders: number;
    }>;
    total_main_data: {
        total_vehicles: string;
        total_driver: string;
        total_user: string;
    };
}) {
    console.log(log_activity);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <ChartContainer
                        config={chartConfig}
                        className="max-h-[300px] w-full"
                    >
                        <BarChart accessibilityLayer data={vehicles_order}>
                            <Bar
                                dataKey="total_orders"
                                fill="var(--color-desktop)"
                                radius={4}
                            />
                        </BarChart>
                    </ChartContainer>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <Card className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader>
                            <CardTitle>Log Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Activity</TableHead>
                                        <TableHead>Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {log_activity?.map((log) => (
                                        <TableRow>
                                            <TableCell>
                                                {log.activity}
                                            </TableCell>
                                            <TableCell>
                                                {log.created_at?.split('T')[0]}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter>
                            <Link href={'/dashboard/log-activity'} className="text-blue-500 underline">
                                see all log activity
                            </Link>
                        </CardFooter>
                    </Card>

                    <Card className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader>
                            <CardTitle>Umum</CardTitle>
                        </CardHeader>
                        <CardContent className="flex h-full flex-col">
                            <p>
                                Jumlah Kendaraan :{' '}
                                {total_main_data?.total_vehicles}
                            </p>
                            <p>
                                Jumlah Driver Active :
                                {total_main_data?.total_driver}
                            </p>
                            <p>Jumlah Users : {total_main_data.total_user}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
