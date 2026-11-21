import siteConfig from "../../data/site-config.json";
import about from "../../data/about.json";
import services from "../../data/services.json";
import courses from "../../data/courses.json";
import products from "../../data/products.json";
import portfolio from "../../data/portfolio.json";
import testimonials from "../../data/testimonials.json";

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };
export type Service = (typeof services.items)[number];
export type CourseCategory = (typeof courses.categories)[number];
export type CourseItem = (typeof courses.items)[number];
export type Product = (typeof products.items)[number];
export type PortfolioItem = (typeof portfolio.items)[number];

export const site = siteConfig;
export const aboutData = about;
export const servicesData = services;
export const coursesData = courses;
export const productsData = products;
export const portfolioData = portfolio;
export const testimonialsData = testimonials;

export function getProduct(slug: string): Product | undefined {
  return products.items.find((p) => p.slug === slug);
}
export function getAllProductSlugs(): string[] {
  return products.items.map((p) => p.slug);
}

export function getCourse(slug: string): CourseItem | undefined {
  return courses.items.find((c) => c.slug === slug);
}
export function getCourseCategory(id: string): CourseCategory | undefined {
  return courses.categories.find((c) => c.id === id);
}
