import { Head } from '@inertiajs/react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { store } from '@/actions/App/Http/Controllers/VehicleOrderController';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { BreadcrumbItem, Driver, User, Vehicles } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const validationSchema = Yup.object({
    vehicle_id: Yup.string().required('Vehicle is required'),
    driver_id: Yup.string().required('Driver is required'),
    user_id: Yup.string().required('User ID is required'),
    purpose: Yup.string().required('Purpose is required'),
    approval_id_lvl1: Yup.string().required('Approval 1 is required'),
    approval_id_lvl2: Yup.string().required('Approval 2 is required'),
});

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Vehicle Orders',
        href: 'dashboard/vehicle-orders',
    },
    {
        title: 'Add Order',
        href: '',
    },
];

const AddOrderPage = ({
    vehicles,
    drivers,
    users,
}: {
    vehicles: Vehicles[];
    drivers: Driver[];
    users: User[];
}) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Order" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Formik
                    initialValues={{
                        vehicle_id: '',
                        driver_id: '',
                        user_id: '',
                        purpose: '',
                        approval_id_lvl1: '',
                        approval_id_lvl2: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        router.post(store(), values, {
                            onStart: () => {},
                            onFinish: () => {
                                setIsLoading(false);
                            },
                            onSuccess: () => {
                                router.visit('./');
                            },
                        });
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* User ID */}
                                <div className="space-y-1">
                                    <Label>Peminjam</Label>
                                    <Select
                                        onValueChange={(value) =>
                                            setFieldValue('user_id', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Peminjam" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users
                                                ?.filter((e) => e.role_id == 3)
                                                ?.map((user) => (
                                                    <SelectItem
                                                        key={user.id}
                                                        value={String(user.id)}
                                                    >
                                                        {user.name}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    {touched.user_id && errors.user_id && (
                                        <p className="text-sm text-red-500">
                                            {errors.user_id}
                                        </p>
                                    )}
                                </div>

                                {/* Approval 1 */}
                                <div className="space-y-1">
                                    <Label>Approval level 1</Label>
                                    <Select
                                        onValueChange={(value) =>
                                            setFieldValue(
                                                'approval_id_lvl1',
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Approval level 1" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users
                                                ?.filter((e) => e.role_id == 2)
                                                ?.map((user) => (
                                                    <SelectItem
                                                        key={user.id}
                                                        value={String(user.id)}
                                                    >
                                                        {user.name}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    {touched.approval_id_lvl1 &&
                                        errors.approval_id_lvl1 && (
                                            <p className="text-sm text-red-500">
                                                {errors.approval_id_lvl1}
                                            </p>
                                        )}
                                </div>
                                {/* approval 2 */}
                                <div className="space-y-1">
                                    <Label>Approval level 2</Label>
                                    <Select
                                        onValueChange={(value) =>
                                            setFieldValue(
                                                'approval_id_lvl2',
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Approval level 2" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users
                                                ?.filter((e) => e.role_id == 2)
                                                ?.map((user) => (
                                                    <SelectItem
                                                        key={user.id}
                                                        value={String(user.id)}
                                                    >
                                                        {user.name}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    {touched.approval_id_lvl2 &&
                                        errors.approval_id_lvl2 && (
                                            <p className="text-sm text-red-500">
                                                {errors.approval_id_lvl2}
                                            </p>
                                        )}
                                </div>
                                {/* Vehicle */}
                                <div className="space-y-1">
                                    <Label>Vehicle</Label>
                                    <Select
                                        onValueChange={(value) =>
                                            setFieldValue('vehicle_id', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select vehicle" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {vehicles.map((vehicle) => (
                                                <SelectItem
                                                    key={vehicle.id}
                                                    value={String(vehicle.id)}
                                                >
                                                    {vehicle.plate_number} -{' '}
                                                    {vehicle.type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {touched.vehicle_id &&
                                        errors.vehicle_id && (
                                            <p className="text-sm text-red-500">
                                                {errors.vehicle_id}
                                            </p>
                                        )}
                                </div>

                                {/* Driver */}
                                <div className="space-y-1">
                                    <Label>Driver</Label>
                                    <Select
                                        onValueChange={(value) =>
                                            setFieldValue('driver_id', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select driver" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {drivers.map((driver) => (
                                                <SelectItem
                                                    key={driver.id}
                                                    value={String(driver.id)}
                                                >
                                                    {driver.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {touched.driver_id && errors.driver_id && (
                                        <p className="text-sm text-red-500">
                                            {errors.driver_id}
                                        </p>
                                    )}
                                </div>

                                {/* Purpose */}
                                <div className="space-y-1">
                                    <Label>Purpose</Label>
                                    <Input
                                        name="purpose"
                                        value={values.purpose}
                                        onChange={handleChange}
                                        placeholder="Enter purpose"
                                    />
                                    {touched.purpose && errors.purpose && (
                                        <p className="text-sm text-red-500">
                                            {errors.purpose}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Button
                                    type="button"
                                    variant={'outline'}
                                    disabled={isLoading}
                                    onClick={() => router.visit('./')}
                                >
                                    Kembali
                                </Button>

                                <Button
                                    type="submit"
                                    variant={'default'}
                                    disabled={isLoading}
                                >
                                    Submit Order
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </AppLayout>
    );
};

export default AddOrderPage;
