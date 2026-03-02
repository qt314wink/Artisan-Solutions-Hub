import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@shared/schema";

const categories = ["All", "Custom Builds", "Countertops", "Lighting & Walls", "Epoxy & Flooring", "Lighting & Fixtures"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [showAfter, setShowAfter] = useState(true);

  const { data: gallery, isLoading } = useQuery<GalleryItem[]>({
    queryKey: activeCategory === "All" ? ["/api/gallery"] : ["/api/gallery", { category: activeCategory }],
    queryFn: () =>
      fetch(activeCategory === "All" ? "/api/gallery" : `/api/gallery?category=${encodeURIComponent(activeCategory)}`)
        .then((r) => r.json()),
  });

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Hero */}
      <section className="bg-charcoal-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Badge className="mb-6" style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C", borderColor: "rgba(201,168,76,0.3)" }}>
            Our Work
          </Badge>
          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-4">
            Before & After <span style={{ color: "#C9A84C" }}>Gallery</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Real projects, real results. Browse our transformation gallery to see the quality and care we bring to every installation.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={activeCategory === cat ? "default" : "outline"}
                style={activeCategory === cat ? { background: "#C9A84C", color: "#1C1C1E", borderColor: "#C9A84C" } : {}}
                onClick={() => setActiveCategory(cat)}
                data-testid={`filter-${cat.toLowerCase().replace(/[\s&]/g, "-")}`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : gallery && gallery.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-lg overflow-hidden border border-border bg-card cursor-pointer hover-elevate"
                  onClick={() => { setSelected(item); setShowAfter(true); }}
                  data-testid={`gallery-item-${item.id}`}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={item.afterImage}
                      alt={`${item.title} - After`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <div>
                        <Badge className="text-xs mb-2" style={{ background: "rgba(201,168,76,0.9)", color: "#1C1C1E" }}>
                          {item.category}
                        </Badge>
                        <p className="text-white text-sm font-medium">Click to see Before & After</p>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold text-white bg-black/50">
                      AFTER
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              No gallery items found for this category.
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-4xl bg-charcoal-dark border-white/10 p-0 overflow-hidden">
          {selected && (
            <div>
              <div className="relative aspect-video">
                <img
                  src={showAfter ? selected.afterImage : selected.beforeImage}
                  alt={showAfter ? "After" : "Before"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-black/40 text-white border border-white/20"
                    onClick={() => setShowAfter(false)}
                    data-testid="button-view-before"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="bg-black/40 text-white border border-white/20"
                    onClick={() => setShowAfter(true)}
                    data-testid="button-view-after"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${!showAfter ? "text-charcoal-dark" : "bg-black/40 text-white"}`}
                    style={!showAfter ? { background: "#C9A84C" } : {}}
                    onClick={() => setShowAfter(false)}
                    data-testid="toggle-before"
                  >
                    BEFORE
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${showAfter ? "text-charcoal-dark" : "bg-black/40 text-white"}`}
                    style={showAfter ? { background: "#C9A84C" } : {}}
                    onClick={() => setShowAfter(true)}
                    data-testid="toggle-after"
                  >
                    AFTER
                  </button>
                </div>
              </div>
              <div className="p-6">
                <Badge style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C" }} className="mb-3">{selected.category}</Badge>
                <h2 className="font-display text-2xl font-bold text-white mb-2">{selected.title}</h2>
                {selected.description && (
                  <p className="text-white/60 text-sm leading-relaxed">{selected.description}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
