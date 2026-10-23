import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Scale, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SEO, PageBanner } from "../../components/common";
import { SearchInput, LoadingSpinner, EmptyState } from "../../components/ui";
import { useGetPublicPracticeAreasQuery } from "../../services/api";

const PracticeAreasPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: practiceAreas, isLoading } = useGetPublicPracticeAreasQuery();

  const filteredAreas = practiceAreas?.filter(
    (area) =>
      area.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="font-sans text-[#252525] bg-[#F7F4ED] min-h-screen pb-24">
      <SEO
        title="Practice Areas | JUSTICIA"
        description="Explore our comprehensive range of legal services and practice areas."
      />

      <PageBanner
        title="Practice Areas"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Practice Areas", path: "/practice-areas" },
        ]}
      />

      <div className="container mx-auto px-4 mt-16">
        <div className="max-w-xl mx-auto mb-16">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search practice areas..."
            className="w-full bg-white shadow-sm"
          />
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : !filteredAreas?.length ? (
          <EmptyState title="No practice areas match your search." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAreas.map((area, idx) => (
              <motion.div
                key={area.id || area.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 border-l-4 border-[#D99A32] shadow-sm hover:shadow-xl transition-shadow group flex flex-col"
              >
                <div className="mb-6 text-[#D99A32] bg-[#F7F4ED] w-16 h-16 flex items-center justify-center rounded-sm">
                  <Scale size={32} />
                </div>
                <h3 className="text-2xl font-serif text-[#080D10] font-bold mb-4">
                  {area.title}
                </h3>
                <p className="text-gray-600 mb-8 flex-grow">
                  {area.shortDescription ||
                    "Comprehensive legal counsel designed to protect your interests and achieve your goals."}
                </p>
                <Link
                  to={`/practice-areas/${area.slug}`}
                  className="mt-auto inline-flex items-center gap-2 text-[#080D10] font-bold group-hover:text-[#D99A32] transition-colors"
                >
                  Read More <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeAreasPage;
