import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, Star, Video, Tv, Lightbulb, Sofa, Bath, Flame, Layers, Home, ChevronRight, PackageOpen, Dumbbell, Monitor, Hammer, PaintBucket, Blinds } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const packages = [
  {
    name: "Moving Day Peace of Mind",
    icon: PackageOpen,
    price: "$300–$800",
    tier: "fast",
    description: "Take the stress out of moving. We handle the heavy lifting — packing, unpacking, furniture assembly, and getting your new place set up and livable on day one.",
    includes: [
      "Packing & unpacking coordination",
      "Furniture assembly (beds, desks, shelving)",
      "TV mounting & basic cable concealment",
      "Outlet & fixture quick-checks",
    ],
    upgrades: [
      "$75 — In-wall cord concealment per TV",
      "$50 — Outlet upgrade or relocation",
    ],
  },
  {
    name: "Home Office / Workout Room",
    icon: Dumbbell,
    price: "$500–$1,800",
    tier: "fast",
    description: "Turn any spare room into a purpose-built workspace or fitness zone. From wall-mounted monitors to built-in shelving and rubber flooring — we build the room around your routine.",
    includes: [
      "Equipment assembly & placement",
      "Wall-mounted monitor or TV setup",
      "Built-in shelving or storage install",
      "Lighting upgrade & outlet additions",
    ],
    upgrades: [
      "Rubber flooring install — $300+",
      "Soundproofing panels — $200+",
    ],
  },
  {
    name: "Entertainment & Sound System",
    icon: Monitor,
    price: "$850–$2,500",
    tier: "mid",
    description: "A fully integrated entertainment setup — mounted TV, concealed wiring, surround sound speakers, and built-in shelving. One visit, one clean result.",
    includes: [
      "TV mount + full in-wall concealment",
      "Surround sound speaker installation",
      "Built-in shelving or media panel",
      "Accent lighting & smart home integration",
    ],
    upgrades: [
      "Custom entertainment center — $500+",
      "Additional speaker zones — $200+/room",
    ],
  },
  {
    name: "Bathroom Renovation",
    icon: Bath,
    price: "$1,200–$5,000+",
    tier: "mid",
    description: "From a simple faucet swap to a complete spa-level gut renovation. Shower doors, showerheads, LED lighting, body jets, custom drains, built-in benches — we do it all.",
    includes: [
      "Faucet & showerhead upgrade/install",
      "Vanity, toilet & mirror replacement",
      "Shower door & glass enclosure install",
      "Custom tile work (subway, mosaic, marble)",
    ],
    upgrades: [
      "Body jets & digital controls — $600+",
      "Built-in bench & niche — $400+",
      "LED shower lighting — $250+",
      "Heated floors — $500+",
    ],
  },
  {
    name: "Kitchen Transformation",
    icon: Layers,
    price: "$2,000–$8,000+",
    tier: "premium",
    description: "Kitchen upgrades carry the highest ROI. From countertop installs to custom cabinetry, kitchen islands, and premium finishes — epoxy, quartz, granite, or reclaimed wood.",
    includes: [
      "Countertop installation (quartz, granite, epoxy)",
      "Custom cabinetry & hardware",
      "Kitchen island build or upgrade",
      "Backsplash, under-cabinet lighting & fixtures",
    ],
    upgrades: [
      "Reclaimed wood accents — $300+",
      "Custom epoxy resin finish — $500+",
      "Faucet & sink upgrade — $250+",
    ],
  },
  {
    name: "Basement Conversion",
    icon: Flame,
    price: "$3,500–$12,000+",
    tier: "premium",
    description: "Turn your unfinished basement into the sanctuary, social area, bedroom, or workspace you need. Framing, drywall, flooring, lighting, and full finishing — we build it out completely.",
    includes: [
      "Framing, insulation & drywall",
      "LVP or tile flooring installation",
      "Recessed & accent lighting throughout",
      "Feature wall or entertainment center build",
      "Trim, paint & professional finishing",
    ],
    upgrades: [
      "Custom bar area — $1,500+",
      "Full bathroom add — $3,000+",
      "Surround sound system — $500+",
    ],
  },
];

const pricingCatalog = [
  {
    category: "Moving Day Services",
    color: "#4CA8C9",
    items: [
      { code: "MV-A", service: "Packing & Unpacking", description: "Professional packing/unpacking assist", price: "$150–$400" },
      { code: "MV-B", service: "Furniture Assembly", description: "Flat-pack or multi-piece assembly", price: "$75–$300" },
      { code: "MV-C", service: "Full Move-In Setup", description: "Assembly, mounting, placement", price: "$300–$800" },
    ],
  },
  {
    category: "Entertainment & Speaker Systems",
    color: "#8B7355",
    items: [
      { code: "AV-A", service: "TV Mount & Concealment", description: "Wall mount, cable hide & setup", price: "$175–$450" },
      { code: "AV-B", service: "Surround Sound Install", description: "5.1/7.1 speaker system wiring", price: "$400–$900" },
      { code: "AV-C", service: "Custom Entertainment Center", description: "Built-in media wall or shelving", price: "$800–$2,500+" },
    ],
  },
  {
    category: "Lighting & Electrical",
    color: "#D4A843",
    items: [
      { code: "LG-A", service: "Fixture Install", description: "Light fixture, fan, or vanity light", price: "$150–$350" },
      { code: "LG-B", service: "Outlet Upgrade", description: "Outlet relocation, GFCI, USB outlets", price: "$75–$200" },
      { code: "LG-C", service: "Integrated Lighting System", description: "Under-cabinet, recessed, accent LED", price: "$400–$1,200" },
      { code: "LG-D", service: "Architectural Lighting", description: "Custom design, feature lighting", price: "$900–$2,000+" },
    ],
  },
  {
    category: "Bathrooms & Plumbing",
    color: "#6B8E6B",
    items: [
      { code: "BR-A", service: "Faucet & Showerhead Swap", description: "Upgrade fixtures, handles, drains", price: "$150–$400" },
      { code: "BR-B", service: "Vanity & Toilet Replace", description: "Vanity, toilet, mirror, lighting", price: "$600–$1,500" },
      { code: "BR-C", service: "Shower Door & Enclosure", description: "Frameless glass, sliding, hinged", price: "$500–$1,200" },
      { code: "BR-D", service: "Full Bathroom Renovation", description: "Gut-to-gorgeous, tile, fixtures, all", price: "$2,000–$5,000+" },
      { code: "BR-E", service: "Luxury Spa Build", description: "Jets, benches, LED, digital controls", price: "$4,000–$8,000+" },
    ],
  },
  {
    category: "Kitchen & Countertops",
    color: "#C9A84C",
    items: [
      { code: "KT-A", service: "Faucet & Hardware Swap", description: "Faucet, handles, cabinet hardware", price: "$150–$400" },
      { code: "KT-B", service: "Countertop Installation", description: "Quartz, granite, marble, or epoxy", price: "$1,200–$4,000" },
      { code: "KT-C", service: "Kitchen Island Build", description: "Custom island with countertop", price: "$2,000–$5,000+" },
      { code: "KT-D", service: "Custom Cabinetry", description: "New cabinets, refacing, or built-ins", price: "$1,500–$4,500+" },
    ],
  },
  {
    category: "Custom Finishes & Surfaces",
    color: "#7B68AE",
    items: [
      { code: "CF-A", service: "Epoxy Resin Surface", description: "Counters, bar tops, tables", price: "$400–$2,500" },
      { code: "CF-B", service: "Reclaimed Wood Feature", description: "Accent walls, shelving, mantels", price: "$300–$1,200" },
      { code: "CF-C", service: "Custom Tile Work", description: "Subway, mosaic, marble, brick", price: "$500–$2,500+" },
      { code: "CF-D", service: "Stone & Granite Work", description: "Marble, granite, onyx installs", price: "$800–$3,500+" },
      { code: "CF-E", service: "Restorations", description: "Furniture, fixture, surface refinish", price: "$300–$1,500" },
    ],
  },
  {
    category: "Flooring & Walls",
    color: "#C97B4C",
    items: [
      { code: "FW-A", service: "Paint — Room or Accent", description: "Full room, accent wall, touch-ups", price: "$150–$900" },
      { code: "FW-B", service: "Wallpaper Removal", description: "Strip, prep, smooth finish", price: "$200–$600" },
      { code: "FW-C", service: "Floor Sanding & Waxing", description: "Hardwood sand, stain, seal", price: "$400–$1,200" },
      { code: "FW-D", service: "Carpet Removal", description: "Full carpet tear-out & disposal", price: "$150–$500" },
      { code: "FW-E", service: "Carpet Steaming", description: "Deep clean, room or whole-home", price: "$100–$350" },
      { code: "FW-F", service: "LVP / Tile Floor Install", description: "Luxury vinyl, tile, epoxy floor", price: "$500–$2,500+" },
      { code: "FW-G", service: "Paneling & Wall Covering", description: "Wood paneling, wainscoting, accent", price: "$300–$1,200" },
    ],
  },
  {
    category: "Built-Ins & Organization",
    color: "#4C8EC9",
    items: [
      { code: "BO-A", service: "Built-In Shelving", description: "Custom closet, pantry, or wall unit", price: "$400–$1,200" },
      { code: "BO-B", service: "Custom Storage Solutions", description: "Garage, basement, utility storage", price: "$300–$900" },
      { code: "BO-C", service: "Feature Wall Build", description: "Fireplace, media, accent wall", price: "$1,200–$3,500+" },
    ],
  },
  {
    category: "Windows, Blinds & Exterior",
    color: "#6B7B8E",
    items: [
      { code: "WE-A", service: "Blinds & Shades Install", description: "Window blinds, shades, curtain rods", price: "$75–$300" },
      { code: "WE-B", service: "Window Boxes & Shutters", description: "Decorative boxes, functional shutters", price: "$200–$600" },
      { code: "WE-C", service: "Awning Installation", description: "Retractable or fixed awnings", price: "$400–$1,200" },
      { code: "WE-D", service: "Window Replacement", description: "Single or multi-window install", price: "$300–$800/window" },
    ],
  },
  {
    category: "Room Conversions",
    color: "#8B6B55",
    items: [
      { code: "RC-A", service: "Home Office Build", description: "Desk, shelving, lighting, wiring", price: "$500–$1,800" },
      { code: "RC-B", service: "Workout Room Setup", description: "Equipment, flooring, mirrors, sound", price: "$500–$1,500" },
      { code: "RC-C", service: "Basement Finishing", description: "Framing, drywall, floor, lighting", price: "$3,500–$12,000+" },
      { code: "RC-D", service: "Full Room Renovation", description: "Complete space transformation", price: "$2,000–$6,000+" },
    ],
  },
  {
    category: "Drywall & Repairs",
    color: "#9B8E7B",
    items: [
      { code: "DW-A", service: "Drywall Patch + Finish", description: "Small repairs, seamless finish", price: "$150–$450" },
      { code: "DW-B", service: "Full Wall Restoration", description: "Extensive repairs, prep for paint", price: "$400–$900" },
      { code: "DW-C", service: "Architectural Finish", description: "High-end texture & detail work", price: "$700–$1,400" },
    ],
  },
  {
    category: "Carpentry, Trim & Doors",
    color: "#6B5B3E",
    items: [
      { code: "CT-A", service: "Door Install or Replace", description: "Interior, exterior, pocket, barn", price: "$200–$600" },
      { code: "CT-B", service: "Custom Trim & Molding", description: "Baseboards, casing, chair rail", price: "$200–$800" },
      { code: "CT-C", service: "Crown Molding", description: "Room or whole-home install", price: "$300–$1,200" },
      { code: "CT-D", service: "Custom Carpentry", description: "Shelving, mantels, built-in work", price: "$400–$2,000+" },
    ],
  },
  {
    category: "Decks & Outdoor",
    color: "#5B7B4C",
    items: [
      { code: "DO-A", service: "Deck Repair & Refinish", description: "Board replace, sand, stain, seal", price: "$400–$1,200" },
      { code: "DO-B", service: "Deck Build — Standard", description: "Pressure-treated wood deck", price: "$2,000–$5,000" },
      { code: "DO-C", service: "Deck Build — Composite", description: "Trex or composite decking", price: "$3,500–$8,000+" },
      { code: "DO-D", service: "Railing & Stair Install", description: "Wood, metal, or cable railing", price: "$500–$1,500" },
    ],
  },
  {
    category: "Appliance & Fixture Install",
    color: "#5B6B8E",
    items: [
      { code: "AF-A", service: "Appliance Installation", description: "Dishwasher, range, fridge, hood", price: "$150–$400" },
      { code: "AF-B", service: "Recessed Lighting Install", description: "Can lights, new-work or remodel", price: "$100–$250/light" },
      { code: "AF-C", service: "Hidden Light Features", description: "Cove, toe-kick, backlit panels", price: "$300–$1,000" },
    ],
  },
];

function getTierLabel(tier: string) {
  switch (tier) {
    case "fast": return { text: "Quick Win", bg: "rgba(201,168,76,0.15)", color: "#C9A84C" };
    case "mid": return { text: "Mid-Ticket Value", bg: "rgba(107,142,107,0.15)", color: "#6B8E6B" };
    case "premium": return { text: "Premium Build", bg: "rgba(123,104,174,0.15)", color: "#7B68AE" };
    default: return { text: "", bg: "", color: "" };
  }
}

export default function Services() {
  useDocumentTitle("Service Packages & Pricing — Philadelphia Installation & Repair");

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="bg-charcoal-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors" data-testid="link-breadcrumb-home">
            <Home className="w-4 h-4" />
            <span>Home</span>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span style={{ color: "#C9A84C" }}>Services</span>
          </Link>
        </div>
      </div>
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
            We don't sell hours. We sell finished rooms, upgraded spaces, and transformations you can see and feel. From moving day assembly to full basement conversions — clear pricing, bundled value, professional results.
          </p>
          <p className="text-white/50 text-sm max-w-lg mx-auto mb-8">
            All prices include materials, labor & professional finishing. PHL Metro — Philly, Bucks County, Montgomery County, Delaware County, and surrounding areas.
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
              Six clear packages. Each one is a finished outcome — not a line item. Pick what matches your project and budget.
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
                  data-testid={`package-${pkg.name.toLowerCase().replace(/[\s&\/]/g, "-")}`}
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
                  <Link href={`/schedule?service=${encodeURIComponent(pkg.name + " Package (" + pkg.price + ")")}`}>
                    <Button
                      className="w-full font-semibold mt-auto"
                      style={isPremium ? { background: "#C9A84C", color: "#1C1C1E" } : {}}
                      variant={isPremium ? "default" : "outline"}
                      data-testid={`button-book-${pkg.name.toLowerCase().replace(/[\s&\/]/g, "-")}`}
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
                data-testid={`catalog-${cat.category.toLowerCase().replace(/[\s&,]/g, "-")}`}
              >
                <div className="px-4 sm:px-6 py-4 flex items-center justify-between" style={{ background: cat.color }}>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white">{cat.category}</h3>
                  <span className="text-xs font-semibold text-white/80 uppercase tracking-wider hidden sm:block">Price Range</span>
                </div>
                <div className="divide-y divide-border">
                  <div className="hidden sm:grid grid-cols-12 px-4 sm:px-6 py-2 bg-muted/50">
                    <span className="col-span-2 text-xs font-semibold text-muted-foreground uppercase">Code</span>
                    <span className="col-span-3 text-xs font-semibold text-muted-foreground uppercase">Service</span>
                    <span className="col-span-4 text-xs font-semibold text-muted-foreground uppercase">Description</span>
                    <span className="col-span-3 text-xs font-semibold text-muted-foreground uppercase text-right">Price</span>
                  </div>
                  {cat.items.map((item) => (
                    <div key={item.code}>
                      <div className="hidden sm:grid grid-cols-12 px-4 sm:px-6 py-3 items-center hover:bg-muted/30 transition-colors">
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
                      <div className="sm:hidden px-4 py-3 hover:bg-muted/30 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span
                              className="inline-block px-2 py-0.5 rounded text-xs font-bold text-white"
                              style={{ background: cat.color }}
                            >
                              {item.code}
                            </span>
                            <span className="text-sm font-medium text-foreground">{item.service}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground italic mb-1">{item.description}</p>
                        <span className="text-sm font-bold" style={{ color: cat.color }}>
                          {item.price}
                        </span>
                      </div>
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
                Nobody wakes up wanting a task list. You want a mounted TV that looks intentional, a bathroom that feels upgraded, a basement you can actually use. Our packages bundle labor around the outcomes you actually care about — so every dollar goes toward a finished result, not billable hours.
              </p>
              <div className="space-y-3">
                {[
                  "Bundled labor means lower cost per task",
                  "One visit, one setup, multiple results",
                  "Clear pricing — no surprises at the end",
                  "Professional finishing on every detail",
                  "From moving day to full renovations",
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
