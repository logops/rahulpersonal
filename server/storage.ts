import { 
  type Article, type Photo, type Project,
  contentSchema
} from "@shared/schema";
import fs from "fs/promises";
import path from "path";
import { marked } from "marked";

export interface IStorage {
  // Content (file-based)
  getArticles(): Promise<Article[]>;
  getArticle(id: string): Promise<Article | undefined>;
  getPhotos(): Promise<Photo[]>;
  getPhoto(id: string): Promise<Photo | undefined>;
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
}

export class FileStorage implements IStorage {
  private contentDir: string;

  constructor() {
    this.contentDir = path.join(process.cwd(), 'content');
    this.ensureContentDirs().catch(console.error);
  }

  private async ensureContentDirs() {
    const dirs = [
      '_posts',
      '_pages',
      'assets/images',
      '_data'
    ];

    for (const dir of dirs) {
      await fs.mkdir(path.join(this.contentDir, dir), { recursive: true });
    }
  }

  async getArticles(): Promise<Article[]> {
    const postsDir = path.join(this.contentDir, '_posts');
    const files = await fs.readdir(postsDir);

    const articles = await Promise.all(
      files
        .filter(file => file.endsWith('.md'))
        .map(async file => {
          const content = await fs.readFile(path.join(postsDir, file), 'utf-8');
          const [, frontMatter, markdown] = content.split('---');
          const metadata = JSON.parse(frontMatter);

          return {
            ...metadata,
            content: marked(markdown),
            date: file.slice(0, 10), // YYYY-MM-DD from filename
          };
        })
    );

    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getArticle(id: string): Promise<Article | undefined> {
    try {
      const articles = await this.getArticles();
      return articles.find(article => article.title.toLowerCase().replace(/\s+/g, '-') === id);
    } catch (error) {
      console.error('Error getting article:', error);
      return undefined;
    }
  }

  async getPhotos(): Promise<Photo[]> {
    const photosFile = path.join(this.contentDir, '_data', 'photos.json');
    try {
      const content = await fs.readFile(photosFile, 'utf-8');
      const photos = JSON.parse(content);
      return contentSchema.photos.array().parse(photos);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  async getPhoto(id: string): Promise<Photo | undefined> {
    const photos = await this.getPhotos();
    return photos.find(photo => photo.src.includes(id));
  }

  async getProjects(): Promise<Project[]> {
    const projectsFile = path.join(this.contentDir, '_data', 'projects.json');
    try {
      const content = await fs.readFile(projectsFile, 'utf-8');
      const projects = JSON.parse(content);
      return contentSchema.projects.array().parse(projects);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  async getProject(id: string): Promise<Project | undefined> {
    const projects = await this.getProjects();
    return projects.find(project => project.title.toLowerCase().replace(/\s+/g, '-') === id);
  }
}

export const storage = new FileStorage();