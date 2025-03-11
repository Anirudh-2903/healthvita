import Image from "next/image";
import AppointmentForm from "@/components/forms/AppointmentForm";
import Link from "next/link";

export default function NewAppointment() {
    return (
        <div className="flex h-screen max-h-screen">
            {/* TODO :- OTP VERIFICATION / PASSKEY MODAL */}
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
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
                    <AppointmentForm />
                    <p className="justify-items-end text-dark-600 xl:text-left">
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
