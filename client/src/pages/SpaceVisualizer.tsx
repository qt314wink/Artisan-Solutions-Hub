import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Zap, Upload, Sparkles, RefreshCcw, Download, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const services = [
  "TV Mounting & Cable Concealment",
  "Fixture Refresh (Lights & Fans)",
  "Living Room Upgrade (Full Transformation)",
  "Bathroom Refresh (Vanity, Toilet, Lighting)",
  "Kitchen Surface Upgrade (Epoxy, Backsplash)",
  "Custom Feature Wall & Fireplace",
  "Accent Wall with LED Lighting",
  "Full Room Paint & Refresh",
  "Built-In Shelving System",
  "Drywall Patch & Finish",
  "Epoxy Countertop or Floor",
  "Furniture Assembly & Setup",
];

interface VisualizationResult {
  visualization: string;
  imageUrl: string | null;
  imageBase64: string | null;
}

export default function SpaceVisualizer() {
  const [description, setDescription] = useState("");
  const [measurements, setMeasurements] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [result, setResult] = useState<VisualizationResult | null>(null);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: { description: string; service: string; measurements: string }) => {
      const res = await fetch("/api/visualize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to visualize");
      }
      return res.json() as Promise<VisualizationResult>;
    },
    onSuccess: (data) => setResult(data),
    onError: (err: Error) => {
      toast({
        title: "Visualization failed",
        description: err.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleVisualize = () => {
    if (!description.trim()) {
      toast({ title: "Describe your space", description: "Please tell us about your space first.", variant: "destructive" });
      return;
    }
    if (!selectedService) {
      toast({ title: "Select a service", description: "Choose what you'd like done.", variant: "destructive" });
      return;
    }
    mutation.mutate({ description, service: selectedService, measurements });
  };

  const handleDownload = () => {
    if (!result?.imageUrl) return;
    const a = document.createElement("a");
    a.href = result.imageUrl;
    a.download = "ateam-repair-visualization.png";
    a.click();
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Hero */}
      <section className="bg-charcoal-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Badge className="mb-6" style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C", borderColor: "rgba(201,168,76,0.3)" }}>
            AI Space Visualizer
          </Badge>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(201,168,76,0.15)" }}>
            <Zap className="w-8 h-8" style={{ color: "#C9A84C" }} />
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-4">
            See Your Space
            <br />
            <span style={{ color: "#C9A84C" }}>Transformed</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Describe your space, choose a service, and our AI will generate a vivid visualization of your transformed room — along with an AI-rendered concept image.
          </p>
        </div>
      </section>

      {/* Main Tool */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Input Panel */}
            <div className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <h2 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" style={{ color: "#C9A84C" }} />
                  Describe Your Space
                </h2>

                <div className="space-y-5">
                  <div>
                    <Label className="mb-2 block font-medium">What service would you like? *</Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger data-testid="select-visualizer-service">
                        <SelectValue placeholder="Choose a service to visualize..." />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 block font-medium">Describe your current space *</Label>
                    <Textarea
                      placeholder="My living room is about 18x14 feet with 9-foot ceilings, white walls, dark hardwood floors, a large window on the south wall, and a gas fireplace on the north wall. It feels plain and lacks personality..."
                      className="min-h-[160px] resize-none"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      data-testid="textarea-visualizer-description"
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block font-medium">Measurements (optional)</Label>
                    <Input
                      placeholder="e.g., 18ft x 14ft, 9ft ceiling height"
                      value={measurements}
                      onChange={(e) => setMeasurements(e.target.value)}
                      data-testid="input-visualizer-measurements"
                    />
                  </div>
                </div>

                <Button
                  className="w-full mt-6 font-semibold text-base"
                  size="lg"
                  onClick={handleVisualize}
                  disabled={mutation.isPending}
                  style={{ background: "#C9A84C", color: "#1C1C1E" }}
                  data-testid="button-visualize"
                >
                  {mutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Generating Your Vision...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Visualize My Space
                    </span>
                  )}
                </Button>
              </Card>

              {/* Tips */}
              <Card className="p-5 bg-charcoal-dark border-0 text-white">
                <h3 className="font-semibold mb-3 text-sm" style={{ color: "#C9A84C" }}>Tips for Best Results</h3>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>• Include room dimensions if you know them</li>
                  <li>• Describe existing colors, materials, and fixtures</li>
                  <li>• Mention any specific style direction (modern, rustic, glam)</li>
                  <li>• Note any features you want to keep or highlight</li>
                </ul>
              </Card>
            </div>

            {/* Result Panel */}
            <div>
              {mutation.isPending ? (
                <div className="h-full flex flex-col items-center justify-center py-20 rounded-lg border border-border bg-card">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full border-4 border-muted animate-spin" style={{ borderTopColor: "#C9A84C" }} />
                    <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8" style={{ color: "#C9A84C" }} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">Creating Your Vision</h3>
                  <p className="text-muted-foreground text-sm text-center max-w-xs">
                    Our AI is analyzing your space and generating a transformation concept. This takes 15–30 seconds.
                  </p>
                </div>
              ) : result ? (
                <div className="space-y-6" data-testid="visualization-result">
                  {/* Generated Image */}
                  {result.imageUrl && (
                    <div className="rounded-lg overflow-hidden border border-border relative">
                      <img
                        src={result.imageUrl}
                        alt="AI Visualization of transformed space"
                        className="w-full h-auto"
                        data-testid="img-visualization"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge style={{ background: "rgba(201,168,76,0.9)", color: "#1C1C1E" }}>
                          AI Concept Render
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="bg-black/40 text-white border border-white/20"
                          onClick={handleDownload}
                          data-testid="button-download-visualization"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Written Visualization */}
                  <Card className="p-6 bg-charcoal-dark border-0 text-white">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5" style={{ color: "#C9A84C" }} />
                      <h3 className="font-semibold">Your Transformed Space</h3>
                    </div>
                    <p className="text-white/80 leading-relaxed" data-testid="text-visualization">
                      {result.visualization}
                    </p>
                  </Card>

                  {/* Actions */}
                  <div className="flex gap-3 flex-wrap">
                    <Button
                      variant="outline"
                      onClick={() => { setResult(null); }}
                      className="flex-1"
                      data-testid="button-start-over"
                    >
                      <RefreshCcw className="w-4 h-4 mr-2" />
                      Try Another Space
                    </Button>
                    <a href="/schedule" className="flex-1">
                      <Button
                        className="w-full font-semibold"
                        style={{ background: "#C9A84C", color: "#1C1C1E" }}
                        data-testid="button-visualizer-schedule"
                      >
                        Make It Real — Book Estimate
                      </Button>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/50">
                  <ImageIcon className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <h3 className="font-display text-xl font-bold text-foreground/50 mb-2">Your Visualization Appears Here</h3>
                  <p className="text-muted-foreground text-sm text-center max-w-xs">
                    Describe your space on the left and click "Visualize My Space" to see the magic.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Love What You See?
            <span style={{ color: "#C9A84C" }}> Let's Build It.</span>
          </h2>
          <p className="text-white/70 mb-8">
            Our team can turn any visualization into reality. Schedule a free video estimate and let's talk specifics.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/schedule">
              <Button
                size="lg"
                className="font-semibold"
                style={{ background: "#C9A84C", color: "#1C1C1E" }}
                data-testid="button-visualizer-cta-schedule"
              >
                Schedule Free Video Estimate
              </Button>
            </a>
            <a href="/show-my-space">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white/30"
                data-testid="button-visualizer-cta-space"
              >
                Show My Space
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
