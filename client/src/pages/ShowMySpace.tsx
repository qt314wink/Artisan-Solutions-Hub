import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Phone, Mail, Home, Sparkles, Camera, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  serviceInterest: z.string().optional(),
  spaceDescription: z.string().min(10, "Please describe your space (at least 10 characters)"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const services = [
  "Mount & Secure Package ($175–$325)",
  "Fixture Refresh Package ($350–$650)",
  "Living Room Upgrade ($850–$1,800)",
  "Bathroom Refresh ($1,200–$2,500)",
  "Kitchen Surface Upgrade ($2,000–$5,000)",
  "Custom Feature Wall ($2,800–$6,500+)",
  "Drywall & Wall Finishes",
  "Lighting & Electrical",
  "Epoxy & Specialty Surfaces",
  "Painting & Creative Walls",
  "Assembly & Setup",
  "Hauling & Exterior",
  "Multiple Services",
  "Not Sure / General Inquiry",
];

const benefits = [
  { icon: Phone, text: "We'll call or text within 24 hours" },
  { icon: Mail, text: "Get a detailed quote via email" },
  { icon: Home, text: "Free video estimate included" },
  { icon: Sparkles, text: "No obligation, no pressure" },
];

export default function ShowMySpace() {
  useDocumentTitle("Show My Space — Get a Free Project Assessment");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceInterest: "",
      spaceDescription: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormValues) => apiRequest("POST", "/api/leads", data),
    onSuccess: () => setSubmitted(true),
    onError: () => {
      toast({ title: "Something went wrong", description: "Please try again or call us directly.", variant: "destructive" });
    },
  });

  if (submitted) {
    return (
      <div className="min-h-screen pt-16 bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 sm:px-6 text-center py-20">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(201,168,76,0.15)" }}>
            <CheckCircle2 className="w-10 h-10" style={{ color: "#C9A84C" }} />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">We've Got Your Space!</h1>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Thank you for reaching out. One of our specialists will contact you within 24 hours to discuss your vision and schedule your free video estimate.
          </p>
          <div className="p-6 rounded-lg bg-charcoal-dark text-white text-left">
            <p className="text-white/70 text-sm mb-3">Need to reach us sooner?</p>
            <a href="tel:+12153034494" className="font-bold text-lg block" style={{ color: "#C9A84C" }}>
              (215) 303-4494
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="bg-charcoal-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors" data-testid="link-breadcrumb-home">
            <Home className="w-4 h-4" />
            <span>Home</span>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span style={{ color: "#C9A84C" }}>Show My Space</span>
          </Link>
        </div>
      </div>
      {/* Hero */}
      <section className="bg-charcoal-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Badge className="mb-6" style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C", borderColor: "rgba(201,168,76,0.3)" }}>
            Lead Capture
          </Badge>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(201,168,76,0.15)" }}>
            <Camera className="w-8 h-8" style={{ color: "#C9A84C" }} />
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-4">
            Show Me
            <br />
            <span style={{ color: "#C9A84C" }}>Your Space</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Tell us about your space, what you're envisioning, and how to reach you. We'll take it from there — a personal specialist will reach out within 24 hours.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Benefits */}
            <div className="lg:col-span-1">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">What Happens Next</h2>
              <div className="space-y-6 mb-8">
                {benefits.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,168,76,0.1)" }}>
                      <Icon className="w-5 h-5" style={{ color: "#C9A84C" }} />
                    </div>
                    <p className="text-foreground/80 text-sm leading-relaxed pt-2">{text}</p>
                  </div>
                ))}
              </div>

              <Card className="p-6 bg-charcoal-dark border-0">
                <h3 className="font-semibold text-white mb-2">Prefer to call?</h3>
                <p className="text-white/60 text-sm mb-4">Our team answers 7 days a week, 8am–8pm.</p>
                <a
                  href="tel:+12153034494"
                  className="font-bold text-xl block"
                  style={{ color: "#C9A84C" }}
                  data-testid="link-phone-show-space"
                >
                  (215) 303-4494
                </a>
              </Card>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 bg-card border-border">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Tell Us About Your Space</h2>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                    className="space-y-6"
                    data-testid="form-show-space"
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Smith" {...field} data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="(215) 303-4494" type="tel" {...field} data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="jane@example.com" type="email" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="serviceInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service of Interest</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-service">
                                <SelectValue placeholder="Select a service..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {services.map((s) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="spaceDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Describe Your Space & Vision *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about the room, its dimensions if you know them, what you'd like done, and any inspiration or style direction. The more detail, the better we can help!"
                              className="min-h-[140px] resize-none"
                              {...field}
                              data-testid="textarea-space-description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Anything Else We Should Know?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Timeline, budget range, specific materials you love, access considerations..."
                              className="min-h-[80px] resize-none"
                              {...field}
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full font-semibold text-base"
                      disabled={mutation.isPending}
                      style={{ background: "#C9A84C", color: "#1C1C1E" }}
                      data-testid="button-submit-space"
                    >
                      {mutation.isPending ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          Send My Space Details
                        </span>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Your information is kept private and will only be used to contact you about your project.
                    </p>
                  </form>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
