import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import {
  users, leads, galleryItems, articles, videoEstimates, testimonials,
  type User, type InsertUser,
  type Lead, type InsertLead,
  type GalleryItem, type InsertGalleryItem,
  type Article, type InsertArticle,
  type VideoEstimate, type InsertVideoEstimate,
  type Testimonial, type InsertTestimonial,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;

  getGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItemsByCategory(category: string): Promise<GalleryItem[]>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;

  getArticles(): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  getFeaturedArticles(): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;

  createVideoEstimate(estimate: InsertVideoEstimate): Promise<VideoEstimate>;
  getVideoEstimates(): Promise<VideoEstimate[]>;

  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const [user] = await db.insert(users).values({ ...insertUser, id }).returning();
    return user;
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [result] = await db.insert(leads).values(lead).returning();
    return result;
  }

  async getLeads(): Promise<Lead[]> {
    return db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getGalleryItems(): Promise<GalleryItem[]> {
    return db.select().from(galleryItems).orderBy(desc(galleryItems.createdAt));
  }

  async getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
    return db.select().from(galleryItems).where(eq(galleryItems.category, category)).orderBy(desc(galleryItems.createdAt));
  }

  async createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem> {
    const [result] = await db.insert(galleryItems).values(item).returning();
    return result;
  }

  async getArticles(): Promise<Article[]> {
    return db.select().from(articles).orderBy(desc(articles.createdAt));
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.slug, slug));
    return article;
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return db.select().from(articles).where(eq(articles.featured, true)).orderBy(desc(articles.createdAt));
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const [result] = await db.insert(articles).values(article).returning();
    return result;
  }

  async createVideoEstimate(estimate: InsertVideoEstimate): Promise<VideoEstimate> {
    const meetLink = `https://meet.google.com/new`;
    const [result] = await db.insert(videoEstimates).values({ ...estimate, meetLink, status: "pending" }).returning();
    return result;
  }

  async getVideoEstimates(): Promise<VideoEstimate[]> {
    return db.select().from(videoEstimates).orderBy(desc(videoEstimates.createdAt));
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).where(eq(testimonials.featured, true)).orderBy(desc(testimonials.createdAt));
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [result] = await db.insert(testimonials).values(testimonial).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
