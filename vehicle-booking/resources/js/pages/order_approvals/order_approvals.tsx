import AppLayout from '@/layouts/app-layout';

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
import { VehicleOrderApproval } from '@/types';
import { router } from '@inertiajs/react';
import { PrinterIcon } from 'lucide-react';
import Swal from 'sweetalert2';
import { generatePDF } from '@/lib/pdfGenerator';

const OrderApprovalsPage = ({
    approvals_data,
}: {
    approvals_data: VehicleOrderApproval[];
}) => {
    async function handleApprove(id: number) {
        Swal.fire({
            title: 'Approve Booking',
            text: 'Setujui pemesanan kendaraan ini',
            icon: 'info',
            showCancelButton: true,
            cancelButtonText: 'Tidak',
            confirmButtonText: 'ya',
        }).then((result) => {
            if (result?.isConfirmed) {
                router.post(
                    `/dashboard/vehicle-order-approval/${id}/approve`,
                    {},
                    {
                        onSuccess: () => Swal.fire('Approved', '', 'success'),
                    },
                );
            }
        });
    }

    async function handleRejecting(id: number) {
        Swal.fire({
            title: 'Reject Booking',
            text: 'yakin menolak pemesanan kendaraan ini',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Tidak',
            confirmButtonText: 'ya',
        }).then((result) => {
            if (result?.isConfirmed) {
                router.post(
                    `/dashboard/vehicle-order-approval/${id}/rejecting`,
                    {},
                    {
                        onSuccess: () => Swal.fire('Rejected', '', 'success'),
                    },
                );
            }
        });
    }

    function handlePrintPdf(){
            generatePDF({
                title: `Laporan konfirmasi pemesanan`,
                subtitle: 'Ini merupakan Laporan konfirmasi pemesanan',
                headers: ['Level','Pemesan' ,'Plate Number' ,'Driver' ,'Purpose','Approval Status'],
                rows: approvals_data.map((item) => [
                    item.level,
                    item.order?.user?.name,
                    item.order.vehicle.plate_number || '-',
                    item.order?.driver?.name,
                    item?.order?.purpose || '-',
                    item?.status || ""
                ]),
                filename: 'Laporan_konfirmasi_pemesanan.pdf',
            });
        }
    return (
        <AppLayout>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
                    <Input placeholder="Search" className="w-full sm:w-1/3" />
                    <Button
                        className="w-full sm:w-auto"
                        onClick={() =>
                            handlePrintPdf()
                        }
                    >
                        <PrinterIcon />
                        Cetak
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Level</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Vehicle</TableHead>
                            <TableHead>Driver</TableHead>
                            <TableHead>Purpose</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {approvals_data.map((approval) => (
                            <TableRow key={approval.id}>
                                <TableCell>Level {approval.level}</TableCell>
                                <TableCell>
                                    {approval.order?.user?.name}
                                </TableCell>
                                <TableCell>
                                    {approval.order?.vehicle?.plate_number}
                                </TableCell>
                                <TableCell>
                                    {approval.order?.driver?.name}
                                </TableCell>
                                <TableCell>{approval.order?.purpose}</TableCell>

                                <TableCell>
                                    <Badge
                                        variant={
                                            approval?.status == 'pending'
                                                ? 'default'
                                                : approval?.status == 'rejected'
                                                  ? 'destructive'
                                                  : 'outline'
                                        }
                                        className={`${approval?.status === 'approved' && 'bg-green-400'} w-full`}
                                    >
                                        {approval?.status}
                                    </Badge>
                                </TableCell>

                                <TableCell className="space-x-2 text-right">
                                    {approval.status === 'pending' && (
                                        <>
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    handleApprove(approval?.id)
                                                }
                                            >
                                                Approve
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() =>
                                                    handleRejecting(
                                                        approval?.id,
                                                    )
                                                }
                                            >
                                                Reject
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
};

export default OrderApprovalsPage;
