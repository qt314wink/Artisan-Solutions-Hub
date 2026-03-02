import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, Star, ChevronRight, CheckCircle2, Wrench, Lightbulb,
  PaintBucket, Layers, Shield, Camera, Sofa, Flame, LayoutGrid, Zap
} from "lucide-react";
import type { Testimonial, GalleryItem, Article } from "@shared/schema";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/articles", label: "Articles" },
  { href: "/show-my-space", label: "Show My Space" },
  { href: "/visualizer", label: "AI Visualizer" },
];

const services = [
  { icon: Camera, label: "Mount & Secure", desc: "TV mounting, cable concealment, shelf & soundbar installs" },
  { icon: Lightbulb, label: "Fixture Refresh", desc: "Light fixtures, ceiling fans, vanity lights — room-level upgrades" },
  { icon: Sofa, label: "Living Room Upgrade", desc: "TV mount, built-ins, accent lighting, wall finishing — one visit" },
  { icon: Layers, label: "Bathroom Refresh", desc: "Vanity, toilet, mirror & lighting upgrade — feels like renovation" },
  { icon: Wrench, label: "Kitchen Surface Upgrade", desc: "Epoxy countertops, backsplash, under-cabinet lighting" },
  { icon: Flame, label: "Custom Feature Wall", desc: "Feature wall, electric fireplace, integrated lighting, trim" },
  { icon: PaintBucket, label: "Painting & Creative Walls", desc: "Full rooms, accent walls, murals, wallpaper" },
  { icon: LayoutGrid, label: "Drywall & Wall Finishes", desc: "Patches, restoration, architectural texture & detail" },
  { icon: Zap, label: "Assembly & Setup", desc: "Furniture assembly, cabinet install, floor install" },
  { icon: Shield, label: "Hauling & Exterior", desc: "Junk removal, power washing, deck staining" },
];

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "12+", label: "Years Experience" },
  { value: "4.9★", label: "Average Rating" },
  { value: "100%", label: "Satisfaction Rate" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-current" : "fill-none"}`}
          style={{ color: "#C9A84C" }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const { data: testimonials } = useQuery<Testimonial[]>({ queryKey: ["/api/testimonials"] });
  const { data: gallery } = useQuery<GalleryItem[]>({ queryKey: ["/api/gallery"] });
  const { data: articles } = useQuery<Article[]>({ queryKey: ["/api/articles"] });

  const featuredGallery = gallery?.filter((g) => g.featured).slice(0, 3) || [];
  const featuredArticles = articles?.filter((a) => a.featured).slice(0, 3) || [];
  const featuredTestimonials = testimonials?.filter((t) => t.featured).slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-dark/80 via-charcoal-dark/60 to-charcoal-dark/90" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 bg-gold/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" style={{ backgroundColor: "#C9A84C" }} />
            <span className="text-sm font-medium" style={{ color: "#C9A84C" }}>Philadelphia's Premier Installation Team</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Fast, Professional
            <br />
            <span style={{ color: "#C9A84C" }}>Results You Can See</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            From TV mounting and lighting to feature walls, epoxy floors, and full bathroom refreshes — we deliver finished outcomes, not task lists. Serving the PHL metro area.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/schedule">
              <Button
                size="lg"
                className="font-semibold text-base px-8"
                style={{ background: "#C9A84C", color: "#1C1C1E", borderColor: "#C9A84C" }}
                data-testid="button-hero-schedule"
              >
                Get a Free Video Estimate
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/gallery">
              <Button
                size="lg"
                variant="outline"
                className="font-semibold text-base px-8 text-white border-white/40 bg-white/10 backdrop-blur-sm"
                data-testid="button-hero-gallery"
              >
                See Our Work
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent" style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)" }} />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-charcoal-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}>
                <div className="font-display text-4xl font-bold mb-2" style={{ color: "#C9A84C" }}>{stat.value}</div>
                <div className="text-sm text-white/60 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-cream dark:bg-charcoal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Services</Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Everything Your Space Needs
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              One team. Every service. Flawless execution. We handle projects of every scale across the Philadelphia metro area and surrounding counties.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {services.map((service) => (
              <div
                key={service.label}
                className="group p-5 rounded-lg bg-white dark:bg-charcoal border border-border hover-elevate transition-all duration-200 cursor-pointer"
                data-testid={`service-card-${service.label.toLowerCase().replace(/[\s&]/g, "-")}`}
              >
                <service.icon className="w-7 h-7 mb-3" style={{ color: "#C9A84C" }} />
                <h3 className="font-semibold text-sm text-foreground mb-1">{service.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services">
              <Button variant="outline" size="lg" data-testid="button-view-all-services">
                View All Services & Packages
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-charcoal-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6" style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C", borderColor: "rgba(201,168,76,0.3)" }}>
                Our Philosophy
              </Badge>
              <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                We Don't Sell Tasks.
                <br />
                <span style={{ color: "#C9A84C" }}>We Sell Outcomes.</span>
              </h2>
              <p className="text-white/75 text-lg leading-relaxed mb-6">
                Nobody wakes up wanting "drywall patching." You want a finished room. A mounted TV that looks intentional. A bathroom that feels upgraded. We bundle skilled labor around the results you actually care about.
              </p>
              <p className="text-white/75 text-lg leading-relaxed mb-8">
                Union-trained craftsmanship serving the PHL metro — Philadelphia, Bucks County, Montgomery County, and surrounding areas. Our clients book us once and call us for everything after.
              </p>
              <div className="flex flex-col gap-3">
                {["Licensed & insured professionals", "White glove service — we clean up after every job", "Transparent pricing, no surprises", "Satisfaction guaranteed on every project"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "#C9A84C" }} />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {featuredGallery.slice(0, 2).map((item) => (
                <div key={item.id} className="rounded-lg overflow-hidden aspect-square">
                  <img
                    src={item.afterImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="col-span-2 rounded-lg overflow-hidden aspect-video">
                {featuredGallery[2] && (
                  <img
                    src={featuredGallery[2].afterImage}
                    alt={featuredGallery[2].title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      {featuredGallery.length > 0 && (
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12 gap-4">
              <div>
                <Badge variant="secondary" className="mb-3">Before & After</Badge>
                <h2 className="font-display text-4xl font-bold text-foreground">Recent Transformations</h2>
              </div>
              <Link href="/gallery">
                <Button variant="outline" data-testid="button-view-gallery">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredGallery.map((item) => (
                <div key={item.id} className="group rounded-lg overflow-hidden border border-border bg-card" data-testid={`gallery-preview-${item.id}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <img src={item.afterImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-sm font-medium">View Before & After</span>
                    </div>
                    <Badge className="absolute top-3 left-3 text-xs" style={{ background: "rgba(201,168,76,0.9)", color: "#1C1C1E" }}>
                      {item.category}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {featuredTestimonials.length > 0 && (
        <section className="py-24 bg-cream dark:bg-charcoal-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <Badge variant="secondary" className="mb-4">Client Stories</Badge>
              <h2 className="font-display text-4xl font-bold text-foreground">What Our Clients Say</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredTestimonials.map((t) => (
                <Card key={t.id} className="p-6 bg-white dark:bg-charcoal" data-testid={`testimonial-${t.id}`}>
                  <StarRating rating={t.rating} />
                  <blockquote className="mt-4 text-foreground/80 leading-relaxed text-sm">
                    "{t.content}"
                  </blockquote>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="font-semibold text-foreground text-sm">{t.name}</div>
                    {t.location && <div className="text-xs text-muted-foreground mt-0.5">{t.location}</div>}
                    {t.service && (
                      <Badge variant="secondary" className="mt-2 text-xs">{t.service}</Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12 gap-4">
              <div>
                <Badge variant="secondary" className="mb-3">Expert Knowledge</Badge>
                <h2 className="font-display text-4xl font-bold text-foreground">Tips, Guides & How-Tos</h2>
              </div>
              <Link href="/articles">
                <Button variant="outline" data-testid="button-view-articles">
                  All Articles
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Link key={article.id} href={`/articles/${article.slug}`}>
                  <a className="block group" data-testid={`article-preview-${article.id}`}>
                    <Card className="p-6 h-full bg-card hover-elevate transition-all duration-200">
                      <Badge variant="outline" className="text-xs mb-3">{article.category}</Badge>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{article.excerpt}</p>
                      <div className="mt-4 flex items-center gap-2 text-sm font-medium" style={{ color: "#C9A84C" }}>
                        Read More <ArrowRight className="w-4 h-4" />
                      </div>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-charcoal-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform
            <br />
            <span style={{ color: "#C9A84C" }}>Your Space?</span>
          </h2>
          <p className="text-white/75 text-lg mb-10 max-w-2xl mx-auto">
            Share a photo of your space, describe your vision, and let our AI show you what's possible. Or schedule a free video estimate with our team today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/visualizer">
              <Button
                size="lg"
                className="font-semibold px-8"
                style={{ background: "#C9A84C", color: "#1C1C1E" }}
                data-testid="button-cta-visualizer"
              >
                Try the AI Visualizer
                <Zap className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/show-my-space">
              <Button
                size="lg"
                variant="outline"
                className="font-semibold px-8 text-white border-white/40 bg-white/10"
                data-testid="button-cta-show-space"
              >
                Show My Space
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-dark border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <span className="font-display text-xl font-bold text-white">
                A-Team<span style={{ color: "#C9A84C" }}> Repair Solutions</span>
              </span>
              <p className="text-white/50 text-sm mt-3 leading-relaxed max-w-xs">
                Philadelphia's premier installation and repair team. Serving the PHL metro, Bucks County, and Montgomery County.
              </p>
              <a href="tel:+12153034494" className="text-sm mt-4 block" style={{ color: "#C9A84C" }}>(215) 303-4494</a>
            </div>
            <div>
              <h4 className="text-white/80 font-semibold text-sm mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <a className="text-white/50 hover:text-white/80 text-sm transition-colors">{link.label}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/80 font-semibold text-sm mb-4">Service Areas</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                <li>Philadelphia</li>
                <li>NE Philly</li>
                <li>Bucks County</li>
                <li>Montgomery County</li>
                <li>Delaware County</li>
                <li>Surrounding PHL Metro</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-white/30 text-xs">
            © 2026 A-Team Repair Solutions. All rights reserved. Licensed & Insured in Pennsylvania & New Jersey.
          </div>
        </div>
      </footer>
    </div>
  );
}
