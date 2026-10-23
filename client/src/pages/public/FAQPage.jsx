import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SEO, PageBanner } from "../../components/common";
import {
  SearchInput,
  LoadingSpinner,
  EmptyState,
  Button,
} from "../../components/ui";
import { useGetPublicFaqsQuery } from "../../services/api";
import { Link } from "react-router-dom";

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openId, setOpenId] = useState(null);
  const { data: faqs, isLoading } = useGetPublicFaqsQuery();

  const filteredFaqs = faqs?.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="font-sans text-[#252525] bg-[#F7F4ED] min-h-screen pb-24">
      <SEO
        title="Frequently Asked Questions | JUSTICIA"
        description="Find answers to common legal questions."
      />

      <PageBanner
        title="FAQ"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "FAQ", path: "/faq" },
        ]}
      />

      <div className="container mx-auto px-4 mt-16 max-w-3xl">
        <div className="mb-12">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search questions..."
            className="bg-white shadow-sm"
          />
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : !filteredFaqs?.length ? (
          <EmptyState title="No FAQs found matching your search." />
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => (
              <div
                key={faq._id || faq.id || idx}
                className="bg-white shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  className={`w-full text-left px-6 py-5 flex items-center justify-between font-bold text-lg transition-colors ${openId === (faq._id || faq.id) ? "bg-[#11191D] text-white border-l-4 border-[#D99A32]" : "text-[#080D10] hover:bg-gray-50 border-l-4 border-transparent"}`}
                  onClick={() =>
                    setOpenId(
                      openId === (faq._id || faq.id) ? null : faq._id || faq.id,
                    )
                  }
                >
                  <span className="font-serif">{faq.question}</span>
                  {openId === faq.id ? (
                    <ChevronUp size={20} className="text-[#D99A32]" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </button>
                <AnimatePresence>
                  {openId === (faq._id || faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-5 pt-2 text-gray-600 bg-white"
                    >
                      <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 bg-[#080D10] p-10 text-center text-white shadow-lg">
          <h3 className="text-2xl font-serif font-bold mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            If you couldn't find the answer to your question, feel free to
            contact us directly.
          </p>
          <Link to="/contact">
            <Button className="bg-[#D99A32] hover:bg-[#F0B84C] text-[#080D10] font-bold px-8 py-3 rounded-none">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
