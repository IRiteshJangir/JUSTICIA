import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { CheckCircle, Calendar as CalendarIcon } from "lucide-react";
import { SEO, PageBanner } from "../../components/common";
import { Button, Input, TextArea, Select } from "../../components/ui";
import {
  useCreateAppointmentMutation,
  useGetPublicPracticeAreasQuery,
} from "../../services/api";

const appointmentSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Valid phone number is required"),
  practiceArea: z.string().min(1, "Please select a practice area"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  consultationType: z.enum(["online", "offline"], {
    required_error: "Please select type",
  }),
  caseDescription: z.string().min(10, "Please briefly describe your case"),
});

const AppointmentPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { data: practiceAreas } = useGetPublicPracticeAreasQuery();
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { consultationType: "online" },
  });

  const today = new Date().toISOString().split("T")[0];
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
  ];

  const areaOptions =
    practiceAreas?.map((area) => ({ value: area._id, label: area.title })) ||
    [];

  const onSubmit = async (data) => {
    try {
      await createAppointment(data).unwrap();
      setIsSuccess(true);
      reset();
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
      const validationMessages = err?.data?.errors
        ?.map((error) => error.message)
        .join(" ");
      toast.error(
        validationMessages ||
          err?.data?.message ||
          err?.error ||
          "Unable to submit your appointment. Please try again.",
      );
    }
  };

  return (
    <div className="font-sans text-[#252525] bg-[#F7F4ED] min-h-screen pb-24">
      <SEO
        title="Book Appointment | JUSTICIA"
        description="Schedule a legal consultation with our expert attorneys."
      />

      <PageBanner
        title="Book a Consultation"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Appointment", path: "/book-appointment" },
        ]}
      />

      <div className="container mx-auto px-4 mt-16 max-w-3xl">
        {isSuccess ? (
          <div className="bg-white p-12 text-center shadow-md border-t-4 border-[#D99A32] rounded-sm">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-serif text-[#080D10] font-bold mb-4">
              Request Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Thank you for requesting a consultation. Our team will review your
              details and contact you shortly to confirm your appointment.
            </p>
            <Button
              onClick={() => setIsSuccess(false)}
              className="bg-[#D99A32] hover:bg-[#080D10] text-white px-8 py-3 rounded-none"
            >
              Book Another Appointment
            </Button>
          </div>
        ) : (
          <div className="bg-white p-8 md:p-12 shadow-sm border-t-4 border-[#D99A32]">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif text-[#080D10] font-bold mb-3">
                Schedule Your Consultation
              </h2>
              <p className="text-gray-500">
                Provide your details below to schedule an appointment with our
                attorneys.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <Input
                    {...register("fullName")}
                    placeholder="John Doe"
                    error={errors.fullName?.message}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    {...register("email")}
                    placeholder="john@example.com"
                    error={errors.email?.message}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    {...register("phone")}
                    placeholder="+1 234 567 8900"
                    error={errors.phone?.message}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Practice Area *
                  </label>
                  <Select
                    {...register("practiceArea")}
                    options={areaOptions}
                    placeholder="Select Practice Area"
                    error={errors.practiceArea?.message}
                  />
                  {errors.practiceArea && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.practiceArea.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      min={today}
                      {...register("preferredDate")}
                      error={errors.preferredDate?.message}
                      className="pl-10"
                    />
                    <CalendarIcon
                      size={16}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />
                  </div>
                  {errors.preferredDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.preferredDate.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Preferred Time *
                  </label>
                  <Select
                    {...register("preferredTime")}
                    options={timeSlots.map((t) => ({ value: t, label: t }))}
                    placeholder="Select Time"
                    error={errors.preferredTime?.message}
                  />
                  {errors.preferredTime && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.preferredTime.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Consultation Type *
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="online"
                      {...register("consultationType")}
                      className="w-4 h-4 text-[#D99A32] focus:ring-[#D99A32]"
                    />
                    <span>Online (Video Call)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="offline"
                      {...register("consultationType")}
                      className="w-4 h-4 text-[#D99A32] focus:ring-[#D99A32]"
                    />
                    <span>In-Office Meeting</span>
                  </label>
                </div>
                {errors.consultationType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.consultationType.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Case Description *
                </label>
                <TextArea
                  {...register("caseDescription")}
                  rows={4}
                  placeholder="Briefly describe your legal issue..."
                  error={errors.caseDescription?.message}
                />
                {errors.caseDescription && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.caseDescription.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#D99A32] hover:bg-[#080D10] text-white px-8 py-4 rounded-none w-full font-bold text-lg transition-colors mt-4"
              >
                {isLoading ? "Submitting..." : "Confirm Appointment"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;
