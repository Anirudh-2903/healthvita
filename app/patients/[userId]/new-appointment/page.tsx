import Image from "next/image";
import AppointmentForm from "@/components/forms/AppointmentForm";
import {getPatient} from "@/lib/actions/patient.actions";
import Link from "next/link";

export default async function NewAppointment({params: {userId}}: SearchParamProps) {
    const patient = await getPatient(userId);
    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <Link href="/">
                        <div className="flex flex-row">
                            <Image
                                src="/assets/icons/logo-icon.svg"
                                alt="patient"
                                width={1000}
                                height={1000}
                                className="mb-12 h-10 w-fit"
                            />
                            <h1 className="text-white text-2xl font-bold text-center mt-0.5 ml-3 tracking-wide">HealthVita</h1>
                        </div>
                    </Link>
                    <AppointmentForm
                        type="create"
                        userId={userId}
                        patientId={patient.$id}
                    />
                    <p className="copyright mt-10 py-12">
                        © 2025 HealthVita
                    </p>
                </div>
            </section>
            <Image
                src="/assets/images/appointment-img.png"
                alt="appointment"
                width={1000}
                height={1000}
                className="side-img max-w-[390px] bg-bottom"
            />
        </div>
    );
}
