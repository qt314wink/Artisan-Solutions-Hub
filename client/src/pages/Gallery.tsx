import { useState, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";
import type { GalleryItem } from "@shared/schema";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const categories = ["All", "Custom Builds", "Countertops", "Lighting & Walls", "Epoxy & Flooring", "Lighting & Fixtures"];

function PanoramicCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setPos({ x, y });
  }, []);

  const rotateY = hover ? (pos.x - 0.5) * 12 : 0;
  const rotateX = hover ? -(pos.y - 0.5) * 8 : 0;
  const beforeOpacity = hover ? Math.max(0, 1 - pos.x * 2) : 0;
  const afterOpacity = hover ? Math.max(0, (pos.x - 0.5) * 2) : 1;
  const midBlend = hover ? 1 - Math.abs(pos.x - 0.5) * 2 : 0;
  const labelText = !hover ? "AFTER" : pos.x < 0.33 ? "BEFORE" : pos.x > 0.66 ? "AFTER" : "TRANSITIONING";
  const labelStyle = !hover ? "bg-black/50" : pos.x < 0.33 ? "bg-red-600/80" : pos.x > 0.66 ? "bg-emerald-600/80" : "bg-amber-600/80";

  return (
    <div
      ref={cardRef}
      className="group rounded-lg overflow-hidden border border-border bg-card cursor-pointer"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPos({ x: 0.5, y: 0.5 }); }}
      onClick={onClick}
      data-testid={`gallery-item-${item.id}`}
    >
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{
          transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
          transition: hover ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        <img
          src={item.beforeImage}
          alt={`${item.title} before renovation in Philadelphia`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          style={{
            opacity: beforeOpacity + midBlend * 0.5,
            transition: hover ? "opacity 0.05s" : "opacity 0.4s",
          }}
          draggable={false}
        />
        <img
          src={item.afterImage}
          alt={`${item.title} after renovation in Philadelphia`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          style={{
            opacity: afterOpacity + midBlend * 0.3,
            transition: hover ? "opacity 0.05s" : "opacity 0.4s",
          }}
          draggable={false}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: hover
              ? `linear-gradient(${105 + rotateY * 3}deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.3) 100%)`
              : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)",
            transition: "background 0.3s",
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <Badge className="text-xs mb-2" style={{ background: "rgba(201,168,76,0.9)", color: "#1C1C1E" }}>
            {item.category}
          </Badge>
          <p className="text-white text-sm font-medium drop-shadow-lg">
            {hover ? "Slide mouse left \u2190 right to compare" : "Hover to explore Before & After"}
          </p>
        </div>

        <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold text-white ${labelStyle} transition-all duration-200`}>
          {labelText}
        </div>

        {hover && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
            <div className="flex items-center gap-1">
              <div className="h-1 rounded-full bg-white/20" style={{ width: "80px" }}>
                <div
                  className="h-full rounded-full transition-all duration-75"
                  style={{
                    width: `${pos.x * 100}%`,
                    background: "linear-gradient(90deg, #ef4444, #C9A84C, #10b981)",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground">{item.title}</h3>
        {item.description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
        )}
      </div>
    </div>
  );
}

export default function Gallery() {
  useDocumentTitle("Before & After Gallery — Philadelphia Home Transformations");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [showAfter, setShowAfter] = useState(true);
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const { data: gallery, isLoading } = useQuery<GalleryItem[]>({
    queryKey: activeCategory === "All" ? ["/api/gallery"] : ["/api/gallery", { category: activeCategory }],
    queryFn: () =>
      fetch(activeCategory === "All" ? "/api/gallery" : `/api/gallery?category=${encodeURIComponent(activeCategory)}`)
        .then((r) => r.json()),
  });

  const handleSliderInteraction = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(x);
  }, []);

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="bg-charcoal-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors" data-testid="link-breadcrumb-home">
            <Home className="w-4 h-4" />
            <span>Home</span>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span style={{ color: "#C9A84C" }}>Gallery</span>
          </Link>
        </div>
      </div>
      <section className="bg-charcoal-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Badge className="mb-6" style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C", borderColor: "rgba(201,168,76,0.3)" }}>
            Our Work
          </Badge>
          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-4">
            Before & After <span style={{ color: "#C9A84C" }}>Gallery</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Real projects, real results. Hover over any card to sweep between before and after — or click to open the full comparison slider.
          </p>
        </div>
      </section>

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

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : gallery && gallery.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gallery.map((item) => (
                <PanoramicCard
                  key={item.id}
                  item={item}
                  onClick={() => { setSelected(item); setShowAfter(true); setSliderPos(50); }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              No gallery items found for this category.
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-5xl bg-charcoal-dark border-white/10 p-0 overflow-hidden" aria-describedby={undefined}>
          {selected && (
            <div>
              <DialogTitle className="sr-only">{selected.title} — Before & After Comparison</DialogTitle>
              <div className="flex gap-2 justify-center pt-4 pb-2">
                <button
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${!showAfter ? "text-charcoal-dark" : "bg-white/10 text-white"}`}
                  style={!showAfter ? { background: "#C9A84C" } : {}}
                  onClick={() => setShowAfter(false)}
                  data-testid="toggle-before"
                >
                  BEFORE
                </button>
                <button
                  className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 text-white"
                  style={{ background: showAfter ? "transparent" : undefined, border: "1px solid rgba(201,168,76,0.5)", color: "#C9A84C" }}
                  onClick={() => { setShowAfter(true); setSliderPos(50); }}
                  data-testid="toggle-compare"
                >
                  COMPARE
                </button>
                <button
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${showAfter ? "text-charcoal-dark" : "bg-white/10 text-white"}`}
                  style={showAfter ? { background: "#C9A84C" } : {}}
                  onClick={() => setShowAfter(true)}
                  data-testid="toggle-after"
                >
                  AFTER
                </button>
              </div>

              <div
                ref={sliderRef}
                className="relative aspect-video overflow-hidden cursor-col-resize select-none mx-4 rounded-lg"
                onMouseDown={(e) => { dragging.current = true; handleSliderInteraction(e); }}
                onMouseMove={(e) => { if (dragging.current) handleSliderInteraction(e); }}
                onMouseUp={() => { dragging.current = false; }}
                onMouseLeave={() => { dragging.current = false; }}
                onTouchStart={(e) => { dragging.current = true; handleSliderInteraction(e); }}
                onTouchMove={(e) => { if (dragging.current) handleSliderInteraction(e); }}
                onTouchEnd={() => { dragging.current = false; }}
                data-testid="comparison-slider"
              >
                <img
                  src={selected.afterImage}
                  alt="After"
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={selected.beforeImage}
                    alt="Before"
                    className="absolute inset-0 h-full object-cover"
                    style={{ width: sliderRef.current ? `${sliderRef.current.offsetWidth}px` : "100vw", maxWidth: "none" }}
                    draggable={false}
                  />
                </div>

                <div
                  className="absolute top-0 bottom-0 z-20"
                  style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
                >
                  <div className="w-0.5 h-full" style={{ background: "#C9A84C" }} />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2"
                    style={{ background: "#C9A84C", borderColor: "#1C1C1E" }}
                  >
                    <ChevronLeft className="w-3 h-3 text-charcoal-dark -mr-0.5" />
                    <ChevronRight className="w-3 h-3 text-charcoal-dark -ml-0.5" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold text-white bg-red-600/80">
                  BEFORE
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold text-white bg-emerald-600/80">
                  AFTER
                </div>
              </div>

              <div className="p-6">
                <Badge style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C" }} className="mb-3">{selected.category}</Badge>
                <h2 className="font-display text-2xl font-bold text-white mb-2">{selected.title}</h2>
                {selected.description && (
                  <p className="text-white/60 text-sm leading-relaxed">{selected.description}</p>
                )}
                <p className="text-white/30 text-xs mt-3">Drag the slider left and right to compare before & after</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
