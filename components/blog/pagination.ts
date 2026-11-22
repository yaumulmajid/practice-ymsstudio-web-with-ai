// Blog index pagination, shared by the /blog/page/[n] route (server) and the blog list (client).
export const BLOG_PER_PAGE = 4

export const blogPageCount = (total: number) => Math.max(1, Math.ceil(total / BLOG_PER_PAGE))
