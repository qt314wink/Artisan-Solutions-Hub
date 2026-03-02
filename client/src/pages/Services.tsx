import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, Star, Video, Tv, Lightbulb, Sofa, Bath, Flame, Layers } from "lucide-react";

const packages = [
  {
    name: "Mount & Secure",
    icon: Tv,
    price: "$175–$325",
    tier: "fast",
    description: "High-demand, low-friction. Get your entertainment setup done right — clean, professional, and fully concealed.",
    includes: [
      "TV mounting (standard walls)",
      "Basic cable concealment",
      "Shelf or soundbar mounting",
    ],
    upgrades: [
      "$75 — In-wall cord concealment",
      "$50 — Outlet relocation",
    ],
  },
  {
    name: "Fixture Refresh",
    icon: Lightbulb,
    price: "$350–$650",
    tier: "fast",
    description: "Upgrade the room, not just the fixture. Multiple light and fan installs bundled for one clean transformation.",
    includes: [
      "2–3 light fixture installations",
      "1 ceiling fan OR vanity light",
      "Minor drywall patch & touch-up",
    ],
    upgrades: [
      "Add dimmer switches — $40/each",
      "Under-cabinet lighting — $150+",
    ],
  },
  {
    name: "Living Room Upgrade",
    icon: Sofa,
    price: "$850–$1,800",
    tier: "mid",
    description: "A full living room transformation. This isn't a task list — it's a finished room that feels intentional and designed.",
    includes: [
      "TV mount + full concealment",
      "Built-in shelving or media panel install",
      "Accent lighting installation",
      "Wall patch & professional finish",
    ],
    upgrades: [
      "Custom floating shelves — $200+",
      "Smart home integration — $150+",
    ],
  },
  {
    name: "Bathroom Refresh",
    icon: Bath,
    price: "$1,200–$2,500",
    tier: "mid",
    description: "Even partial bathroom upgrades feel like renovation. Multiple plumbing and fixture tasks share prep time, maximizing your value.",
    includes: [
      "Vanity installation",
      "Toilet replacement",
      "Mirror + lighting upgrade",
      "Minor drywall repair & finish",
    ],
    upgrades: [
      "Shower fixture upgrade — $300+",
      "Tile backsplash — $400+",
    ],
  },
  {
    name: "Kitchen Surface Upgrade",
    icon: Layers,
    price: "$2,000–$5,000",
    tier: "premium",
    description: "Kitchen upgrades carry the highest perceived ROI. Tap into renovation psychology without full remodel complexity.",
    includes: [
      "Epoxy countertop installation",
      "Backsplash installation",
      "Under-cabinet lighting",
      "Fixture refresh (faucet, hardware)",
    ],
    upgrades: [
      "Cabinet hardware swap — $200+",
      "Custom shelving — $350+",
    ],
  },
  {
    name: "Custom Feature Wall System",
    icon: Flame,
    price: "$2,800–$6,500+",
    tier: "premium",
    description: "Contractor-level capability. A complete feature wall anchored to aesthetic outcome, not labor hours. This is what sets us apart.",
    includes: [
      "Framed feature wall construction",
      "Electric fireplace installation",
      "Integrated accent lighting",
      "TV mount + full concealment",
      "Finish trim & paint-ready prep",
    ],
    upgrades: [
      "Custom mantel — $400+",
      "Stone or tile surround — $600+",
    ],
  },
];

const pricingCatalog = [
  {
    category: "Drywall & Wall Finishes",
    color: "#C9A84C",
    items: [
      { code: "DW-A", service: "Drywall Patch + Finish", description: "Small repairs, seamless finish", price: "$250–$450" },
      { code: "DW-B", service: "Full Wall Restoration", description: "Extensive repairs, prep for paint", price: "$400–$900" },
      { code: "DW-D", service: "Architectural Finish", description: "High-end texture & detail", price: "$700–$1,400" },
    ],
  },
  {
    category: "Lighting & Electrical Systems",
    color: "#D4A843",
    items: [
      { code: "LG-A", service: "Standard Fixture Install", description: "Light fixture or outlet install", price: "$200–$350" },
      { code: "LG-B", service: "Integrated Lighting System", description: "Under-cabinet & feature lighting", price: "$400–$900" },
      { code: "LG-C", service: "Architectural Lighting", description: "Custom lighting design & install", price: "$900–$2,000" },
    ],
  },
  {
    category: "Built-In & Feature Walls",
    color: "#8B7355",
    items: [
      { code: "BI-A", service: "TV Mount & Concealment", description: "TV mounting & cable conceal", price: "$250–$450" },
      { code: "BI-B", service: "Integrated Wall Unit", description: "Custom built-in shelving", price: "$600–$1,300" },
      { code: "BI-C", service: "Custom Feature Wall", description: "Full media & feature wall", price: "$1,200–$3,500+" },
    ],
  },
  {
    category: "Bathrooms & Luxury Installs",
    color: "#6B8E6B",
    items: [
      { code: "BR-A", service: "Fixture Replacement", description: "Toilets, vanities, mirrors", price: "$250–$600" },
      { code: "BR-B", service: "Multi-Component Install", description: "Vanity, shower, multi-fixture", price: "$800–$1,800" },
      { code: "BR-C", service: "Full Luxury Renovation", description: "Complete high-end bathroom", price: "$2,000–$5,000+" },
    ],
  },
  {
    category: "Epoxy & Specialty Surfaces",
    color: "#7B68AE",
    items: [
      { code: "EP-A", service: "Small Epoxy Surface", description: "Counter or accent area", price: "$400–$900" },
      { code: "EP-B", service: "Mid-Sized Epoxy Install", description: "Bars & countertops", price: "$900–$1,900" },
      { code: "EP-C", service: "Custom Epoxy Solution", description: "Large, custom surfaces", price: "$2,000–$4,200+" },
    ],
  },
  {
    category: "Painting & Creative Walls",
    color: "#C97B4C",
    items: [
      { code: "PW-A", service: "Touch-Up & Patch Paint", description: "Spot repairs & color match", price: "$150–$350" },
      { code: "PW-B", service: "Full Room Paint", description: "Complete room painting, prep & finish", price: "$400–$900" },
      { code: "PW-C", service: "Accent Wall / Mural", description: "Custom accent wall, wallpaper, or mural", price: "$500–$1,500+" },
    ],
  },
  {
    category: "Assembly & Setup",
    color: "#4C8EC9",
    items: [
      { code: "AS-A", service: "Furniture Assembly", description: "Flat-pack assembly, single item", price: "$75–$200" },
      { code: "AS-B", service: "Multi-Piece Assembly", description: "Full room furniture setup", price: "$200–$500" },
      { code: "AS-C", service: "Cabinet & Floor Install", description: "Cabinet install, minor flooring", price: "$500–$1,200+" },
    ],
  },
  {
    category: "Hauling & Exterior",
    color: "#4CA8C9",
    items: [
      { code: "HE-A", service: "Single Item Removal", description: "Appliance, mattress, or furniture", price: "$75–$175" },
      { code: "HE-B", service: "Partial Load Hauling", description: "Multiple items, garage/room clear", price: "$200–$450" },
      { code: "HE-C", service: "Full Junk-Out & Power Wash", description: "Complete cleanout + exterior wash", price: "$500–$1,200+" },
    ],
  },
];

function getTierLabel(tier: string) {
  switch (tier) {
    case "fast": return { text: "Fast Cash", bg: "rgba(201,168,76,0.15)", color: "#C9A84C" };
    case "mid": return { text: "Mid-Ticket Value", bg: "rgba(107,142,107,0.15)", color: "#6B8E6B" };
    case "premium": return { text: "Premium Feature", bg: "rgba(123,104,174,0.15)", color: "#7B68AE" };
    default: return { text: "", bg: "", color: "" };
  }
}

export default function Services() {
  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Hero */}
      <section className="bg-charcoal-dark text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Badge className="mb-6" style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C", borderColor: "rgba(201,168,76,0.3)" }}>
            Service Packages & Pricing
          </Badge>
          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">
            Outcomes, Not
            <br />
            <span style={{ color: "#C9A84C" }}>Task Lists</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto mb-4">
            We don't sell hours. We sell finished rooms, upgraded spaces, and transformations you can see and feel. Clear pricing, bundled value, professional results.
          </p>
          <p className="text-white/50 text-sm max-w-lg mx-auto mb-8">
            All prices include materials, labor & professional finishing. PHL Metro — Philly, Bucks County, Montgomery County, and surrounding areas.
          </p>
          <Link href="/schedule">
            <Button
              size="lg"
              className="font-semibold"
              style={{ background: "#C9A84C", color: "#1C1C1E" }}
              data-testid="button-services-schedule"
            >
              Get a Free Video Estimate
              <Video className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Outcome Packages */}
      <section className="py-20 bg-cream dark:bg-charcoal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">Installation Packages</Badge>
            <h2 className="font-display text-4xl font-bold text-foreground mb-3">Choose Your Transformation</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Six clear packages. Each one is a finished outcome — not a line item. The menu filters itself: pick what matches your project and budget.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => {
              const tier = getTierLabel(pkg.tier);
              const isPremium = pkg.tier === "premium";
              return (
                <div
                  key={pkg.name}
                  className={`relative rounded-lg p-6 flex flex-col ${
                    isPremium
                      ? "bg-charcoal-dark text-white border-2"
                      : "bg-white dark:bg-charcoal border border-border"
                  }`}
                  style={isPremium ? { borderColor: "#C9A84C" } : {}}
                  data-testid={`package-${pkg.name.toLowerCase().replace(/[\s&]/g, "-")}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: tier.bg }}>
                      <pkg.icon className="w-5 h-5" style={{ color: tier.color }} />
                    </div>
                    <Badge className="text-xs flex-shrink-0" style={{ background: tier.bg, color: tier.color, border: `1px solid ${tier.color}30` }}>
                      {tier.text}
                    </Badge>
                  </div>
                  <h3 className={`font-display text-xl font-bold mb-1 ${isPremium ? "text-white" : "text-foreground"}`}>
                    {pkg.name}
                  </h3>
                  <div className="font-bold text-lg mb-3" style={{ color: "#C9A84C" }}>{pkg.price}</div>
                  <p className={`text-sm leading-relaxed mb-4 ${isPremium ? "text-white/65" : "text-muted-foreground"}`}>
                    {pkg.description}
                  </p>
                  <div className="mb-4 flex-1">
                    <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${isPremium ? "text-white/50" : "text-muted-foreground"}`}>Includes:</p>
                    <ul className="space-y-1.5">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#C9A84C" }} />
                          <span className={`text-sm ${isPremium ? "text-white/80" : "text-foreground/80"}`}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {pkg.upgrades && pkg.upgrades.length > 0 && (
                    <div className="mb-4">
                      <p className={`text-xs font-semibold uppercase tracking-wide mb-1.5 ${isPremium ? "text-white/40" : "text-muted-foreground/70"}`}>Upgrades:</p>
                      {pkg.upgrades.map((u) => (
                        <p key={u} className={`text-xs ${isPremium ? "text-white/50" : "text-muted-foreground"}`}>+ {u}</p>
                      ))}
                    </div>
                  )}
                  <Link href="/schedule">
                    <Button
                      className="w-full font-semibold mt-auto"
                      style={isPremium ? { background: "#C9A84C", color: "#1C1C1E" } : {}}
                      variant={isPremium ? "default" : "outline"}
                      data-testid={`button-book-${pkg.name.toLowerCase().replace(/[\s&]/g, "-")}`}
                    >
                      Book This Package
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Catalog */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">Itemized Pricing</Badge>
            <h2 className="font-display text-4xl font-bold text-foreground mb-3">Full Service Catalog</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Need something specific? Every service is priced transparently. No hidden fees, no guesswork. All prices include materials, labor, and professional finishing.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {pricingCatalog.map((cat) => (
              <Card
                key={cat.category}
                className="overflow-hidden border-border bg-white dark:bg-charcoal"
                data-testid={`catalog-${cat.category.toLowerCase().replace(/[\s&]/g, "-")}`}
              >
                <div className="px-6 py-4 flex items-center justify-between" style={{ background: cat.color }}>
                  <h3 className="font-display text-lg font-bold text-white">{cat.category}</h3>
                  <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">Price Range</span>
                </div>
                <div className="divide-y divide-border">
                  <div className="grid grid-cols-12 px-6 py-2 bg-muted/50">
                    <span className="col-span-2 text-xs font-semibold text-muted-foreground uppercase">Code</span>
                    <span className="col-span-3 text-xs font-semibold text-muted-foreground uppercase">Service</span>
                    <span className="col-span-4 text-xs font-semibold text-muted-foreground uppercase">Description</span>
                    <span className="col-span-3 text-xs font-semibold text-muted-foreground uppercase text-right">Price</span>
                  </div>
                  {cat.items.map((item) => (
                    <div key={item.code} className="grid grid-cols-12 px-6 py-3 items-center hover:bg-muted/30 transition-colors">
                      <div className="col-span-2">
                        <span
                          className="inline-block px-2 py-0.5 rounded text-xs font-bold text-white"
                          style={{ background: cat.color }}
                        >
                          {item.code}
                        </span>
                      </div>
                      <span className="col-span-3 text-sm font-medium text-foreground">{item.service}</span>
                      <span className="col-span-4 text-sm text-muted-foreground italic">{item.description}</span>
                      <span className="col-span-3 text-sm font-bold text-right" style={{ color: cat.color }}>
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8 italic">
            All prices include materials, labor & professional finishing. Custom quotes available for complex or multi-room projects.
          </p>
        </div>
      </section>

      {/* Package Strategy Explainer */}
      <section className="py-20 bg-cream dark:bg-charcoal-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6" style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C", borderColor: "rgba(201,168,76,0.3)" }}>
                Why Packages?
              </Badge>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                You Don't Want "Drywall Patching."
                <br />
                <span style={{ color: "#C9A84C" }}>You Want a Finished Room.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nobody wakes up wanting a task list. You want a mounted TV that looks intentional, a bathroom that feels upgraded, a living room that makes guests say "wow." Our packages bundle labor around the outcomes you actually care about — so every dollar goes toward a finished result, not billable hours.
              </p>
              <div className="space-y-3">
                {[
                  "Bundled labor means lower cost per task",
                  "One visit, one setup, multiple results",
                  "Clear pricing — no surprises at the end",
                  "Professional finishing on every detail",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Star className="w-4 h-4 flex-shrink-0" style={{ color: "#C9A84C" }} />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Average ticket without packages", value: "$150–$400", sub: "Selling tasks" },
                { label: "Average ticket with packages", value: "$850–$2,500", sub: "Selling outcomes" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-lg bg-white dark:bg-charcoal border border-border">
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="font-display text-3xl font-bold" style={{ color: "#C9A84C" }}>{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
                </div>
              ))}
              <p className="text-xs text-muted-foreground text-center italic">Same skills. Different framing. Different value.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Estimate CTA */}
      <section className="py-20 bg-charcoal-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(201,168,76,0.15)" }}>
            <Video className="w-8 h-8" style={{ color: "#C9A84C" }} />
          </div>
          <h2 className="font-display text-4xl font-bold mb-4">
            Free Video Estimates — <span style={{ color: "#C9A84C" }}>No Obligation</span>
          </h2>
          <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
            Text us a photo or schedule a Google Meet call. Walk us through your space and we'll give you a detailed, honest quote — at zero cost.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/schedule">
              <Button
                size="lg"
                className="font-semibold px-10"
                style={{ background: "#C9A84C", color: "#1C1C1E" }}
                data-testid="button-services-estimate"
              >
                Schedule Your Free Estimate
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="sms:+12153034494?body=Hi! I'd like a quote. Here's my project:">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white/30 font-semibold"
                data-testid="button-text-quote"
              >
                Text a Photo for Quote
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
