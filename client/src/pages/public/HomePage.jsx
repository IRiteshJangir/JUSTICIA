import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  ArrowRight,
  Scale,
  Shield,
  Users,
  FileText,
  CheckCircle,
  Quote,
  Star,
  Gavel,
  Home,
  Building,
  Receipt,
  Monitor,
  HardHat,
  Award
} from "lucide-react";

import { Button, LoadingSpinner, EmptyState, Badge } from "../../components/ui";
import { SEO } from "../../components/common";
import {
  useGetPublicPracticeAreasQuery,
  useGetPublicTestimonialsQuery,
  useGetPublicBlogsQuery,
  useGetSettingsQuery,
} from "../../services/api";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const renderAreaIcon = (iconName) => {
  switch (iconName) {
    case 'gavel': return <Gavel size={32} />;
    case 'users': return <Users size={32} />;
    case 'home': return <Home size={32} />;
    case 'building': return <Building size={32} />;
    case 'receipt': return <Receipt size={32} />;
    case 'shield': return <Shield size={32} />;
    case 'monitor': return <Monitor size={32} />;
    case 'hard-hat': return <HardHat size={32} />;
    case 'scale':
    default:
      return <Scale size={32} />;
  }
};

const HomePage = () => {
  const { data: practiceAreas = [], isLoading: areasLoading } =
    useGetPublicPracticeAreasQuery({ limit: 6 });
  const { data: testimonials = [], isLoading: testimonialsLoading } =
    useGetPublicTestimonialsQuery();
  const { data: blogsResponse, isLoading: blogsLoading } =
    useGetPublicBlogsQuery({ limit: 3 });
  const { data: settingsResponse } = useGetSettingsQuery();
  const blogs = blogsResponse?.blogs ?? [];
  const statistics = settingsResponse?.data?.statistics;

  return (
    <div className="font-sans text-[#252525]">
      <SEO
        title="Home | JUSTICIA - Advocates & Legal Consultants"
        description="We provide effective legal solutions with integrity, dedication and professionalism."
      />

      {/* 1. Hero Section */}
      <section className="relative bg-[#080D10] min-h-[90vh] flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center pt-20 pb-32">
          <motion.div
            className="w-full lg:w-[60%] pr-0 lg:pr-10"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <p className="text-[#D99A32] uppercase tracking-widest text-sm font-bold mb-4">
              JUSTICIA – Advocates & Legal Consultants
            </p>
            <h1 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-6">
              Defending Rights.
              <br />
              <span className="text-[#D99A32] italic">Delivering Justice.</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-xl">
              We provide effective legal solutions with integrity, dedication
              and professionalism. Your trusted partners in navigating complex
              legal landscapes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book-appointment">
                <Button className="bg-[#D99A32] hover:bg-[#F0B84C] text-[#080D10] font-bold px-8 py-4 rounded-none">
                  Book a Consultation
                </Button>
              </Link>
              <Link to="/practice-areas">
                <Button
                  variant="outline"
                  className="border-[#D99A32] text-[#D99A32] hover:bg-[#D99A32] hover:text-[#080D10] font-bold px-8 py-4 rounded-none flex items-center gap-2"
                >
                  Our Practice Areas <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </motion.div>
          <div className="w-full lg:w-[40%] mt-12 lg:mt-0 relative hidden lg:block">
            <div className="relative mx-auto max-w-sm">
              <div className="w-full aspect-[3/4] rounded-t-full border-4 border-[#D99A32]/60 overflow-hidden shadow-2xl relative bg-[#11191D]">
                <img
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80"
                  alt="Senior Legal Advocate"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080D10]/80 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="absolute -bottom-4 -left-6 bg-[#11191D] border-2 border-[#D99A32] p-4 rounded-lg shadow-2xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#D99A32]/20 flex items-center justify-center text-[#D99A32]">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Top Rated Advocates</p>
                  <p className="text-[#D99A32] text-xs font-semibold">15+ Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-[#11191D] border-t border-[#D99A32]/30 py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                {
                  label: "Years Experience",
                  value: statistics?.experience
                    ? `${statistics.experience}+`
                    : "15+",
                },
                {
                  label: "Cases Won",
                  value: statistics?.casesWon
                    ? `${statistics.casesWon}+`
                    : "500+",
                },
                {
                  label: "Success Rate",
                  value: statistics?.successRate
                    ? `${statistics.successRate}%`
                    : "98%",
                },
                {
                  label: "Happy Clients",
                  value: statistics?.happyClients
                    ? `${statistics.happyClients}+`
                    : "1000+",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="border-r last:border-r-0 border-[#D99A32]/20 px-4"
                >
                  <h4 className="text-[#D99A32] font-serif text-3xl font-bold">
                    {stat.value}
                  </h4>
                  <p className="text-gray-400 text-sm uppercase tracking-wide mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Practice Areas Section */}
      <section className="bg-[#F7F4ED] py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#D99A32] font-bold tracking-widest text-sm uppercase mb-2">
              Our Practice Areas
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-[#080D10] font-bold">
              We Provide Expert Legal Solutions
            </h2>
          </div>

          {areasLoading ? (
            <LoadingSpinner />
          ) : !practiceAreas.length ? (
            <EmptyState title="No practice areas found" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {practiceAreas.map((area) => (
                <motion.div
                  key={area._id || area.id || area.slug}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="bg-white p-8 border-t-4 border-[#D99A32] shadow-lg hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-[#F7F4ED] flex items-center justify-center mb-6 text-[#D99A32] group-hover:bg-[#080D10] group-hover:text-[#F0B84C] transition-colors">
                    {renderAreaIcon(area.icon)}
                  </div>
                  <h3 className="text-2xl font-serif text-[#080D10] font-bold mb-4">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {area.shortDescription ||
                      "Expert legal services tailored to your specific needs."}
                  </p>
                  <Link
                    to={`/practice-areas/${area.slug}`}
                    className="text-[#D99A32] font-bold flex items-center gap-2 hover:text-[#080D10] transition-colors"
                  >
                    Learn More <ArrowRight size={16} />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/practice-areas">
              <Button className="bg-[#D99A32] hover:bg-[#080D10] text-white px-8 py-3 rounded-none transition-colors">
                View All Practice Areas →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#D99A32] font-bold tracking-widest text-sm uppercase mb-2">
              Why Choose Us
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-[#080D10] font-bold">
              Your Case, Our Priority
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                icon: Users,
                title: "Experienced Lawyers",
                desc: "Top tier legal professionals.",
              },
              {
                icon: CheckCircle,
                title: "Client Focused",
                desc: "Your interests come first.",
              },
              {
                icon: Shield,
                title: "Proven Track Record",
                desc: "History of successful cases.",
              },
              {
                icon: FileText,
                title: "Transparent Fees",
                desc: "No hidden legal costs.",
              },
              {
                icon: Scale,
                title: "Confidentiality",
                desc: "100% privacy guaranteed.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-center p-6 border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-[#D99A32] mx-auto mb-4" />
                <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Testimonials Section */}
      <section className="bg-[#080D10] py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#D99A32] font-bold tracking-widest text-sm uppercase mb-2">
              Testimonials
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-white font-bold">
              What Our Clients Say
            </h2>
          </div>

          {testimonialsLoading ? (
            <LoadingSpinner />
          ) : (
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              className="pb-16"
            >
              {testimonials?.map((testimonial) => (
                <SwiperSlide key={testimonial._id || testimonial.id}>
                  <div className="bg-[#11191D] p-8 rounded-sm border border-[#D99A32]/20 h-full relative">
                    <Quote className="absolute top-4 right-4 text-[#D99A32]/20 w-12 h-12" />
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill="#D99A32"
                          color="#D99A32"
                        />
                      ))}
                    </div>
                    <p className="text-gray-300 italic mb-6 relative z-10">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <h4 className="text-[#D99A32] font-bold">
                        {testimonial.clientName}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* 5. Blog Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#D99A32] font-bold tracking-widest text-sm uppercase mb-2">
              Latest Articles
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-[#080D10] font-bold">
              Legal Insights & Updates
            </h2>
          </div>

          {blogsLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <motion.div
                  key={blog._id || blog.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="group cursor-pointer"
                >
                  <div className="aspect-video bg-[#11191D] mb-4 overflow-hidden relative rounded-sm shadow-md">
                    <img 
                      src={blog.featuredImage || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80'} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#080D10]/20 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                  <Badge className="bg-[#F7F4ED] text-[#D99A32] mb-3">
                    {blog.category?.name || blog.category || "Article"}
                  </Badge>
                  <h3 className="text-xl font-bold font-serif mb-2 group-hover:text-[#D99A32] transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="text-[#D99A32] font-bold flex items-center gap-1 text-sm"
                    >
                      Read More <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/blog">
              <Button
                variant="outline"
                className="border-[#080D10] text-[#080D10] hover:bg-[#080D10] hover:text-white px-8 py-3 rounded-none"
              >
                View All Articles →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="bg-[#D99A32] py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-[#080D10] font-bold mb-8">
            Need Legal Assistance? Contact Us Today
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/book-appointment">
              <Button className="bg-white text-[#080D10] hover:bg-gray-100 font-bold px-8 py-4 rounded-none shadow-lg">
                Schedule a Consultation
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#D99A32] font-bold px-8 py-4 rounded-none shadow-lg"
              >
                Call Us Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
