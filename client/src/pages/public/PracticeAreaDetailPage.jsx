import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { SEO, PageBanner } from "../../components/common";
import { Button, LoadingSpinner, EmptyState, Card } from "../../components/ui";
import { useGetPracticeAreaBySlugQuery } from "../../services/api";

const PracticeAreaDetailPage = () => {
  const { slug } = useParams();
  const { data: area, isLoading } = useGetPracticeAreaBySlugQuery(slug);

  if (isLoading) return <LoadingSpinner className="my-24" />;
  if (!area) return <EmptyState title="Practice area not found." />;

  return (
    <div className="font-sans text-[#252525] bg-white min-h-screen">
      <SEO
        title={`${area.title} | Practice Areas | JUSTICIA`}
        description={area.shortDescription}
      />

      <PageBanner
        title={area.title}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Practice Areas", path: "/practice-areas" },
          { label: area.title, path: `/practice-areas/${slug}` },
        ]}
      />

      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl font-serif text-[#080D10] font-bold mb-6">
              Overview
            </h2>
            <div
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#080D10] prose-a:text-[#D99A32]"
              dangerouslySetInnerHTML={{
                __html:
                  area.description ||
                  area.content ||
                  `<p>We provide comprehensive legal services in ${area.title}. Our team is dedicated to offering strategic advice and representation tailored to your unique circumstances.</p>`,
              }}
            />

            {/* Related Case Studies (Mocked based on relation or simply empty state for now) */}
            <div className="mt-16 pt-12 border-t border-gray-200">
              <h3 className="text-2xl font-serif text-[#080D10] font-bold mb-6">
                Related Case Studies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-[#F7F4ED] border-none shadow-sm hover:shadow-md transition-shadow">
                  <FileText className="text-[#D99A32] mb-4 w-8 h-8" />
                  <h4 className="font-bold text-[#080D10] mb-2">
                    Success in Complex Litigation
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    How we secured a favorable outcome for our client in a
                    high-stakes dispute.
                  </p>
                  <Link
                    to="/case-studies"
                    className="text-[#D99A32] text-sm font-bold flex items-center gap-1"
                  >
                    Read Case Study <ArrowRight size={14} />
                  </Link>
                </Card>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-[#11191D] text-white p-8 sticky top-24">
              <h3 className="text-2xl font-serif font-bold mb-4">
                Need Help With {area.title}?
              </h3>
              <p className="text-gray-400 mb-8">
                Our expert legal team is ready to analyze your situation and
                provide the best course of action.
              </p>
              <Link to="/book-appointment">
                <Button className="w-full bg-[#D99A32] hover:bg-[#F0B84C] text-[#080D10] font-bold py-4 rounded-none">
                  Book a Consultation
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="w-full mt-4 border-gray-600 text-white hover:bg-gray-800 hover:text-white py-4 rounded-none"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeAreaDetailPage;
