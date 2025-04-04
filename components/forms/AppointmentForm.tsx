"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {Form} from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import {useState} from "react";
import {getAppointmentSchema} from "@/lib/validation";
import {useRouter} from "next/navigation";
import {Doctors} from "@/constants";
import {SelectItem} from "@/components/ui/select";
import Image from "next/image";
import {createAppointment, updateAppointment} from "@/lib/actions/appointment.actions";
import {Appointment} from "@/types/appwrite.types";

export enum FormFieldType {
    TEXTAREA = "textarea",
    DATE_PICKER = "datePicker",
    SELECT = "select",
}

const AppointmentForm = ({userId,patientId,type,appointment,setOpen}: {
    userId: string,
    patientId: string,
    type: "create" | "cancel" | 'schedule',
    appointment?: Appointment,
    setOpen?: (open: boolean) => void
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const AppointmentFormValidation = getAppointmentSchema(type);
    // 1. Define your form.
    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            primaryPhysician: appointment ? appointment.primaryPhysician : "",
            schedule: appointment ? new Date(appointment.schedule) : new Date(Date.now()),
            reason: appointment ? appointment.reason : "",
            note: appointment ? appointment.note : "",
            cancellationReason: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
        setIsLoading(true);
        console.log("IM HERE",type)
        let status;
        switch (type) {
            case "cancel":
                status = "cancelled";
                break;
            case "schedule":
                status = "scheduled";
                break;
            default:
                status = "pending";
                break;
        }

        try {
           if (type === "create" && patientId) {
               const appointmentData = {
                   userId,
                   patient: patientId,
                   primaryPhysician: values.primaryPhysician,
                   schedule: new Date(values.schedule),
                   reason: values.reason!,
                   note: values.note,
                   status: status as Status,
               }
               const appointment = await createAppointment(appointmentData)
               if (appointment) {
                   form.reset();
                   router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`);
               }
           } else {
               const appointmentToUpdate = {
                   userId,
                   // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                   appointmentId: appointment?.$id!,
                   appointment: {
                       primaryPhysician: values?.primaryPhysician,
                       schedule: new Date(values.schedule),
                       status: status as Status,
                       cancellationReason: values.cancellationReason,
                   },
                   type
               }
               const updatedAppointment = await updateAppointment(appointmentToUpdate);
               if (updatedAppointment) {
                   // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                   setOpen && setOpen(false);
                   form.reset();
               }
           }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    let buttonLabel;
    switch (type) {
        case "create":
            buttonLabel = "Create Appointment";
            break;
        case "cancel":
            buttonLabel = "Cancel Appointment";
            break;
        case "schedule":
            buttonLabel = "Schedule Appointment";
            break;
        default:
            break;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                {type === "create" && <section className="mb-12 space-y-4">
                    <h1 className="header">New Appointment</h1>
                    <p className="text-dark-700">Request a new appointment in one minute</p>
                </section>}

                {type !== "cancel" && (
                    <>
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name="primaryPhysician"
                            label="Doctor"
                            placeholder="Select a doctor"
                        >
                            {Doctors.map((doctor) => (
                                <SelectItem key={doctor.name} value={doctor.name}>
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <Image
                                            src={doctor.image}
                                            alt={doctor.name}
                                            width={32}
                                            height={32}
                                            className="rounded-full border border-dark-500"
                                        />
                                        <p>{doctor.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="schedule"
                            label="Expected Appointment Date"
                            showTimeSelect
                            dateFormat="dd/MM/yyyy - h:mm aa"
                        />

                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="reason"
                                label="Reason for Appointment"
                                placeholder="Enter your reason for appointment"
                            />

                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name="note"
                                label="Notes"
                                placeholder="Enter any additional notes"
                            />
                        </div>

                    </>
                )}

                {type === "cancel" && (
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="cancellationReason"
                        label="Reason for Cancellation"
                        placeholder="Enter your reason for cancellation"
                    />
                )}

                <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>{buttonLabel}</SubmitButton>
            </form>
        </Form>
    );
}

export default AppointmentForm;