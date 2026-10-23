import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy } from "lucide-react";
import { SEO, PageBanner } from "../../components/common";
import {
  Button,
  LoadingSpinner,
  EmptyState,
  Badge,
  SearchInput,
  Pagination,
} from "../../components/ui";
import {
  useGetPublicCaseStudiesQuery,
  useGetPublicPracticeAreasQuery,
} from "../../services/api";

const CaseStudiesPage = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: areas } = useGetPublicPracticeAreasQuery();
  const { data, isLoading } = useGetPublicCaseStudiesQuery({
    page,
    limit: 9,
    category: category !== "All" ? category : undefined,
    search: searchTerm,
  });

  const categories = ["All", ...(areas?.map((a) => a.title) || [])];

  return (
    <div className="font-sans text-[#252525] bg-[#F7F4ED] min-h-screen pb-24">
      <SEO
        title="Case Studies | JUSTICIA"
        description="Explore our successful legal cases and proven track record."
      />

      <PageBanner
        title="Case Studies"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Case Studies", path: "/case-studies" },
        ]}
      />

      <div className="container mx-auto px-4 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <Button
                key={idx}
                variant={category === cat ? "default" : "outline"}
                className={`rounded-full px-6 ${category === cat ? "bg-[#080D10] text-white" : "border-gray-300 text-gray-600 bg-white hover:border-[#080D10]"}`}
                onClick={() => {
                  setCategory(cat);
                  setPage(1);
                }}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="w-full md:w-72">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search cases..."
              className="bg-white"
            />
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : !data?.caseStudies?.length ? (
          <EmptyState title="No case studies found." />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {data.caseStudies.map((caseStudy) => (
                <div
                  key={caseStudy._id || caseStudy.id}
                  className="bg-white group flex flex-col h-full shadow-sm hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-[4/3] bg-[#11191D] relative overflow-hidden flex items-center justify-center">
                    {caseStudy.featuredImage ? (
                      <img
                        src={caseStudy.featuredImage}
                        alt={caseStudy.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <Trophy className="text-[#D99A32]/20 w-24 h-24" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080D10]/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-[#F7F4ED] text-[#D99A32]">
                        {caseStudy.category}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800">
                        {caseStudy.outcome || "Won"}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-serif text-[#080D10] font-bold mb-3 group-hover:text-[#D99A32] transition-colors">
                      {caseStudy.title}
                    </h3>
                    <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                      {caseStudy.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-400">
                        {new Date(caseStudy.createdAt).toLocaleDateString()}
                      </span>
                      <Link
                        to={`/case-studies/${caseStudy.slug}`}
                        className="text-[#D99A32] font-bold flex items-center gap-1 text-sm"
                      >
                        Read Case <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {data.totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={page}
                  totalPages={data.totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CaseStudiesPage;
