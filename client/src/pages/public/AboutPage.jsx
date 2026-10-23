import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Target, Award, Heart, ArrowRight } from "lucide-react";
import { SEO, PageBanner, StatsCounter } from "../../components/common";
import { Button, LoadingSpinner, EmptyState } from "../../components/ui";
import { useGetPublicTeamQuery, useGetSettingsQuery } from "../../services/api";

const AboutPage = () => {
  const { data: teamMembers, isLoading: teamLoading } = useGetPublicTeamQuery();
  const { data: settings } = useGetSettingsQuery();

  return (
    <div className="font-sans text-[#252525] bg-white">
      <SEO
        title="About Us | JUSTICIA"
        description="Learn more about our premium law firm and our commitment to justice."
      />

      <PageBanner
        title="About Us"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "About Us", path: "/about" },
        ]}
      />

      {/* About Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden border-l-8 border-[#D99A32] shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                alt="JUSTICIA Legal Chambers"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080D10]/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#11191D] border-2 border-[#D99A32] p-5 rounded-lg shadow-2xl hidden sm:flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#D99A32]/20 flex items-center justify-center text-[#D99A32]">
                <Shield size={24} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Founded On Trust</p>
                <p className="text-[#D99A32] text-xs font-semibold">100% Client Commitment</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <p className="text-[#D99A32] font-bold tracking-widest text-sm uppercase mb-2">
              About Justicia
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-[#080D10] font-bold mb-6">
              A Legacy of Excellence & Integrity
            </h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              At JUSTICIA, we believe in the power of law to transform lives and
              protect what matters most. Established over 15 years ago, our firm
              has built a reputation for relentless advocacy and strategic legal
              solutions.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our team of dedicated professionals brings diverse expertise
              across various practice areas, ensuring that our clients receive
              comprehensive and personalized legal representation. We pride
              ourselves on our transparency, ethical standards, and unwavering
              commitment to client success.
            </p>
            <div className="flex gap-4">
              <Link to="/book-appointment">
                <Button className="bg-[#D99A32] text-white hover:bg-[#080D10] px-8 py-3 rounded-none">
                  Consult With Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#080D10] py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                label: "Years Experience",
                value: `${settings?.data?.statistics?.experience ?? 15}+`,
              },
              {
                label: "Cases Won",
                value: `${settings?.data?.statistics?.casesWon ?? 500}+`,
              },
              {
                label: "Success Rate",
                value: `${settings?.data?.statistics?.successRate ?? 98}%`,
              },
              {
                label: "Happy Clients",
                value: `${settings?.data?.statistics?.happyClients ?? 1000}+`,
              },
            ].map((stat, idx) => (
              <div key={idx} className="p-4">
                <StatsCounter
                  end={parseInt(stat.value)}
                  suffix={stat.value.replace(/[0-9]/g, "")}
                  className="text-[#D99A32] font-serif text-5xl font-bold mb-2 block"
                />
                <p className="text-gray-400 uppercase tracking-widest text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-[#F7F4ED]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-[#080D10] font-bold">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Integrity",
                desc: "We uphold the highest ethical standards in every action we take.",
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "Striving for outstanding results and superior service.",
              },
              {
                icon: Target,
                title: "Commitment",
                desc: "Unwavering dedication to our clients and their objectives.",
              },
              {
                icon: Heart,
                title: "Compassion",
                desc: "Understanding and empathizing with our clients needs.",
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-8 text-center shadow-sm border-b-4 border-transparent hover:border-[#D99A32] transition-all"
              >
                <value.icon className="w-12 h-12 text-[#D99A32] mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-[#080D10] mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-[#D99A32] font-bold tracking-widest text-sm uppercase mb-2">
                Our Experts
              </p>
              <h2 className="text-4xl font-serif text-[#080D10] font-bold">
                Meet The Team
              </h2>
            </div>
            <Link
              to="/team"
              className="hidden md:flex text-[#D99A32] font-bold items-center gap-2 hover:text-[#080D10] transition-colors"
            >
              View All Members <ArrowRight size={16} />
            </Link>
          </div>

          {teamLoading ? (
            <LoadingSpinner />
          ) : !teamMembers?.length ? (
            <EmptyState title="No team members found" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {teamMembers.slice(0, 4).map((member) => (
                <div
                  key={member._id || member.id}
                  className="text-center group"
                >
                  <div className="w-48 h-48 mx-auto rounded-full bg-gray-200 mb-6 overflow-hidden border-4 border-transparent group-hover:border-[#D99A32] transition-colors">
                    {/* Image Placeholder */}
                    <div className="w-full h-full bg-[#11191D]" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#080D10] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#D99A32] mb-2">{member.designation}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 md:hidden text-center">
            <Link to="/team">
              <Button
                variant="outline"
                className="border-[#080D10] text-[#080D10] w-full rounded-none"
              >
                View All Members
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
