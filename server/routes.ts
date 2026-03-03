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
        title: "Luxury Bathroom — Full Gut to Navy Tile Spa",
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
        description: "Custom double vanity installation with Calacatta quartz countertop, grey shaker cabinetry, brushed nickel fixtures, rustic wood-framed mirrors, and industrial-style vanity lighting. Same bathroom, different angle — demo to done.",
        featured: true,
      },
      {
        title: "Quartz Double Vanity — Countertop Install",
        category: "Countertops",
        beforeImage: "/images/bathroom-gutted-framing.jpg",
        afterImage: "/images/vanity-quartz-double.jpg",
        description: "From exposed framing and bare subfloor to a polished Calacatta quartz double vanity with dual undermount sinks, grey shaker cabinetry, and wood-look porcelain tile flooring.",
        featured: true,
      },
      {
        title: "Custom Tile Shower — Pan to Finish",
        category: "Custom Builds",
        beforeImage: "/images/shower-before-pan.jpg",
        afterImage: "/images/shower-after-tile.jpg",
        description: "Full shower build from waterproofed shower pan to finished product. Marble-look porcelain wall tile in offset pattern, hexagonal mosaic floor tile, and recessed shampoo niche — all precision-set by hand.",
        featured: true,
      },
      {
        title: "Shower Tile Detail — Hex Floor & Niche",
        category: "Custom Builds",
        beforeImage: "/images/shower-tile-inprogress.jpg",
        afterImage: "/images/shower-after-tile-2.jpg",
        description: "Mid-install to finished: marble-look wall tile with blue tape still up transitions to grouted hexagonal mosaic floor, completed shampoo niche, and polished fixtures. Same shower, same niche, same hex pattern — just finished.",
        featured: false,
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
        title: "Drywall Repair & Feature Wall Build",
        category: "Lighting & Walls",
        beforeImage: "/images/drywall-before-openwall.jpg",
        afterImage: "/images/drywall-after-featurewall.jpg",
        description: "From exposed lath and plaster to a polished entertainment space. Full drywall repair, stone veneer feature wall construction, and integrated electric fireplace with ambient LED lighting.",
        featured: false,
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
        title: "Basement Room Renovation — Drywall to Done",
        category: "Lighting & Walls",
        beforeImage: "/images/room-renovation-before.jpg",
        afterImage: "/images/flooring-after-lvp-2.jpg",
        description: "Complete basement room renovation including drywall repair, fresh paint, new baseboards, and premium LVP flooring installation — turning a rough space into a clean, livable room.",
        featured: false,
      },
      {
        title: "Custom Built-in Entertainment Center",
        category: "Custom Builds",
        beforeImage: "/images/entertainment-before-tvmount.jpg",
        afterImage: "/images/gallery-5-after.png",
        description: "Floor-to-ceiling custom entertainment center with hidden wire management, integrated lighting, and walnut wood veneer. Same room — bare wall with TV mount bracket transformed into a built-in showcase.",
        featured: true,
      },
      {
        title: "Backlit Onyx Kitchen Island",
        category: "Countertops",
        beforeImage: "/images/kitchen-countertop-install.jpg",
        afterImage: "/images/onyx-island-lit.jpg",
        description: "Custom backlit onyx waterfall island countertop with integrated LED lighting. Yellow install tape and sink cutout visible in the before — finished with a dramatic amber glow in the after.",
        featured: true,
      },
      {
        title: "Quartz Kitchen Island & Countertops",
        category: "Countertops",
        beforeImage: "/images/kitchen-countertop-install.jpg",
        afterImage: "/images/kitchen-quartz-wide.jpg",
        description: "Full kitchen countertop installation with Calacatta quartz waterfall island, recessed lighting, modern flat-panel cabinetry, and bar seating. Same kitchen — install tape and cutouts to polished finish.",
        featured: true,
      },
      {
        title: "Backlit Onyx Fireplace Surround",
        category: "Custom Builds",
        beforeImage: "/images/onyx-led-panels.jpg",
        afterImage: "/images/onyx-fireplace-closeup.jpg",
        description: "Custom LED panel array installed behind translucent onyx slab. The before shows bare LED strips being positioned — the after reveals the finished fireplace surround glowing from within.",
        featured: true,
      },
      {
        title: "Backlit Onyx Waterfall Bar Island",
        category: "Countertops",
        beforeImage: "/images/led-panel-closeup.jpg",
        afterImage: "/images/onyx-bar-island-end.jpg",
        description: "Stunning backlit onyx waterfall bar island. LED panel closeup during install transitions to the finished translucent onyx wrapping the island end with warm amber tones.",
        featured: true,
      },
      {
        title: "Onyx Countertop — Backlit From Above",
        category: "Countertops",
        beforeImage: "/images/onyx-led-panels.jpg",
        afterImage: "/images/onyx-countertop-above.jpg",
        description: "Overhead view of a backlit onyx countertop. LED panel array during installation becomes a glowing amber and blue veined surface that transforms any kitchen into a gallery.",
        featured: false,
      },
      {
        title: "Brick Powder Room — Exposed Brick & Modern Fixtures",
        category: "Custom Builds",
        beforeImage: "/images/brick-powder-room-before.jpg",
        afterImage: "/images/brick-powder-room-after.jpg",
        description: "Tiny powder room renovation keeping the exposed brick character wall intact while adding a wall-hung sink with matte black faucet, recessed lighting, fresh grey paint, and custom window trim. Same brick, completely different feel.",
        featured: true,
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
        title: "Custom Accent Wall with Inlaid Lighting",
        category: "Lighting & Walls",
        beforeImage: "/images/gallery-2-before.png",
        afterImage: "/images/gallery-2-after.png",
        description: "A dramatic moody accent wall with custom recessed LED strip lighting, transforming a bland room into a stunning focal point.",
        featured: false,
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
        title: "Crystal Chandelier Installation",
        category: "Lighting & Fixtures",
        beforeImage: "/images/gallery-4-before.png",
        afterImage: "/images/gallery-4-after.png",
        description: "Stunning 14-light crystal chandelier installation in a two-story foyer, including all electrical work and vaulted ceiling rigging.",
        featured: true,
      },

      {
        title: "Modern Farmhouse Bathroom — Floating Walnut Vanity",
        category: "Custom Builds",
        beforeImage: "/images/farmhouse-bath-vanity.jpg",
        afterImage: "/images/farmhouse-bath-vanity.jpg",
        description: "Modern farmhouse bathroom with floating solid walnut vanity, marble hexagonal floor tile, matte black fixtures, iron-framed mirror, and clean white subway tile shower surround.",
        featured: true,
      },
      {
        title: "Farmhouse Shower — Matte Black Fixtures & Frameless Glass",
        category: "Custom Builds",
        beforeImage: "/images/farmhouse-shower-glass.jpg",
        afterImage: "/images/farmhouse-shower-glass.jpg",
        description: "Frameless glass shower enclosure with matte black rainfall showerhead, handheld wand, white subway tile walls, and hexagonal penny-round floor tile. Every fixture curated for the modern farmhouse aesthetic.",
        featured: false,
      },
      {
        title: "Luxury Marble Spa — Body Jets & Digital Controls",
        category: "Custom Builds",
        beforeImage: "/images/spa-marble-bodyjets.jpg",
        afterImage: "/images/spa-marble-bodyjets.jpg",
        description: "Full luxury spa bathroom with floor-to-ceiling grey marble tile, ceiling-mount square rainhead, four body jets with digital temperature controls, built-in bench, wall-mount toilet, and frameless glass enclosure.",
        featured: true,
      },
      {
        title: "Luxury Spa Bathroom — Walk-In Shower Suite",
        category: "Custom Builds",
        beforeImage: "/images/spa-bathroom-shower.jpg",
        afterImage: "/images/spa-bathroom-shower.jpg",
        description: "Oversized walk-in shower with ceiling-mount rainhead, multiple body jets, frameless glass enclosure, built-in stone bench, and floor-to-ceiling natural stone tile. Digital temperature controls for precise comfort.",
        featured: true,
      },
      {
        title: "Full Kitchen Remodel — White Shaker & LVP",
        category: "Custom Builds",
        beforeImage: "/images/kitchen-white-shaker-full.jpg",
        afterImage: "/images/kitchen-white-shaker-full.jpg",
        description: "Complete kitchen transformation with white shaker cabinetry, stainless steel appliances, grey LVP flooring, recessed lighting, and modern brushed nickel hardware. A bright, functional family kitchen.",
        featured: true,
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
