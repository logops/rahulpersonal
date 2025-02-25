import { useQuery } from "@tanstack/react-query";
import { Article } from "@shared/schema";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import PageNav from "@/components/page-nav";

export default function Writing() {
  const { data: articles, isLoading } = useQuery<Article[]>({ 
    queryKey: ['/api/articles']
  });

  return (
    <>
      <div className="h-40 bg-[#004225] absolute top-0 left-0 w-full" />
      <div className="max-w-4xl mx-auto relative">
        <PageNav />
        <h1 className="text-3xl font-poppins font-bold mb-8 text-white pt-16">Writing</h1>

        <div className="bg-background rounded-t-3xl -mt-4 p-8">
          {isLoading ? (
            <div>Loading articles...</div>
          ) : (
            <div className="space-y-6">
              {articles?.map(article => (
                <Card key={article.title}>
                  <CardHeader>
                    <CardTitle className="font-poppins">{article.title}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(article.date), 'MMMM d, yyyy')}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{article.summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}