import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const unwrapData = (response) => response?.data;

const unwrapPaginatedData = (key) => (response) => ({
  [key]: response?.data ?? [],
  totalPages: response?.pagination?.pages ?? 1,
});

const baseUrl = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api`
  : '/api';

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    "Appointments",
    "PracticeAreas",
    "CaseStudies",
    "Blogs",
    "BlogCategories",
    "Contact",
    "FAQs",
    "Testimonials",
    "Team",
    "Settings",
    "Dashboard",
  ],
  endpoints: (builder) => ({
    // Auth
    login: builder.mutation({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      transformResponse: unwrapData,
    }),
    getMe: builder.query({ query: () => "/auth/me" }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({ url: "/auth/logout", method: "POST" }),
    }),

    // Appointments
    createAppointment: builder.mutation({
      query: (body) => ({ url: "/appointments", method: "POST", body }),
      invalidatesTags: ["Appointments"],
    }),
    getAppointments: builder.query({
      query: (params) => ({ url: "/appointments", params }),
      providesTags: ["Appointments"],
    }),
    getAppointment: builder.query({
      query: (id) => `/appointments/${id}`,
      providesTags: ["Appointments"],
    }),
    updateAppointmentStatus: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/appointments/${id}/status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Appointments", "Dashboard"],
    }),
    deleteAppointment: builder.mutation({
      query: (id) => ({ url: `/appointments/${id}`, method: "DELETE" }),
      invalidatesTags: ["Appointments", "Dashboard"],
    }),

    // Practice Areas (public)
    getPublicPracticeAreas: builder.query({
      query: (params) => ({ url: "/practice-areas/public", params }),
      transformResponse: unwrapData,
      providesTags: ["PracticeAreas"],
    }),
    getPracticeAreaBySlug: builder.query({
      query: (slug) => `/practice-areas/public/${slug}`,
      transformResponse: unwrapData,
      providesTags: ["PracticeAreas"],
    }),
    // Practice Areas (admin)
    getAdminPracticeAreas: builder.query({
      query: (params) => ({ url: "/practice-areas", params }),
      providesTags: ["PracticeAreas"],
    }),
    createPracticeArea: builder.mutation({
      query: (body) => ({ url: "/practice-areas", method: "POST", body }),
      invalidatesTags: ["PracticeAreas"],
    }),
    updatePracticeArea: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/practice-areas/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["PracticeAreas"],
    }),
    deletePracticeArea: builder.mutation({
      query: (id) => ({ url: `/practice-areas/${id}`, method: "DELETE" }),
      invalidatesTags: ["PracticeAreas"],
    }),

    // Case Studies
    getPublicCaseStudies: builder.query({
      query: (params) => ({ url: "/case-studies/public", params }),
      transformResponse: unwrapPaginatedData("caseStudies"),
      providesTags: ["CaseStudies"],
    }),
    getCaseStudyBySlug: builder.query({
      query: (slug) => `/case-studies/public/${slug}`,
      transformResponse: unwrapData,
      providesTags: ["CaseStudies"],
    }),
    getAdminCaseStudies: builder.query({
      query: (params) => ({ url: "/case-studies", params }),
      providesTags: ["CaseStudies"],
    }),
    createCaseStudy: builder.mutation({
      query: (body) => ({ url: "/case-studies", method: "POST", body }),
      invalidatesTags: ["CaseStudies"],
    }),
    updateCaseStudy: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/case-studies/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["CaseStudies"],
    }),
    deleteCaseStudy: builder.mutation({
      query: (id) => ({ url: `/case-studies/${id}`, method: "DELETE" }),
      invalidatesTags: ["CaseStudies"],
    }),

    // Blogs
    getPublicBlogs: builder.query({
      query: (params) => ({ url: "/blogs/public", params }),
      transformResponse: unwrapPaginatedData("blogs"),
      providesTags: ["Blogs"],
    }),
    getBlogBySlug: builder.query({
      query: (slug) => `/blogs/public/${slug}`,
      transformResponse: unwrapData,
      providesTags: ["Blogs"],
    }),
    getAdminBlogs: builder.query({
      query: (params) => ({ url: "/blogs", params }),
      providesTags: ["Blogs"],
    }),
    createBlog: builder.mutation({
      query: (body) => ({ url: "/blogs", method: "POST", body }),
      invalidatesTags: ["Blogs"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Blogs"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({ url: `/blogs/${id}`, method: "DELETE" }),
      invalidatesTags: ["Blogs"],
    }),

    // Blog Categories
    getBlogCategories: builder.query({
      query: () => "/blog-categories",
      providesTags: ["BlogCategories"],
    }),
    createBlogCategory: builder.mutation({
      query: (body) => ({ url: "/blog-categories", method: "POST", body }),
      invalidatesTags: ["BlogCategories"],
    }),
    updateBlogCategory: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/blog-categories/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["BlogCategories"],
    }),
    deleteBlogCategory: builder.mutation({
      query: (id) => ({ url: `/blog-categories/${id}`, method: "DELETE" }),
      invalidatesTags: ["BlogCategories"],
    }),

    // Contact
    submitContact: builder.mutation({
      query: (body) => ({ url: "/contact", method: "POST", body }),
      invalidatesTags: ["Contact"],
    }),
    getContacts: builder.query({
      query: (params) => ({ url: "/contact", params }),
      providesTags: ["Contact"],
    }),
    getContact: builder.query({
      query: (id) => `/contact/${id}`,
      providesTags: ["Contact"],
    }),
    updateContactStatus: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/contact/${id}/status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Contact", "Dashboard"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({ url: `/contact/${id}`, method: "DELETE" }),
      invalidatesTags: ["Contact", "Dashboard"],
    }),

    // FAQs
    getPublicFaqs: builder.query({
      query: (params) => ({ url: "/faqs/public", params }),
      transformResponse: unwrapData,
      providesTags: ["FAQs"],
    }),
    getAdminFaqs: builder.query({
      query: (params) => ({ url: "/faqs", params }),
      providesTags: ["FAQs"],
    }),
    createFaq: builder.mutation({
      query: (body) => ({ url: "/faqs", method: "POST", body }),
      invalidatesTags: ["FAQs"],
    }),
    updateFaq: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/faqs/${id}`, method: "PUT", body }),
      invalidatesTags: ["FAQs"],
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({ url: `/faqs/${id}`, method: "DELETE" }),
      invalidatesTags: ["FAQs"],
    }),

    // Testimonials
    getPublicTestimonials: builder.query({
      query: () => "/testimonials/public",
      transformResponse: unwrapData,
      providesTags: ["Testimonials"],
    }),
    getAdminTestimonials: builder.query({
      query: (params) => ({ url: "/testimonials", params }),
      providesTags: ["Testimonials"],
    }),
    createTestimonial: builder.mutation({
      query: (body) => ({ url: "/testimonials", method: "POST", body }),
      invalidatesTags: ["Testimonials"],
    }),
    updateTestimonial: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/testimonials/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Testimonials"],
    }),
    deleteTestimonial: builder.mutation({
      query: (id) => ({ url: `/testimonials/${id}`, method: "DELETE" }),
      invalidatesTags: ["Testimonials"],
    }),

    // Team
    getPublicTeam: builder.query({
      query: () => "/team/public",
      transformResponse: unwrapData,
      providesTags: ["Team"],
    }),
    getTeamMember: builder.query({
      query: (id) => `/team/public/${id}`,
      transformResponse: unwrapData,
      providesTags: ["Team"],
    }),
    getAdminTeam: builder.query({
      query: (params) => ({ url: "/team", params }),
      providesTags: ["Team"],
    }),
    createTeamMember: builder.mutation({
      query: (body) => ({ url: "/team", method: "POST", body }),
      invalidatesTags: ["Team"],
    }),
    updateTeamMember: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/team/${id}`, method: "PUT", body }),
      invalidatesTags: ["Team"],
    }),
    deleteTeamMember: builder.mutation({
      query: (id) => ({ url: `/team/${id}`, method: "DELETE" }),
      invalidatesTags: ["Team"],
    }),

    // Settings
    getSettings: builder.query({
      query: () => "/settings",
      providesTags: ["Settings"],
    }),
    updateSettings: builder.mutation({
      query: (body) => ({ url: "/settings", method: "PUT", body }),
      invalidatesTags: ["Settings"],
    }),

    // Dashboard
    getDashboardStats: builder.query({
      query: () => "/dashboard/stats",
      providesTags: ["Dashboard"],
    }),
    getDashboardAnalytics: builder.query({
      query: () => "/dashboard/analytics",
      providesTags: ["Dashboard"],
    }),

    // Upload
    uploadImage: builder.mutation({
      query: (formData) => ({ url: "/upload", method: "POST", body: formData }),
    }),
    deleteImage: builder.mutation({
      query: (publicId) => ({
        url: `/upload/${encodeURIComponent(publicId)}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export all hooks
export const {
  useLoginMutation,
  useGetMeQuery,
  useChangePasswordMutation,
  useLogoutMutation,
  useCreateAppointmentMutation,
  useGetAppointmentsQuery,
  useGetAppointmentQuery,
  useUpdateAppointmentStatusMutation,
  useDeleteAppointmentMutation,
  useGetPublicPracticeAreasQuery,
  useGetPracticeAreaBySlugQuery,
  useGetAdminPracticeAreasQuery,
  useCreatePracticeAreaMutation,
  useUpdatePracticeAreaMutation,
  useDeletePracticeAreaMutation,
  useGetPublicCaseStudiesQuery,
  useGetCaseStudyBySlugQuery,
  useGetAdminCaseStudiesQuery,
  useCreateCaseStudyMutation,
  useUpdateCaseStudyMutation,
  useDeleteCaseStudyMutation,
  useGetPublicBlogsQuery,
  useGetBlogBySlugQuery,
  useGetAdminBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetBlogCategoriesQuery,
  useCreateBlogCategoryMutation,
  useUpdateBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
  useSubmitContactMutation,
  useGetContactsQuery,
  useGetContactQuery,
  useUpdateContactStatusMutation,
  useDeleteContactMutation,
  useGetPublicFaqsQuery,
  useGetAdminFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
  useGetPublicTestimonialsQuery,
  useGetAdminTestimonialsQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  useGetPublicTeamQuery,
  useGetTeamMemberQuery,
  useGetAdminTeamQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
  useGetDashboardStatsQuery,
  useGetDashboardAnalyticsQuery,
  useUploadImageMutation,
  useDeleteImageMutation,
} = api;
