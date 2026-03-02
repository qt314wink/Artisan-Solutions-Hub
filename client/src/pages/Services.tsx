import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, Star, Video } from "lucide-react";

const serviceCategories = [
  {
    name: "Custom Builds & Cabinetry",
    description: "Handcrafted built-ins, custom cabinetry, entertainment centers, bookshelves, mudrooms, and storage solutions designed specifically for your space.",
    items: ["Entertainment centers with wire management", "Custom closet systems", "Built-in bookshelves & shelving", "Kitchen cabinet installation", "Mudroom builds", "Bar builds & butler's pantries"],
  },
  {
    name: "Lighting & Electrical",
    description: "Full-service lighting design and installation — from dramatic chandeliers to subtle inlaid LED channels that define architectural details.",
    items: ["Chandelier & pendant installation", "Recessed lighting layout & install", "Inlaid LED channels & channels", "Ceiling fan installation", "Outlet & switch upgrades", "Under-cabinet lighting"],
  },
  {
    name: "Countertops & Stone",
    description: "Premium stone surface installation with precise templating, cutting, and polishing. We work with all stone types and materials.",
    items: ["Granite countertops", "Quartz countertops", "Onyx surfaces", "Marble installation", "Sink cutouts & undermounting", "Backsplash tile installation"],
  },
  {
    name: "Painting & Walls",
    description: "Professional painting, specialty finishes, and custom accent walls that turn ordinary rooms into extraordinary ones.",
    items: ["Interior painting (rooms, full home)", "Custom accent walls", "Custom art wall builds", "Drywall repair & installation", "Textured finishes", "Wood slat & panel walls"],
  },
  {
    name: "Flooring & Epoxy",
    description: "Dramatic floor transformations from standard to showroom-worthy. Our metallic epoxy installations are one-of-a-kind.",
    items: ["Metallic epoxy floors", "Decorative chip epoxy", "Hardwood floor installation", "LVP & laminate", "Tile installation", "Heated floor systems"],
  },
  {
    name: "Fireplaces",
    description: "Complete fireplace installations and stunning custom surround builds that become the centerpiece of any room.",
    items: ["Electric fireplace installation", "Gas fireplace insert installation", "Custom fireplace surrounds", "Mantel installation", "Stone & tile surround work", "Built-in entertainment around fireplace"],
  },
  {
    name: "TV & Display Mounting",
    description: "Professional TV mounting with complete wire concealment, AV equipment setup, and custom built-in media solutions.",
    items: ["TV wall mounting (all sizes)", "In-wall wire management", "Above-fireplace mounting", "Outdoor TV mounting", "Projector screen installation", "AV equipment setup & organization"],
  },
  {
    name: "Plumbing & Appliances",
    description: "Sink installations, appliance hookups, and bathroom upgrades handled with precision and licensed expertise.",
    items: ["Sink installation (kitchen & bath)", "Appliance installation", "Dishwasher installation", "Toilet & fixture replacement", "Bathroom vanity installation", "Garbage disposal installation"],
  },
  {
    name: "Security & Smart Home",
    description: "Full security camera systems, smart home device installation, and network infrastructure.",
    items: ["Security camera installation (interior/exterior)", "Doorbell camera install", "Smart lock installation", "Smart home hub setup", "Structured wiring & networking", "Intercom systems"],
  },
  {
    name: "Hanging & Assembly",
    description: "From massive mirrors to intricate gallery walls — we hang, assemble, and arrange with professional precision.",
    items: ["Large mirror installation", "Gallery wall arrangement & hanging", "Picture & artwork installation", "Shelving systems", "Furniture assembly", "Space setup & staging"],
  },
];

const packages = [
  {
    name: "The Essential",
    price: "Starting at $299",
    description: "Perfect for single-service installations. Professional execution of one service item with full cleanup.",
    features: [
      "Single service installation",
      "Professional-grade materials guidance",
      "Post-install cleanup",
      "1-year workmanship warranty",
      "Same-week availability",
    ],
    popular: false,
    cta: "Book This Package",
  },
  {
    name: "The Signature",
    price: "Starting at $799",
    description: "Our most popular package for room-level transformations. Multiple services, one cohesive result.",
    features: [
      "Up to 3 coordinated services",
      "Design consultation included",
      "Premium material sourcing assistance",
      "Full cleanup & space staging",
      "2-year workmanship warranty",
      "Priority scheduling",
    ],
    popular: true,
    cta: "Book This Package",
  },
  {
    name: "The Luxe",
    price: "Custom Pricing",
    description: "For whole-home or multi-room transformations. Full-service project management from concept to completion.",
    features: [
      "Unlimited coordinated services",
      "Dedicated project manager",
      "Full design consultation",
      "Material procurement & management",
      "Phased scheduling flexibility",
      "5-year workmanship warranty",
      "White glove delivery & removal",
    ],
    popular: false,
    cta: "Request Custom Quote",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Hero */}
      <section className="bg-charcoal-dark text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Badge className="mb-6" style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C", borderColor: "rgba(201,168,76,0.3)" }}>
            Services
          </Badge>
          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">
            Everything We Do,
            <br />
            <span style={{ color: "#C9A84C" }}>Done Right</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto mb-8">
            A full-service luxury installation company serving Philadelphia and surrounding counties. No project too complex — no detail too small.
          </p>
          <Link href="/schedule">
            <Button
              size="lg"
              className="font-semibold"
              style={{ background: "#C9A84C", color: "#1C1C1E" }}
              data-testid="button-services-schedule"
            >
              Schedule a Free Video Estimate
              <Video className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-cream dark:bg-charcoal-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-foreground mb-3">Our Service Menu</h2>
            <p className="text-muted-foreground text-lg">Click any category to learn more about how we approach each discipline.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category) => (
              <Card
                key={category.name}
                className="p-6 bg-white dark:bg-charcoal border-border"
                data-testid={`service-category-${category.name.toLowerCase().replace(/[\s&]/g, "-")}`}
              >
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{category.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{category.description}</p>
                <ul className="space-y-1.5">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#C9A84C" }} />
                      <span className="text-sm text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">Service Packages</Badge>
            <h2 className="font-display text-4xl font-bold text-foreground mb-3">Choose Your Package</h2>
            <p className="text-muted-foreground text-lg">Straightforward pricing. No hidden fees. Exceptional results at every level.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-lg p-8 flex flex-col ${
                  pkg.popular
                    ? "bg-charcoal-dark text-white border-2"
                    : "bg-card border border-border"
                }`}
                style={pkg.popular ? { borderColor: "#C9A84C" } : {}}
                data-testid={`package-${pkg.name.toLowerCase().replace(/\s/g, "-")}`}
              >
                {pkg.popular && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "#C9A84C", color: "#1C1C1E" }}
                  >
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={`font-display text-2xl font-bold mb-2 ${pkg.popular ? "text-white" : "text-foreground"}`}>
                    {pkg.name}
                  </h3>
                  <div className="font-bold text-lg mb-2" style={{ color: "#C9A84C" }}>{pkg.price}</div>
                  <p className={`text-sm leading-relaxed ${pkg.popular ? "text-white/70" : "text-muted-foreground"}`}>
                    {pkg.description}
                  </p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Star className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#C9A84C" }} />
                      <span className={`text-sm ${pkg.popular ? "text-white/80" : "text-foreground/80"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/schedule">
                  <Button
                    className="w-full font-semibold"
                    style={pkg.popular ? { background: "#C9A84C", color: "#1C1C1E" } : {}}
                    variant={pkg.popular ? "default" : "outline"}
                    data-testid={`button-book-${pkg.name.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {pkg.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
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
            Schedule a Google Meet call with one of our specialists. Walk us through your space on video and we'll give you a detailed, honest estimate — at zero cost.
          </p>
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
        </div>
      </section>
    </div>
  );
}
