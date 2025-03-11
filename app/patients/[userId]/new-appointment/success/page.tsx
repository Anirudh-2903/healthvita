import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {getAppointment} from "@/lib/actions/appointment.actions";
import {Doctors} from "@/constants";
import {formatDateTime} from "@/lib/utils";
import {Button} from "@/components/ui/button";

const Success = async ({params: {userId}, searchParams}: SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || '';
    const appointment = await getAppointment(appointmentId);
    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician);
    return (
        <div className="flex h-screen max-h-screen px-[5%]">
            <div className='success-img'>
                <Link href="/">
                    <div className="flex flex-row">
                        <Image
                            src="/assets/icons/logo-icon.svg"
                            alt="logo"
                            width={1000}
                            height={1000}
                            className="h-10 w-fit"
                        />
                        <h1 className="text-white text-2xl font-bold text-center mt-0.5 ml-3 tracking-wide">HealthVita</h1>
                    </div>
                </Link>

                <section className="flex flex-col items-center">
                    <Image
                        src="/assets/gifs/success.gif"
                        height={300}
                        width={280}
                        alt="success"
                    />
                    <h2 className="header mb-6 max-w-[600px] text-center">
                        Your <span className="text-green-500">appointment request</span> has been successfully submitted.
                    </h2>
                    <p>We&#39;ll be in touch shortly to confirm.</p>
                </section>

                <section className="request-details">
                    <p>Requested appointment details:</p>
                    <div className="flex items-center gap-3">
                        <Image
                            src={doctor?.image!}
                            alt="doctor"
                            width={100}
                            height={100}
                            className="size-6"
                        />
                        <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
                    </div>
                    <div className="flex gap-2">
                        <Image
                            src="/assets/icons/calendar.svg"
                            alt="calendar"
                            height={24}
                            width={24}
                        />
                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>

                <Button variant="outline" className="shad-primary-btn" asChild>
                    <Link href={`/patients/${userId}/new-appointment`}>
                        New Appointment
                    </Link>
                </Button>

                <p className="copyright">© 2025 HealthVita</p>
            </div>
        </div>
    );
};

export default Success;