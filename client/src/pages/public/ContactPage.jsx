import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SEO, PageBanner, WhatsAppButton } from "../../components/common";
import { Button, Input, TextArea } from "../../components/ui";
import {
  useSubmitContactMutation,
  useGetSettingsQuery,
} from "../../services/api";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Valid phone number is required"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactPage = () => {
  const [submitContact, { isLoading }] = useSubmitContactMutation();
  const { data: settings } = useGetSettingsQuery();
  const contactSettings = settings?.data?.contact;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      await submitContact(data).unwrap();
      toast.success(
        "Your message has been sent successfully. We will get back to you shortly.",
      );
      reset();
    } catch (err) {
      toast.error(
        err?.data?.message || "Failed to send message. Please try again.",
      );
    }
  };

  return (
    <div className="font-sans text-[#252525] bg-[#F7F4ED] min-h-screen pb-24">
      <SEO
        title="Contact Us | JUSTICIA"
        description="Get in touch with our legal team for expert advice and representation."
      />

      <PageBanner
        title="Contact Us"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Contact", path: "/contact" },
        ]}
      />

      <div className="container mx-auto px-4 mt-16">
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Left: Contact Form */}
          <div className="w-full lg:w-3/5 bg-white p-8 md:p-12 shadow-sm border-t-4 border-[#D99A32]">
            <h2 className="text-3xl font-serif text-[#080D10] font-bold mb-2">
              Send Us a Message
            </h2>
            <p className="text-gray-500 mb-8">
              Fill out the form below and our team will contact you promptly.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <Input
                    {...register("name")}
                    placeholder="John Doe"
                    error={errors.name?.message}
                    className="bg-gray-50"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
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
                    className="bg-gray-50"
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
                    className="bg-gray-50"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Subject *
                  </label>
                  <Input
                    {...register("subject")}
                    placeholder="Legal Consultation"
                    error={errors.subject?.message}
                    className="bg-gray-50"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Message *
                </label>
                <TextArea
                  {...register("message")}
                  rows={5}
                  placeholder="How can we help you?"
                  error={errors.message?.message}
                  className="bg-gray-50"
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#D99A32] hover:bg-[#080D10] text-white px-8 py-3 rounded-none w-full md:w-auto font-bold transition-colors"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className="w-full lg:w-2/5">
            <div className="bg-[#080D10] text-white p-8 md:p-12 h-full">
              <h3 className="text-2xl font-serif font-bold mb-8 text-[#D99A32]">
                Get In Touch
              </h3>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#11191D] rounded-full flex items-center justify-center flex-shrink-0 text-[#D99A32]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Office Address</h4>
                    <p className="text-gray-400">
                      {contactSettings?.address ||
                        "123 Legal Avenue, Suite 400, New York, NY 10001"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#11191D] rounded-full flex items-center justify-center flex-shrink-0 text-[#D99A32]">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone Number</h4>
                    <p className="text-gray-400">
                      {contactSettings?.phone || "+1 (555) 123-4567"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#11191D] rounded-full flex items-center justify-center flex-shrink-0 text-[#D99A32]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email Address</h4>
                    <p className="text-gray-400">
                      {contactSettings?.email || "contact@justicia.com"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#11191D] rounded-full flex items-center justify-center flex-shrink-0 text-[#D99A32]">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Working Hours</h4>
                    <p className="text-gray-400">
                      {contactSettings?.workingHours ||
                        "Mon - Fri: 9:00 AM - 6:00 PM"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 w-full max-w-6xl mx-auto h-[400px] bg-gray-300 border-4 border-white shadow-sm flex items-center justify-center">
          {/* Map Placeholder */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2527999824!2d-74.14448744926521!3d40.69766373752677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1683232145321!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          ></iframe>
        </div>
      </div>
      <WhatsAppButton phoneNumber={settings?.phone || "1234567890"} />
    </div>
  );
};

export default ContactPage;
