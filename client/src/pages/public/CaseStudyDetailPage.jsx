import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Trophy, Calendar } from "lucide-react";
import { SEO, PageBanner } from "../../components/common";
import { Button, LoadingSpinner, EmptyState, Badge } from "../../components/ui";
import { useGetCaseStudyBySlugQuery } from "../../services/api";

const CaseStudyDetailPage = () => {
  const { slug } = useParams();
  const { data: caseStudy, isLoading } = useGetCaseStudyBySlugQuery(slug);

  if (isLoading) return <LoadingSpinner className="my-24" />;
  if (!caseStudy) return <EmptyState title="Case study not found." />;

  return (
    <div className="font-sans text-[#252525] bg-white min-h-screen pb-24">
      <SEO
        title={`${caseStudy.title} | Case Studies | JUSTICIA`}
        description={caseStudy.description}
      />

      <PageBanner
        title="Case Study"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Case Studies", path: "/case-studies" },
          { label: "Details", path: "#" },
        ]}
      />

      <div className="container mx-auto px-4 mt-16 max-w-4xl">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#D99A32] transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={16} /> Back to all cases
        </Link>

        <div className="flex flex-wrap gap-3 mb-6">
          <Badge className="bg-[#F7F4ED] text-[#D99A32] text-sm px-4 py-1">
            {caseStudy.category}
          </Badge>
          <Badge className="bg-green-100 text-green-800 text-sm px-4 py-1 flex items-center gap-1">
            <Trophy size={14} /> Outcome: {caseStudy.outcome || "Favorable"}
          </Badge>
          <Badge className="bg-gray-100 text-gray-600 text-sm px-4 py-1 flex items-center gap-1">
            <Calendar size={14} /> {new Date(caseStudy.createdAt).getFullYear()}
          </Badge>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif text-[#080D10] font-bold mb-8 leading-tight">
          {caseStudy.title}
        </h1>

        {caseStudy.featuredImage ? (
          <div className="w-full aspect-video bg-[#11191D] mb-12 overflow-hidden rounded-lg shadow-xl relative">
            <img
              src={caseStudy.featuredImage}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full aspect-video bg-[#11191D] mb-12 flex items-center justify-center rounded-sm">
            <Trophy className="text-[#D99A32]/10 w-32 h-32" />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#080D10] prose-a:text-[#D99A32]"
          dangerouslySetInnerHTML={{
            __html:
              caseStudy.content ||
              `<p>Detailed overview of the case, the challenges faced, the strategy implemented by our legal team, and the final favorable outcome achieved for our client.</p>`,
          }}
        />

        <div className="mt-16 bg-[#080D10] p-12 text-center rounded-sm border-t-4 border-[#D99A32]">
          <h3 className="text-2xl font-serif text-white font-bold mb-4">
            Facing a Similar Legal Challenge?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Let our experienced legal team review your situation and build a
            strong strategy for your case.
          </p>
          <Link to="/book-appointment">
            <Button className="bg-[#D99A32] hover:bg-[#F0B84C] text-[#080D10] font-bold px-8 py-4 rounded-none">
              Schedule a Consultation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetailPage;
