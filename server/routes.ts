import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { leads, galleryItems, articles, videoEstimates, testimonials } from "@shared/schema";
import { insertLeadSchema, insertVideoEstimateSchema } from "@shared/schema";
import { eq, count } from "drizzle-orm";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

async function seedDatabase() {
  const [galleryCount] = await db.select({ count: count() }).from(galleryItems);
  if (galleryCount.count === 0) {
    await db.insert(galleryItems).values([
      {
        title: "Backlit Onyx Fireplace Surround",
        category: "Custom Builds",
        beforeImage: "/images/onyx-fireplace-room.jpg",
        afterImage: "/images/onyx-fireplace-closeup.jpg",
        description: "Showstopping backlit onyx slab fireplace surround with custom LED edge lighting. The translucent onyx glows from within, creating a one-of-a-kind living room focal point.",
        featured: true,
      },
      {
        title: "Backlit Onyx Kitchen Island",
        category: "Countertops",
        beforeImage: "/images/kitchen-countertop-install.jpg",
        afterImage: "/images/onyx-island-lit.jpg",
        description: "Custom backlit onyx waterfall island countertop with integrated LED lighting. The translucent stone creates a dramatic amber glow — a true conversation piece in a luxury kitchen.",
        featured: true,
      },
      {
        title: "Quartz Kitchen Island & Countertops",
        category: "Countertops",
        beforeImage: "/images/kitchen-countertop-install.jpg",
        afterImage: "/images/kitchen-quartz-wide.jpg",
        description: "Full kitchen countertop installation with Calacatta quartz waterfall island, recessed lighting, modern flat-panel cabinetry, and bar seating. A complete kitchen transformation with premium materials.",
        featured: true,
      },
      {
        title: "Epoxy Countertop — Copper Metallic Finish",
        category: "Countertops",
        beforeImage: "/images/room-renovation-before.jpg",
        afterImage: "/images/epoxy-countertop.png",
        description: "Bold copper and amber metallic epoxy countertop pour with deep swirling patterns. A unique, hand-crafted surface that transforms ordinary counters into functional art.",
        featured: false,
      },
      {
        title: "Kitchen Countertop Transformation",
        category: "Countertops",
        beforeImage: "/images/gallery-1-before.png",
        afterImage: "/images/gallery-1-after.png",
        description: "Full granite countertop replacement with custom edge profiling and undermount sink installation in a Main Line kitchen.",
        featured: true,
      },
      {
        title: "Feature Wall — Electric Fireplace & Mounted TV",
        category: "Lighting & Walls",
        beforeImage: "/images/featurewall-before-framing.jpg",
        afterImage: "/images/featurewall-after-complete.jpg",
        description: "Custom stone accent wall with recessed electric fireplace featuring LED ambiance, wall-mounted TV with hidden wiring, and LVP flooring — transforming a bare basement into a modern entertainment space.",
        featured: true,
      },
      {
        title: "Custom Accent Wall with Inlaid Lighting",
        category: "Lighting & Walls",
        beforeImage: "/images/gallery-2-before.png",
        afterImage: "/images/gallery-2-after.png",
        description: "A dramatic moody accent wall with custom recessed LED strip lighting, transforming a bland room into a stunning focal point.",
        featured: true,
      },
      {
        title: "Luxury Bathroom Renovation — Full Shower Build",
        category: "Custom Builds",
        beforeImage: "/images/bathroom-before-gutted.jpg",
        afterImage: "/images/bathroom-after-shower.jpg",
        description: "Complete gut-to-gorgeous bathroom transformation. Demolished down to studs and rebuilt with navy blue subway tile, frameless glass enclosure, built-in bench, ceiling-mount rainhead, and hexagonal mosaic floor tile.",
        featured: true,
      },
      {
        title: "Double Vanity with Quartz Countertop",
        category: "Custom Builds",
        beforeImage: "/images/bathroom-before-demo.jpg",
        afterImage: "/images/bathroom-after-vanity.jpg",
        description: "Custom double vanity installation with Calacatta quartz countertop, grey shaker cabinetry, brushed nickel fixtures, rustic wood-framed mirrors, and industrial-style vanity lighting.",
        featured: true,
      },
      {
        title: "LVP Flooring Over Damaged Hardwood",
        category: "Epoxy & Flooring",
        beforeImage: "/images/flooring-before-hardwood.jpg",
        afterImage: "/images/flooring-after-lvp.jpg",
        description: "Replaced worn, damaged original hardwood floors with premium grey-tone luxury vinyl plank flooring. Waterproof, durable, and dramatically brighter — a complete living room transformation.",
        featured: true,
      },
      {
        title: "Metallic Epoxy Floor Installation",
        category: "Epoxy & Flooring",
        beforeImage: "/images/gallery-3-before.png",
        afterImage: "/images/gallery-3-after.png",
        description: "Premium metallic epoxy floor transformation in a Philly suburb garage, turning plain concrete into a showroom-worthy surface.",
        featured: false,
      },
      {
        title: "Drywall Repair & Feature Wall Build",
        category: "Lighting & Walls",
        beforeImage: "/images/drywall-before-openwall.jpg",
        afterImage: "/images/drywall-after-featurewall.jpg",
        description: "From exposed lath and plaster to a polished entertainment space. Full drywall repair, stone veneer feature wall construction, and integrated electric fireplace with ambient LED lighting.",
        featured: false,
      },
      {
        title: "Crystal Chandelier Installation",
        category: "Lighting & Fixtures",
        beforeImage: "/images/gallery-4-before.png",
        afterImage: "/images/gallery-4-after.png",
        description: "Stunning 14-light crystal chandelier installation in a two-story foyer, including all electrical work and vaulted ceiling rigging.",
        featured: true,
      },
      {
        title: "Custom Built-in Entertainment Center",
        category: "Custom Builds",
        beforeImage: "/images/entertainment-before-tvmount.jpg",
        afterImage: "/images/gallery-5-after.png",
        description: "Floor-to-ceiling custom entertainment center with hidden wire management, integrated lighting, and walnut wood veneer.",
        featured: false,
      },
      {
        title: "Custom Tile Shower — From Pan to Finish",
        category: "Custom Builds",
        beforeImage: "/images/shower-before-pan.jpg",
        afterImage: "/images/shower-after-tile.jpg",
        description: "Full shower build from waterproofed shower pan to finished product. Marble-look porcelain wall tile in offset pattern, hexagonal mosaic floor tile, and recessed shampoo niche — all precision-set by hand.",
        featured: false,
      },
      {
        title: "Luxury Spa Bathroom — Rainhead & Body Jets",
        category: "Custom Builds",
        beforeImage: "/images/tile-inprogress-1.jpg",
        afterImage: "/images/spa-bathroom-shower.jpg",
        description: "Full luxury spa bathroom build featuring oversized walk-in shower with ceiling-mount rainhead, multiple body jets, frameless glass enclosure, and marble-look porcelain tile throughout.",
        featured: true,
      },
      {
        title: "Modern Farmhouse Bathroom",
        category: "Custom Builds",
        beforeImage: "/images/tile-inprogress-2.jpg",
        afterImage: "/images/farmhouse-bath-vanity.jpg",
        description: "Modern farmhouse bathroom renovation with floating walnut vanity, hexagonal floor tile, matte black fixtures, and clean white subway tile shower surround.",
        featured: true,
      },
      {
        title: "Basement Room Renovation — Drywall to Done",
        category: "Lighting & Walls",
        beforeImage: "/images/room-before-paint.jpg",
        afterImage: "/images/flooring-after-lvp-2.jpg",
        description: "Complete basement room renovation including drywall repair, fresh paint, new baseboards, and premium LVP flooring installation — turning a rough space into a clean, livable room.",
        featured: false,
      },
      {
        title: "Shower Tile Detail — Hexagonal Mosaic Floor",
        category: "Custom Builds",
        beforeImage: "/images/shower-before-pan.jpg",
        afterImage: "/images/shower-after-tile-2.jpg",
        description: "Precision-laid hexagonal mosaic shower floor with marble-look porcelain wall tile. Every tile hand-set with uniform grout lines and waterproof backing for lasting quality.",
        featured: false,
      },
      {
        title: "Whole-Home LVP Flooring — Living Room",
        category: "Epoxy & Flooring",
        beforeImage: "/images/lvp-livingroom-wide.jpg",
        afterImage: "/images/lvp-livingroom-window.jpg",
        description: "Large-format luxury vinyl plank flooring throughout a spacious living area with recessed lighting and bay windows. Clean, modern grey-tone planks with seamless transitions between rooms.",
        featured: true,
      },
      {
        title: "Farmhouse Bath — Matte Black Fixtures & Glass Shower",
        category: "Custom Builds",
        beforeImage: "/images/tile-niche-progress.jpg",
        afterImage: "/images/farmhouse-bath-shower.jpg",
        description: "Modern farmhouse shower build with frameless glass enclosure, matte black rainfall showerhead and handheld, white subway tile surround, and hexagonal mosaic floor. Clean lines meet warm rustic tones.",
        featured: false,
      },
      {
        title: "Spa Bathroom — Full Suite with Body Jets",
        category: "Custom Builds",
        beforeImage: "/images/tile-redguard-progress.jpg",
        afterImage: "/images/spa-bathroom-vanity-wide.jpg",
        description: "Complete luxury spa bathroom featuring floor-to-ceiling natural stone tile, frameless glass walk-in shower with body jets and digital controls, white vanity with oversized mirror, and heated floors.",
        featured: true,
      },
      {
        title: "Farmhouse Bath — Designer Fixture Details",
        category: "Lighting & Fixtures",
        beforeImage: "/images/farmhouse-bath-doorway.jpg",
        afterImage: "/images/farmhouse-bath-fixtures.jpg",
        description: "Industrial-modern bathroom fixture package: matte black gooseneck faucet, clear glass cone sconces, floating walnut vanity, and frameless black-frame mirror. Every detail curated for cohesion.",
        featured: false,
      },
      {
        title: "Luxury Shower — Multi-Jet Marble System",
        category: "Custom Builds",
        beforeImage: "/images/shower-tile-inprogress.jpg",
        afterImage: "/images/spa-bathroom-bodyjets.jpg",
        description: "Walk-in marble shower system with ceiling-mount square rainhead, wall-mounted body jets with digital temperature controls, built-in bench, and glass mosaic accent border at the base.",
        featured: false,
      },
      {
        title: "Backlit Onyx Waterfall Bar Island",
        category: "Countertops",
        beforeImage: "/images/onyx-led-panels.jpg",
        afterImage: "/images/onyx-bar-island-end.jpg",
        description: "Stunning backlit onyx waterfall bar island with custom LED panel array. Translucent onyx slab wraps the island end, glowing with warm amber tones — a showpiece for entertaining.",
        featured: true,
      },
      {
        title: "Luxury Kitchen — Quartz Counters & Marble Tile",
        category: "Countertops",
        beforeImage: "/images/room-renovation-before.jpg",
        afterImage: "/images/kitchen-luxury-quartz.jpg",
        description: "Complete luxury kitchen build with grey shaker cabinetry, quartz waterfall island, marble-look porcelain floor tile, stainless appliances, and under-counter LED lighting throughout.",
        featured: true,
      },
      {
        title: "Master Bath — Full Gut to Navy Tile Spa",
        category: "Custom Builds",
        beforeImage: "/images/bathroom-gutted-framing.jpg",
        afterImage: "/images/bathroom-after-shower.jpg",
        description: "Complete master bathroom demolition down to studs and rebuilt from scratch. Navy blue subway tile, frameless glass shower with bench, ceiling-mount rainhead, and hexagonal mosaic floors.",
        featured: true,
      },
      {
        title: "Quartz Double Vanity Installation",
        category: "Countertops",
        beforeImage: "/images/shower-before-pan.jpg",
        afterImage: "/images/vanity-quartz-double.jpg",
        description: "Custom double vanity with Calacatta quartz countertop, dual undermount sinks, grey shaker cabinetry, and wood-look porcelain tile flooring. Clean, spa-inspired design.",
        featured: true,
      },
      {
        title: "Onyx Countertop — Backlit From Above",
        category: "Countertops",
        beforeImage: "/images/onyx-led-panels.jpg",
        afterImage: "/images/onyx-countertop-above.jpg",
        description: "Overhead view of a backlit onyx countertop installation with integrated LED panel system. The translucent stone creates a glowing amber and blue veined surface that transforms any kitchen into a gallery.",
        featured: true,
      },
      {
        title: "Full Kitchen Remodel — White Shaker & LVP",
        category: "Custom Builds",
        beforeImage: "/images/room-renovation-before.jpg",
        afterImage: "/images/kitchen-white-shaker-full.jpg",
        description: "Complete kitchen transformation with white shaker cabinetry, stainless steel appliances, grey LVP flooring, and recessed lighting. Modern brushed nickel hardware and slate appliances tie the space together.",
        featured: true,
      },
      {
        title: "Kitchen Backsplash — Mosaic Tile & Range Hood",
        category: "Custom Builds",
        beforeImage: "/images/kitchen-dining-chandelier.jpg",
        afterImage: "/images/kitchen-backsplash-mosaic.jpg",
        description: "Precision-installed linear mosaic tile backsplash behind a stainless steel range hood with quartz countertops and white shaker cabinets. Every detail hand-finished for a polished, high-end result.",
        featured: false,
      },
      {
        title: "Farmhouse Powder Room — Floating Walnut Vanity",
        category: "Custom Builds",
        beforeImage: "/images/tile-setting-clips.jpg",
        afterImage: "/images/farmhouse-powder-room.jpg",
        description: "Modern farmhouse powder room with floating solid walnut vanity, marble hexagonal floor tile, matte black fixtures, and iron-framed mirror. From raw tile work to a refined, designer-curated space.",
        featured: true,
      },
      {
        title: "Luxury Marble Spa — Body Jets & Digital Controls",
        category: "Custom Builds",
        beforeImage: "/images/tile-setting-niche.jpg",
        afterImage: "/images/spa-marble-bodyjets.jpg",
        description: "Full luxury spa bathroom with floor-to-ceiling grey marble tile, ceiling-mount square rainhead, four body jets with digital temperature controls, built-in bench, wall-mount toilet, and frameless glass enclosure.",
        featured: true,
      },
      {
        title: "Spa Bathroom — Vanity & Glass Shower Suite",
        category: "Custom Builds",
        beforeImage: "/images/tile-setting-clips.jpg",
        afterImage: "/images/spa-marble-vanity.jpg",
        description: "Complete spa bathroom suite showing white double vanity with chrome fixtures, oversized beveled mirror, and seamless frameless glass shower with ceiling-to-floor grey marble tile throughout.",
        featured: false,
      },
      {
        title: "Shower Floor Detail — Body Jets & Mosaic Border",
        category: "Custom Builds",
        beforeImage: "/images/tile-setting-niche.jpg",
        afterImage: "/images/spa-marble-floor-detail.jpg",
        description: "Close detail of luxury spa shower floor with precision-set marble tile, decorative mosaic glass border, dual floor drains, wall-mounted body jets with digital controls, and built-in stone bench.",
        featured: false,
      },
      {
        title: "Quartz Kitchen Island — Waterfall Edge",
        category: "Countertops",
        beforeImage: "/images/flooring-before-hardwood.jpg",
        afterImage: "/images/kitchen-quartz-waterfall-detail.jpg",
        description: "Calacatta quartz waterfall island with polished edge detail, modern bar stool seating, and recessed lighting above. The continuous waterfall edge creates a sleek, high-end kitchen focal point.",
        featured: true,
      },
      {
        title: "Frameless Glass Shower — Matte Black Hardware",
        category: "Custom Builds",
        beforeImage: "/images/tile-setting-clips.jpg",
        afterImage: "/images/farmhouse-shower-glass.jpg",
        description: "Frameless glass shower enclosure with matte black rainfall showerhead, handheld wand, and glass door handle. White subway tile walls and hexagonal penny-round floor tile complete the modern farmhouse look.",
        featured: false,
      },
      {
        title: "Shower Niche & Tile Detail — Hex Accent",
        category: "Custom Builds",
        beforeImage: "/images/tile-setting-niche.jpg",
        afterImage: "/images/farmhouse-shower-niche.jpg",
        description: "Custom shower niche with hexagonal mosaic marble accent tile inlay, surrounded by crisp white subway tile and fitted with matte black handheld shower fixtures. Precision tile work throughout.",
        featured: false,
      },
    ]);
  }

  const [articleCount] = await db.select({ count: count() }).from(articles);
  if (articleCount.count === 0) {
    await db.insert(articles).values([
      {
        title: "How to Choose the Right Countertop Material for Your Kitchen",
        slug: "choose-right-countertop-material",
        excerpt: "Granite, quartz, onyx, or marble? We break down the pros, cons, cost, and durability of each premium countertop material so you can make the perfect choice.",
        content: `# How to Choose the Right Countertop Material for Your Kitchen

Choosing a countertop material is one of the most impactful decisions you'll make in a kitchen renovation. The right choice balances aesthetics, durability, maintenance requirements, and budget.

## Granite: The Timeless Classic

Granite has been the gold standard in luxury kitchens for decades. Each slab is unique, featuring natural variations in color and pattern that no engineered material can replicate.

**Pros:**
- Heat resistant — you can place hot pots directly on it
- Highly durable and scratch resistant
- Increases home value significantly
- Every piece is truly one-of-a-kind

**Cons:**
- Requires annual sealing to prevent staining
- Heavy — your cabinets must support the weight
- Edges can chip if subjected to heavy impact

**Best for:** Busy kitchens where durability is the top priority.

## Quartz: The Low-Maintenance Luxury

Engineered quartz (like Silestone or Caesarstone) has become incredibly popular because it combines natural beauty with practical benefits.

**Pros:**
- Non-porous — never needs sealing
- Consistent pattern and color throughout
- Extremely scratch and stain resistant
- Available in hundreds of colors and styles

**Cons:**
- Not heat resistant — always use trivets
- Cannot be repaired if damaged
- Looks uniform, lacks the natural variation of stone

**Best for:** Homeowners who want luxury looks with minimal maintenance.

## Onyx: The Statement Material

Onyx is the most dramatic and luxurious of all countertop options. Its translucency allows light to pass through, creating a glowing effect unlike anything else.

**Pros:**
- Visually stunning — a true conversation piece
- Can be backlit for extraordinary effect
- Unique swirling patterns in every slab

**Cons:**
- Most expensive option
- Requires very careful maintenance
- Softer than granite, prone to scratching
- Not ideal for heavily-used surfaces

**Best for:** Bar areas, bathroom vanities, or feature islands where visual impact matters most.

## Our Recommendation

For most Philadelphia area kitchens, we recommend granite or quartz for primary surfaces, with onyx reserved for a feature island or butler's pantry where it can truly shine. Our team is happy to bring samples to your home and help you visualize each option in your space.

Schedule a video estimate today and let's find the perfect material for your vision.`,
        category: "How-To",
        tags: ["countertops", "granite", "quartz", "onyx", "kitchen"],
        readTime: 7,
        featured: true,
      },
      {
        title: "The Ultimate Guide to Hiding TV Wires (And Making It Look Built-In)",
        slug: "hiding-tv-wires-built-in-look",
        excerpt: "Exposed wires beneath a wall-mounted TV are an eyesore. Here's how the pros create a seamlessly clean, custom built-in look that adds value to your home.",
        content: `# The Ultimate Guide to Hiding TV Wires

Nothing undermines a beautiful room more than a tangle of cables dangling beneath a wall-mounted TV. Here's how we solve it — the right way.

## The Problem with DIY Solutions

Many homeowners try cord covers or cable raceways from big-box stores. While these are better than nothing, they never look truly seamless. The plastic covers are visible, paint doesn't adhere perfectly, and they still look like an afterthought.

## The Professional Solution: In-Wall Cable Management

The cleanest solution runs your cables through the wall itself. Here's what the process involves:

### Step 1: Planning and Assessment
We assess your wall structure, locate studs, and identify the safest path for cables. We check for any electrical, plumbing, or HVAC in the planned route.

### Step 2: Power Source Relocation
For a truly clean look, we relocate an electrical outlet directly behind where the TV will mount. This eliminates the need for an extension cord entirely.

### Step 3: In-Wall Cable Conduit
We install an in-wall rated cable conduit — a plastic tube that allows you to route cables through your drywall safely and legally (standard cables are NOT rated for in-wall use — this is a code violation many DIYers miss).

### Step 4: Patch and Paint
After routing cables, we patch the small access holes and match your existing paint, leaving zero evidence that any work was done.

## The Upgrade: Custom Built-In Media Center

For the absolute best result, consider a custom built-in media center that conceals all equipment — your cable box, gaming console, streaming devices, and audio system — in a beautifully designed cabinetry unit.

This approach not only eliminates all visible wires but also adds significant custom storage and dramatically increases your home's visual appeal and resale value.

## What to Expect

A professional TV wire-hiding installation typically takes 2-4 hours. A full custom built-in media center is a 1-2 day project depending on complexity.

Contact us for a free video estimate — we'll assess your space and give you options at every budget level.`,
        category: "Tips",
        tags: ["TV mounting", "wire hiding", "custom built-ins", "home improvement"],
        readTime: 6,
        featured: true,
      },
      {
        title: "Recessed Lighting 101: Planning Your Layout for Maximum Impact",
        slug: "recessed-lighting-layout-planning",
        excerpt: "Proper recessed lighting placement transforms a room from functional to magazine-worthy. Learn the spacing rules, trim styles, and dimmer requirements the pros use.",
        content: `# Recessed Lighting 101: Planning Your Layout for Maximum Impact

Recessed lighting is one of the highest-impact, most cost-effective upgrades you can make to any room. Done right, it eliminates shadows, defines spaces, and creates ambiance. Done wrong, it looks like a checkerboard of holes in your ceiling.

## The Golden Rule of Spacing

The standard rule for recessed lighting spacing is: **divide your ceiling height by 2 to get the distance from walls, and space fixtures 4 feet apart** for general lighting.

For a room with 9-foot ceilings:
- Place fixtures 4.5 feet from walls
- Space fixtures 4 feet apart from each other

This creates even illumination without hotspots or shadows.

## Types of Recessed Lights

### General Illumination (Flood/Wide Beam)
These cast light over a broad area and are ideal for ambient lighting throughout a room. We typically use 4" or 6" housings.

### Accent Lighting (Narrow Beam/Spotlight)
Used to highlight artwork, architectural features, or countertops. These have adjustable gimbal trim to direct light precisely.

### Task Lighting
Placed directly above work surfaces like kitchen islands or reading areas. Usually supplemented with under-cabinet lighting.

## Dimmer Compatibility

This is where many DIY projects fail. Modern LED recessed lights require dimmers specifically rated for LEDs — incandescent dimmers cause flickering and can damage fixtures. We always spec the right dimmer for the fixtures we install.

## Inlaid Lighting: The Luxury Upgrade

For the most dramatic effect, consider inlaid lighting — LED strips recessed into coffers, floating ceiling details, toe kicks, or wall niches. This creates a warm glow that defines architectural details and adds significant perceived value.

## Our Process

We handle everything: layout planning, electrical work (we are licensed electricians), fixture selection, installation, patching, and final testing. You simply choose the aesthetic direction and we handle the technical execution.`,
        category: "Guide",
        tags: ["recessed lighting", "LED", "interior lighting", "electrical"],
        readTime: 8,
        featured: false,
      },
      {
        title: "Before You Buy: What to Know About Large Mirror Installation",
        slug: "large-mirror-installation-guide",
        excerpt: "A well-placed large mirror can double the perceived size of a room. But installation requires careful planning around weight, anchoring, and position. Here's what you need to know.",
        content: `# Before You Buy: What to Know About Large Mirror Installation

Large mirrors are one of the most powerful design tools in interior spaces — they reflect light, create the illusion of more space, and serve as stunning statement pieces. But getting them on your wall safely and beautifully requires careful planning.

## Weight is Everything

Large mirrors are extremely heavy. A 4' x 6' mirror can weigh 80-150 lbs depending on thickness. Standard drywall anchors are completely inadequate for this — they will fail, and that mirror will crash.

The only proper approach is to anchor into wall studs. If studs aren't in the right location, we install a horizontal backing board between studs, then mount the mirror to that.

## French Cleats vs. J-Hooks

For mirrors over 30 lbs, we use a French cleat system — two interlocking beveled boards that distribute weight across a wide surface area and allow for level adjustment after installation.

For lighter pieces, heavy-duty J-hooks rated for the mirror's weight work well.

## Safety Considerations

- All mirrors larger than 24" x 36" should be professionally installed
- Anti-tip mounts should be used when mirrors are near floor level
- Consider whether the mirror is near a door path — safety backing prevents shattering

## Placement for Maximum Impact

The most impactful mirror placements:
1. **Across from a window** — reflects natural light throughout the day
2. **At the end of a hallway** — creates depth and perceived length
3. **Behind a bar or sideboard** — adds glamour and reflects candlelight
4. **Full bathroom wall** — creates spa-like expansiveness

## Our Professional Installation Service

We handle everything from assessment to installation. We bring the right hardware for your specific mirror weight, ensure perfect level placement, and leave your wall looking like the mirror was always meant to be there.`,
        category: "Guide",
        tags: ["mirrors", "installation", "interior design", "hanging"],
        readTime: 5,
        featured: false,
      },
    ]);
  }

  const [testimonialCount] = await db.select({ count: count() }).from(testimonials);
  if (testimonialCount.count === 0) {
    await db.insert(testimonials).values([
      {
        name: "Jennifer M.",
        location: "Bryn Mawr, PA",
        rating: 5,
        content: "Absolutely transformed our kitchen. The granite countertop and new under-cabinet lighting look incredible. The team was professional, clean, and finished ahead of schedule. Worth every penny.",
        service: "Countertop Installation + Lighting",
        featured: true,
      },
      {
        name: "David K.",
        location: "Center City, Philadelphia",
        rating: 5,
        content: "They built us a floor-to-ceiling custom entertainment center with hidden wire management. My wife and I couldn't believe the quality — it looks like it was there from day one. These guys are artists.",
        service: "Custom Built-In Entertainment Center",
        featured: true,
      },
      {
        name: "Priya S.",
        location: "Wayne, PA",
        rating: 5,
        content: "From the video estimate to final installation, the whole experience was seamless. The fireplace surround they built exceeded every expectation. I've already referred three neighbors.",
        service: "Custom Fireplace Surround",
        featured: true,
      },
      {
        name: "Thomas R.",
        location: "Villanova, PA",
        rating: 5,
        content: "Had an accent wall with LED channels installed in our master bedroom. The craftsmanship is impeccable and they cleaned up perfectly. Our bedroom feels like a 5-star hotel now.",
        service: "Accent Wall + Inlaid Lighting",
        featured: true,
      },
      {
        name: "Michelle B.",
        location: "Chestnut Hill, PA",
        rating: 5,
        content: "The chandelier installation in our foyer is a showstopper. Every guest comments on it immediately. The team handled the vaulted ceiling with total expertise.",
        service: "Chandelier Installation",
        featured: false,
      },
    ]);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  await seedDatabase().catch(console.error);

  app.post("/api/leads", async (req, res) => {
    try {
      const data = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(data);
      res.status(201).json(lead);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.get("/api/gallery", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const items = category
        ? await storage.getGalleryItemsByCategory(category)
        : await storage.getGalleryItems();
      res.json(items);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/articles", async (req, res) => {
    try {
      const items = await storage.getArticles();
      res.json(items);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/articles/:slug", async (req, res) => {
    try {
      const article = await storage.getArticleBySlug(req.params.slug);
      if (!article) return res.status(404).json({ error: "Article not found" });
      res.json(article);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/estimates", async (req, res) => {
    try {
      const data = insertVideoEstimateSchema.parse(req.body);
      const estimate = await storage.createVideoEstimate(data);
      res.status(201).json(estimate);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const items = await storage.getTestimonials();
      res.json(items);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/visualize", async (req, res) => {
    try {
      const { description, service, measurements } = req.body;

      if (!description) {
        return res.status(400).json({ error: "Description is required" });
      }

      const prompt = `You are an expert interior design visualizer. A customer has described their space and what they want done. Generate a detailed, vivid description of what their transformed space would look like after professional installation work. 

Space description: ${description}
Service requested: ${service || "general home improvement"}
${measurements ? `Space measurements: ${measurements}` : ""}

Write a compelling, detailed visualization of the transformed space in 3-4 sentences. Focus on the luxury result, materials, lighting effects, and overall ambiance. Be specific and inspiring.`;

      const response = await openai.chat.completions.create({
        model: "gpt-5.2",
        messages: [{ role: "user", content: prompt }],
        max_completion_tokens: 500,
      });

      const visualization = response.choices[0]?.message?.content || "";

      const imagePrompt = `Luxurious, professionally transformed interior space: ${description}. Service applied: ${service || "luxury renovation"}. ${visualization}. High-end Philadelphia home, professional interior design photography, warm elegant lighting, magazine quality, before and after transformation complete.`;

      const imageResponse = await openai.images.generate({
        model: "gpt-image-1",
        prompt: imagePrompt,
        n: 1,
        size: "1024x1024",
      });

      const imageBase64 = imageResponse.data[0]?.b64_json;

      res.json({
        visualization,
        imageBase64,
        imageUrl: imageBase64 ? `data:image/png;base64,${imageBase64}` : null,
      });
    } catch (err: any) {
      console.error("Visualization error:", err);
      res.status(500).json({ error: "Failed to generate visualization" });
    }
  });

  return httpServer;
}
