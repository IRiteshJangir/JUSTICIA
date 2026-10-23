import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, User, Clock, Calendar } from "lucide-react";
import { SEO, PageBanner } from "../../components/common";
import {
  Button,
  LoadingSpinner,
  EmptyState,
  Badge,
  SearchInput,
  Pagination,
} from "../../components/ui";
import { useGetPublicBlogsQuery } from "../../services/api";

const BlogPage = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useGetPublicBlogsQuery({
    page,
    limit: 9,
    category: category !== "All" ? category : undefined,
    search: searchTerm,
  });

  const categories = [
    "All",
    "Corporate Law",
    "Criminal Defense",
    "Family Law",
    "Real Estate",
    "Legal Insights",
  ];

  return (
    <div className="font-sans text-[#252525] bg-[#F7F4ED] min-h-screen pb-24">
      <SEO
        title="Legal Blog & Insights | JUSTICIA"
        description="Stay updated with the latest legal news, insights, and firm updates."
      />

      <PageBanner
        title="Legal Insights"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Blog", path: "/blog" },
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
              placeholder="Search articles..."
              className="bg-white"
            />
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : !data?.blogs?.length ? (
          <EmptyState title="No articles found." />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {data.blogs.map((blog) => (
                <div
                  key={blog._id || blog.id}
                  className="bg-white group flex flex-col h-full shadow-sm hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-[16/10] bg-[#11191D] relative overflow-hidden">
                    {blog.featuredImage ? (
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#11191D]">
                        <span className="text-white/20 font-serif text-2xl italic">
                          {blog.category?.name || blog.category || "Article"}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080D10]/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#D99A32] text-white border-none shadow">
                        {blog.category?.name || blog.category || "Article"}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />{" "}
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={12} />{" "}
                        {blog.author?.name || blog.author || "Admin"}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif text-[#080D10] font-bold mb-3 group-hover:text-[#D99A32] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="text-[#080D10] font-bold flex items-center gap-1 text-sm group-hover:text-[#D99A32] transition-colors"
                      >
                        Read Full Article <ArrowRight size={14} />
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

export default BlogPage;
