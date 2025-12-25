import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, VehiclesOrder } from '@/types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { dashboard } from '@/routes';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const validationSchema = Yup.object({
    start_km: Yup.number()
        .required('KM awal wajib diisi')
        .min(0, 'KM awal tidak valid'),

    end_km: Yup.number()
        .required('KM akhir wajib diisi')
        .moreThan(
            Yup.ref('start_km'),
            'KM akhir harus lebih besar dari KM awal',
        ),
});

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Vehicle Orders',
        href: '/dashboard/vehicle-orders',
    },
    {
        title: 'Complete',
        href: '',
    },
];

const CompleteOrderPage = ({
    vehicle_order,
}: {
    vehicle_order: VehiclesOrder;
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            order_id: vehicle_order?.id,
            start_km: '',
            end_km: '',
        },
        validationSchema,
        onSubmit: (values) => {
            router.post(`/dashboard/vehicle-order/complete`, values, {
                onStart: () => setIsLoading(true),
                onFinish: () => setIsLoading(false),
            });
        },
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Complete Booking" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* KM Awal */}
                    <div>
                        <label className="text-sm font-medium">KM Awal</label>
                        <Input
                            name="start_km"
                            type="number"
                            value={formik.values.start_km}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.start_km && formik.errors.start_km && (
                            <p className="text-sm text-red-500">
                                {formik.errors.start_km}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium">KM Akhir</label>
                        <Input
                            name="end_km"
                            type="number"
                            value={formik.values.end_km}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.end_km && formik.errors.end_km && (
                            <p className="text-sm text-red-500">
                                {formik.errors.end_km}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Button
                            type="button"
                            variant={'outline'}
                            disabled={isLoading}
                            onClick={() => router.visit('../')}
                        >
                            Kembali
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            Selesaikan Pemesanan
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default CompleteOrderPage;
