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
import { Video, CheckCircle2, ExternalLink, Clock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Phone number is required"),
  serviceType: z.string().min(1, "Please select a service type"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  notes: z.string().optional(),
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

const timeSlots = [
  "8:00 AM – 9:00 AM",
  "9:00 AM – 10:00 AM",
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "12:00 PM – 1:00 PM",
  "1:00 PM – 2:00 PM",
  "2:00 PM – 3:00 PM",
  "3:00 PM – 4:00 PM",
  "4:00 PM – 5:00 PM",
  "5:00 PM – 6:00 PM",
];

const howItWorks = [
  { step: "1", title: "Submit Your Request", desc: "Fill in the form with your service needs and preferred time." },
  { step: "2", title: "We Confirm", desc: "Our team confirms your slot and sends a Google Meet link within 2 hours." },
  { step: "3", title: "Join Your Video Call", desc: "Walk us through your space on video. We ask questions and take notes." },
  { step: "4", title: "Get Your Estimate", desc: "Receive a detailed written estimate within 24 hours of your call." },
];

export default function Schedule() {
  const [confirmed, setConfirmed] = useState<{ meetLink: string } | null>(null);
  const { toast } = useToast();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      preferredDate: "",
      preferredTime: "",
      notes: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormValues) => apiRequest("POST", "/api/estimates", data),
    onSuccess: (data) => setConfirmed({ meetLink: data.meetLink || "https://meet.google.com" }),
    onError: () => {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    },
  });

  if (confirmed) {
    return (
      <div className="min-h-screen pt-16 bg-background flex items-center justify-center">
        <div className="max-w-lg mx-auto px-4 sm:px-6 text-center py-20">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(201,168,76,0.15)" }}>
            <Video className="w-10 h-10" style={{ color: "#C9A84C" }} />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Estimate Requested!</h1>
          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
            We've received your request. A team member will send a confirmed Google Meet link to your email within 2 hours.
          </p>
          <Card className="p-6 bg-charcoal-dark border-0 text-white text-left mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Video className="w-5 h-5" style={{ color: "#C9A84C" }} />
              <span className="font-semibold">Your Meeting Link (Preview)</span>
            </div>
            <p className="text-white/60 text-sm mb-3">A personalized link will be emailed to you shortly.</p>
            <a
              href={confirmed.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-medium"
              style={{ color: "#C9A84C" }}
              data-testid="link-meet"
            >
              {confirmed.meetLink}
              <ExternalLink className="w-4 h-4" />
            </a>
          </Card>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Confirmation details sent to your email
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Hero */}
      <section className="bg-charcoal-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Badge className="mb-6" style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C", borderColor: "rgba(201,168,76,0.3)" }}>
            Free Video Estimate
          </Badge>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(201,168,76,0.15)" }}>
            <Video className="w-8 h-8" style={{ color: "#C9A84C" }} />
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-4">
            Schedule Your
            <br />
            <span style={{ color: "#C9A84C" }}>Video Estimate</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            A live Google Meet call with one of our specialists. Walk us through your space on camera and we'll give you a detailed, honest estimate — completely free.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-cream dark:bg-charcoal-light border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-10">How It Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map(({ step, title, desc }) => (
              <div key={step} className="text-center" data-testid={`how-it-works-step-${step}`}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-display text-lg font-bold text-charcoal-dark" style={{ background: "#C9A84C" }}>
                  {step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Card className="p-8 bg-card border-border">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-6 h-6" style={{ color: "#C9A84C" }} />
              <h2 className="font-display text-2xl font-bold text-foreground">Book Your Slot</h2>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                className="space-y-6"
                data-testid="form-schedule-estimate"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Smith" {...field} data-testid="input-schedule-name" />
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
                          <Input placeholder="(215) 303-4494" type="tel" {...field} data-testid="input-schedule-phone" />
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
                      <FormLabel>Email Address * (Google Meet link sent here)</FormLabel>
                      <FormControl>
                        <Input placeholder="jane@example.com" type="email" {...field} data-testid="input-schedule-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-schedule-service">
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

                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Date *</FormLabel>
                        <FormControl>
                          <Input type="date" min={minDate} {...field} data-testid="input-schedule-date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Time *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-schedule-time">
                              <SelectValue placeholder="Select a time..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((t) => (
                              <SelectItem key={t} value={t}>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-3.5 h-3.5" />
                                  {t}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Notes (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share any photos, measurements, inspiration boards, or specific details about your project..."
                          className="resize-none min-h-[100px]"
                          {...field}
                          data-testid="textarea-schedule-notes"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <Video className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#C9A84C" }} />
                  <p className="text-sm text-muted-foreground">
                    Your Google Meet link will be emailed within 2 hours of booking. Calls typically last 15–30 minutes. Have your space ready to walk through on camera.
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-semibold text-base"
                  disabled={mutation.isPending}
                  style={{ background: "#C9A84C", color: "#1C1C1E" }}
                  data-testid="button-submit-estimate"
                >
                  {mutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Scheduling...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      Schedule My Free Video Estimate
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </section>
    </div>
  );
}
