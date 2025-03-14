import React from 'react';
import Link from "next/link";
import Image from "next/image";
import StatCard from "@/components/StatCard";
import {getRecentAppointmentList} from "@/lib/actions/appointment.actions";
import {DataTable} from "@/components/table/DataTable";
import {columns} from "@/components/table/columns";

const Admin = async () => {
    const appointments = await getRecentAppointmentList();
    return (
        <div className="mx-auto flex max-w-7xl flex-col space-y-14">
            <header className="admin-header">
                <Link href="/">
                    <div className="flex flex-row">
                        <Image
                            src="/assets/icons/logo-icon.svg"
                            alt="Logo"
                            width={162}
                            height={32}
                            className="h-8 w-fit"
                        />
                        <h1 className="text-white text-2xl font-bold text-center mt-0.5 ml-3 tracking-wide">HealthVita</h1>
                    </div>
                </Link>
                <p className="text-16-semibold">Admin Dashboard</p>
            </header>

            <main className="admin-main">
                <section className="w-full space-y-4">
                    <h1 className="header">Welcome 👋</h1>
                    <p className="text-dark-700">Start the day with managing new appointments</p>
                </section>
                <section className="admin-stat">
                    <StatCard
                        type="appointments"
                        count={appointments.scheduledCount}
                        label="Scheduled Appointments"
                        icon="/assets/icons/appointments.svg"
                    />
                    <StatCard
                        type="pending"
                        count={appointments.pendingCount}
                        label="Pending Appointments"
                        icon="/assets/icons/pending.svg"
                    />
                    <StatCard
                        type="cancelled"
                        count={appointments.cancelledCount}
                        label="Cancelled Appointments"
                        icon="/assets/icons/cancelled.svg"
                    />
                </section>
                <DataTable columns={columns} data={appointments.documents} />
            </main>
        </div>
    );
};

export default Admin;