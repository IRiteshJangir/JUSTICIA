import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Calendar, Clock, Share2 } from "lucide-react";
import { SEO, PageBanner } from "../../components/common";
import { LoadingSpinner, EmptyState, Badge, Button } from "../../components/ui";
import { useGetBlogBySlugQuery } from "../../services/api";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const { data: blog, isLoading } = useGetBlogBySlugQuery(slug);

  if (isLoading) return <LoadingSpinner className="my-24" />;
  if (!blog) return <EmptyState title="Article not found." />;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="font-sans text-[#252525] bg-white min-h-screen pb-24">
      <SEO
        title={`${blog.title} | Blog | JUSTICIA`}
        description={blog.excerpt}
      />

      <PageBanner
        title="Legal Insights"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Blog", path: "/blog" },
          { label: "Article", path: "#" },
        ]}
      />

      <div className="container mx-auto px-4 mt-16 max-w-4xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#D99A32] transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={16} /> Back to all articles
        </Link>

        <div className="mb-6">
          <Badge className="bg-[#D99A32] text-white border-none">
            {blog.category?.name || blog.category || "Article"}
          </Badge>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif text-[#080D10] font-bold mb-6 leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-10 pb-6 border-b border-gray-200">
          <span className="flex items-center gap-2">
            <User size={16} />{" "}
            {blog.author?.name || blog.author || "Justicia Admin"}
          </span>
          <span className="flex items-center gap-2">
            <Calendar size={16} />{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} /> {blog.readingTime || "5"} min read
          </span>
        </div>

        {blog.featuredImage ? (
          <div className="w-full aspect-[2/1] bg-[#11191D] mb-12 overflow-hidden rounded-lg shadow-xl relative">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}

        <div
          className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#080D10] prose-a:text-[#D99A32] prose-img:rounded-sm"
          dangerouslySetInnerHTML={{
            __html:
              blog.content ||
              `<p>${blog.excerpt}</p><p>Full content of the article goes here. It provides deep insights into the legal matters discussed.</p>`,
          }}
        />

        {blog.tags?.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            <span className="font-bold mr-2 text-[#080D10] flex items-center">
              Tags:
            </span>
            {blog.tags.map((tag, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-gray-600 border-gray-300"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h4 className="font-bold flex items-center gap-2">
            <Share2 size={18} /> Share this article
          </h4>
          <div className="flex gap-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(blog.title + " " + shareUrl)}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="outline"
                className="p-2 border-gray-300 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-full"
              >
                <span className="sr-only">WhatsApp</span>WA
              </Button>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="outline"
                className="p-2 border-gray-300 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white rounded-full"
              >
                <span className="sr-only">Twitter</span>TW
              </Button>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="outline"
                className="p-2 border-gray-300 text-[#0077b5] hover:bg-[#0077b5] hover:text-white rounded-full"
              >
                <span className="sr-only">LinkedIn</span>IN
              </Button>
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-[#F7F4ED] p-8 md:p-12 text-center rounded-sm">
          <h3 className="text-2xl font-serif text-[#080D10] font-bold mb-4">
            Need Legal Advice on This Topic?
          </h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Our specialized attorneys are here to help you navigate your legal
            challenges.
          </p>
          <Link to="/contact">
            <Button className="bg-[#D99A32] hover:bg-[#080D10] text-white font-bold px-8 py-3 rounded-none">
              Contact Our Team
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
