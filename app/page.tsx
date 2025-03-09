import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";

export default function Home() {
  return (
      <div className="flex h-screen max-h-screen">
          {/* TODO :- OTP VERIFICATION / PASSKEY MODAL */}
        <section className="remove-scrollbar container my-auto">
            <div className="sub-container max-w-[496px]">
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
                <PatientForm />
                <div className="text-14-regular mt-20 flex justify-between">
                    <p className="justify-items-end text-dark-600 xl:text-left">
                        © 2025 HealthVita
                    </p>
                    <Link href="/?admin=true" className="text-green-500">
                        Admin
                    </Link>
                </div>
            </div>
        </section>
          <Image
              src="/assets/images/onboarding-img.png"
              alt="patient"
              width={1000}
              height={1000}
              className="side-img max-w-[50%]"
          />
      </div>
  );
}
