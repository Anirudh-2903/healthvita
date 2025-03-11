import React from 'react';
import Image from "next/image";
import RegisterForm from "@/components/forms/RegisterForm";
import Link from "next/link";

const Register = async ({params: {userId}}: SearchParamProps) => {
    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
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
                    <RegisterForm userId={userId} />
                        <p className="copyright py-12">
                            © 2025 HealthVita
                        </p>
                </div>
            </section>
            <Image
                src="/assets/images/register-img.png"
                alt="patient"
                width={1000}
                height={1000}
                className="side-img max-w-[390px]"
            />
        </div>
    );
};

export default Register;