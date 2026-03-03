import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Clock, ArrowRight, Home, ChevronRight } from "lucide-react";
import type { Article } from "@shared/schema";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const categories = ["All", "How-To", "Tips", "Guide"];

export default function Articles() {
  useDocumentTitle("Tips, Guides & Expert Advice — Philadelphia Home Improvement");

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: articles, isLoading } = useQuery<Article[]>({ queryKey: ["/api/articles"] });

  const filtered = articles?.filter((a) => {
    const matchesSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || a.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="bg-charcoal-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors" data-testid="link-breadcrumb-home">
            <Home className="w-4 h-4" />
            <span>Home</span>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span style={{ color: "#C9A84C" }}>Articles</span>
          </Link>
        </div>
      </div>
      {/* Hero */}
      <section className="bg-charcoal-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Badge className="mb-6" style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C", borderColor: "rgba(201,168,76,0.3)" }}>
            Knowledge Hub
          </Badge>
          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-4">
            Tips, Guides &
            <br />
            <span style={{ color: "#C9A84C" }}>Expert Advice</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Answers to the questions homeowners ask us most — written by the professionals who do this work every day.
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <Input
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="input-article-search"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat ? "text-charcoal-dark" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
                style={activeCategory === cat ? { background: "#C9A84C" } : {}}
                onClick={() => setActiveCategory(cat)}
                data-testid={`category-filter-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-5 w-24 rounded-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : filtered && filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article) => (
                <Link key={article.id} href={`/articles/${article.slug}`} className="block group h-full" data-testid={`article-card-${article.id}`}>
                  <Card className="p-6 h-full flex flex-col bg-card border-border hover-elevate transition-all duration-200">
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <Badge variant="outline" className="text-xs">{article.category}</Badge>
                      {article.featured && (
                        <Badge className="text-xs" style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)" }}>
                          Featured
                        </Badge>
                      )}
                    </div>
                    <h2 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime} min read
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium transition-colors" style={{ color: "#C9A84C" }}>
                        Read Article <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                    {article.tags && article.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No articles found.</p>
              <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className="mt-4 text-sm underline" style={{ color: "#C9A84C" }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
