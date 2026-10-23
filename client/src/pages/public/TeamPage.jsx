import React from "react";
import { Twitter, Linkedin, Mail } from "lucide-react";
import { SEO, PageBanner } from "../../components/common";
import { LoadingSpinner, EmptyState } from "../../components/ui";
import { useGetPublicTeamQuery } from "../../services/api";

const TeamPage = () => {
  const { data: teamMembers, isLoading } = useGetPublicTeamQuery();

  return (
    <div className="font-sans text-[#252525] bg-white min-h-screen pb-24">
      <SEO
        title="Our Team | JUSTICIA"
        description="Meet our team of experienced and dedicated legal professionals."
      />

      <PageBanner
        title="Our Team"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Our Team", path: "/team" },
        ]}
      />

      <div className="container mx-auto px-4 mt-20">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-[#D99A32] font-bold tracking-widest text-sm uppercase mb-2">
            Legal Experts
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#080D10] font-bold mb-4">
            Dedicated to Your Success
          </h2>
          <p className="text-gray-600">
            Our team comprises highly skilled attorneys with decades of combined
            experience across various fields of law.
          </p>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : !teamMembers?.length ? (
          <EmptyState title="No team members available." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {teamMembers.map((member) => (
              <div key={member._id || member.id} className="text-center group">
                <div className="w-56 h-56 mx-auto rounded-full bg-gray-100 mb-6 relative overflow-hidden border-4 border-transparent group-hover:border-[#D99A32] transition-colors shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11191D]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 gap-3">
                    {member.socialLinks?.twitter && (
                      <a
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-full bg-white text-[#1DA1F2] flex items-center justify-center hover:bg-[#D99A32] hover:text-white transition-colors"
                      >
                        <Twitter size={14} />
                      </a>
                    )}
                    {member.socialLinks?.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 rounded-full bg-white text-[#0077b5] flex items-center justify-center hover:bg-[#D99A32] hover:text-white transition-colors"
                      >
                        <Linkedin size={14} />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-8 h-8 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-[#D99A32] hover:text-white transition-colors"
                      >
                        <Mail size={14} />
                      </a>
                    )}
                  </div>
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#11191D] to-[#2a3c46] flex items-center justify-center text-[#D99A32] font-serif text-3xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#080D10] mb-1">
                  {member.name}
                </h3>
                <p className="text-[#D99A32] font-bold mb-3">
                  {member.designation}
                </p>
                <p className="text-gray-500 text-sm px-4 line-clamp-3">
                  {member.specialization ||
                    "Specializing in providing excellent legal counsel and representation."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;
