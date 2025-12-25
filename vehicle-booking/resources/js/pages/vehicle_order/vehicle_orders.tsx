import { destroy } from '@/actions/App/Http/Controllers/VehicleOrderController';
import { Badge } from '@/components/ui/badge';
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
import { generatePDF } from '@/lib/pdfGenerator';
import { dashboard } from '@/routes';
import { BreadcrumbItem, VehiclesOrder } from '@/types';
import { Head, router } from '@inertiajs/react';
import {
    CheckIcon,
    ChevronRight,
    PenSquareIcon,
    PlusIcon,
    PrinterIcon,
    TrashIcon,
} from 'lucide-react';
import Swal from 'sweetalert2';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Vehicle Orders',
        href: '/dashboard/vehicle-orders',
    },
];

const VehicleOrdersPage = ({
    vehicle_orders,
}: {
    vehicle_orders: VehiclesOrder[];
}) => {
    async function handleDelete(id: number) {
        Swal.fire({
            title: 'Hapus Data',
            icon: 'warning',
            text: 'Apakah kamu yakin ingin menghapus data ini ?',
            confirmButtonText: 'Ya',
            showCancelButton: true,
            cancelButtonText: 'Tidak',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await router.delete(destroy(id), {
                    onSuccess: () => Swal.fire('Deleted', '', 'success'),
                });
            }
        });
    }

    async function handleConfirmation(id: number) {
        Swal.fire({
            title: 'Confirmation',
            icon: 'info',
            text: 'Konfirmasi peminjaman kendaraan ?',
            confirmButtonText: 'Ya',
            showCancelButton: true,
            cancelButtonText: 'Tidak',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await router.post(
                    `/dashboard/vehicle-order/confirmation/${id}/`,
                    {},
                    {
                        onSuccess: () => {
                            Swal.fire('Confirmed', '', 'success');
                        },
                    },
                );
            }
        });
    }

    function handlePrintPdf(){
        generatePDF({
            title: `Laporan pemesanan kendaraan`,
            subtitle: 'Ini merupakan Laporan pemesanan kendaraan',
            headers: ['Pemesan' ,'Plate Number' ,'Driver' ,'Start Date','End Date' ,'Approval Status'],
            rows: vehicle_orders.map((item) => [
                item.user?.name,
                item.vehicle.plate_number || '-',
                item.driver?.name,
                item?.start_date || '-',
                item?.end_date || '-',
                item?.status || ""
            ]),
            filename: 'Laporan_pemesanan_kendaraan.pdf',
        });
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Vehicle Orders" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
                    <Input placeholder="Search" className="w-full sm:w-1/3" />
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Button size={'default'} className='w-full sm:w-auto' onClick={handlePrintPdf}>
                            <PrinterIcon />
                        </Button>
                        <Button
                            className="w-full sm:w-auto"
                            onClick={() =>
                                router.visit('/dashboard/vehicle-order/create')
                            }
                        >
                            <PlusIcon />
                            Tambah Order
                        </Button>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pemesan</TableHead>
                            <TableHead>Plate Number</TableHead>
                            <TableHead>Driver</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Approval Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vehicle_orders?.map((order) => (
                            <TableRow key={order?.id}>
                                <TableCell>{order?.user.name}</TableCell>
                                <TableCell>
                                    {order.vehicle.plate_number}
                                </TableCell>
                                <TableCell>{order?.driver.name}</TableCell>
                                <TableCell>
                                    {order?.start_date || 'Unverified'}
                                </TableCell>
                                <TableCell>
                                    {order?.end_date || 'Unverified'}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            order?.status == 'pending'
                                                ? 'default'
                                                : order?.status == 'rejected'
                                                  ? 'destructive'
                                                  : 'outline'
                                        }
                                        className={`${order?.status === 'approved' && 'bg-green-400'} w-full`}
                                    >
                                        {order?.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="float-right flex items-center gap-1">
                                    {!order.start_date && !order?.end_date ? (
                                        <Button
                                            size={'default'}
                                            variant={'outline'}
                                            disabled={
                                                order?.status !== 'approved'
                                            }
                                            onClick={() =>
                                                handleConfirmation(order?.id)
                                            }
                                        >
                                            Konfirmasi <CheckIcon />
                                        </Button>
                                    ) : !order?.end_date ? (
                                        <Button
                                            variant={'outline'}
                                            onClick={() =>
                                                router?.visit(
                                                    `/dashboard/vehicle-order/complete/view?order_id=${order.id}`,
                                                )
                                            }
                                        >
                                            Akhiri Pinjaman <ChevronRight />
                                        </Button>
                                    ) : (
                                        ''
                                    )}
                                    <Button
                                        size={'default'}
                                        variant={'default'}
                                        onClick={() =>
                                            router?.visit(
                                                `/dashboard/vehicle-order/${order?.id}/edit`,
                                            )
                                        }
                                    >
                                        <PenSquareIcon />
                                    </Button>
                                    <Button
                                        size={'default'}
                                        variant={'destructive'}
                                        onClick={() => handleDelete(order?.id)}
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

export default VehicleOrdersPage;
