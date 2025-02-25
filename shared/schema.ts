import { z } from "zod";

// Define content schemas that match the file structure
export const contentSchema = {
  articles: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string(),
    content: z.string(),
    pdfUrl: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),

  photos: z.object({
    src: z.string(),
    alt: z.string(),
    date: z.string(),
    description: z.string().optional(),
  }),

  projects: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
    image: z.string(),
    workLink: z.string().optional(),
    category: z.string().default("project"),
  }),
};

// Export content types and schemas
export type Article = z.infer<typeof contentSchema.articles>;
export type Photo = z.infer<typeof contentSchema.photos>;
export type Project = z.infer<typeof contentSchema.projects>;

export const insertArticleSchema = contentSchema.articles;
export const insertPhotoSchema = contentSchema.photos;
export const insertProjectSchema = contentSchema.projects;