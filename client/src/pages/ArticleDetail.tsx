import { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock, ArrowRight, BookOpen } from "lucide-react";
import type { Article } from "@shared/schema";

export default function ArticleDetail() {
  const [, params] = useRoute("/articles/:slug");
  const slug = params?.slug;

  const { data: article, isLoading, isError } = useQuery<Article>({
    queryKey: ["/api/articles", slug],
    queryFn: () => fetch(`/api/articles/${slug}`).then((r) => r.json()),
    enabled: !!slug,
  });

  const { data: allArticles } = useQuery<Article[]>({ queryKey: ["/api/articles"] });
  const related = allArticles
    ?.filter((a) => a.slug !== slug && a.category === article?.category)
    .slice(0, 2);
  const suggestedArticles = allArticles?.filter((a) => a.slug !== slug).slice(0, 3);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | A-Team Repair Solutions`;
    } else if (isError) {
      document.title = "Article Not Found | A-Team Repair Solutions";
    }
  }, [article, isError]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <Skeleton className="h-4 w-24 mb-8" />
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full mb-3" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="min-h-screen pt-16 bg-background">
        <section className="bg-charcoal-dark text-white py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(201,168,76,0.15)" }}>
              <BookOpen className="w-8 h-8" style={{ color: "#C9A84C" }} />
            </div>
            <h1 className="font-display text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-white/70 text-lg mb-8">
              We couldn't find the article you're looking for. It may have been moved or no longer exists.
            </p>
            <Link href="/articles">
              <Button
                style={{ background: "#C9A84C", color: "#1C1C1E" }}
                className="font-semibold"
                data-testid="button-back-to-articles"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Browse All Articles
              </Button>
            </Link>
          </div>
        </section>

        {suggestedArticles && suggestedArticles.length > 0 && (
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
                You Might Be Interested In
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {suggestedArticles.map((a) => (
                  <Link key={a.id} href={`/articles/${a.slug}`} className="block group" data-testid={`suggested-article-${a.id}`}>
                    <Card className="p-5 h-full bg-card border-border hover-elevate transition-all duration-200">
                      <Badge variant="outline" className="text-xs mb-3">{a.category}</Badge>
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {a.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                      <div className="mt-3 flex items-center gap-1 text-sm font-medium" style={{ color: "#C9A84C" }}>
                        Read <ArrowRight className="w-4 h-4" />
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-background">
      {/* Hero */}
      <section className="bg-charcoal-dark text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/articles" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors" data-testid="link-back-articles">
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <Badge style={{ background: "rgba(201,168,76,0.2)", color: "#C9A84C", borderColor: "rgba(201,168,76,0.3)" }}>
              {article.category}
            </Badge>
            {article.featured && <Badge variant="secondary">Featured</Badge>}
            <div className="flex items-center gap-1 text-white/50 text-sm">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime} min read
            </div>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">{article.excerpt}</p>
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/60">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-a:text-primary"
            data-testid="article-content"
            dangerouslySetInnerHTML={{
              __html: article.content
                .replace(/^## (.+)$/gm, '<h2 class="font-display">$1</h2>')
                .replace(/^### (.+)$/gm, '<h3 class="font-display">$1</h3>')
                .replace(/^\*\*(.+)\*\*$/gm, '<p><strong>$1</strong></p>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/^- (.+)$/gm, '<li>$1</li>')
                .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
                .replace(/\n\n/g, '</p><p>')
                .replace(/^(?!<[hup])/gm, '')
            }}
          />

          {/* CTA */}
          <div className="mt-16 p-8 rounded-lg bg-charcoal-dark text-white text-center">
            <h3 className="font-display text-2xl font-bold mb-3">
              Ready to Get Started?
            </h3>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Our team can help you bring these ideas to life. Schedule a free video estimate today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/schedule">
                <Button style={{ background: "#C9A84C", color: "#1C1C1E" }} className="font-semibold" data-testid="button-article-cta-schedule">
                  Schedule Free Estimate
                </Button>
              </Link>
              <Link href="/visualizer">
                <Button variant="outline" className="text-white border-white/30" data-testid="button-article-cta-visualizer">
                  Try AI Visualizer
                </Button>
              </Link>
            </div>
          </div>

          {/* Related */}
          {related && related.length > 0 && (
            <div className="mt-16">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">Related Articles</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {related.map((a) => (
                  <Link key={a.id} href={`/articles/${a.slug}`} className="block p-6 rounded-lg border border-border bg-card hover-elevate transition-all group" data-testid={`related-article-${a.id}`}>
                    <Badge variant="outline" className="text-xs mb-3">{a.category}</Badge>
                    <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{a.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                    <div className="mt-3 flex items-center gap-1 text-sm font-medium" style={{ color: "#C9A84C" }}>
                      Read <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
