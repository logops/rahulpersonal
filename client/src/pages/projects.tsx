import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PageNav from "@/components/page-nav";

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects']
  });

  return (
    <>
      <div className="h-40 bg-[#004225] absolute top-0 left-0 w-full" />
      <div className="max-w-4xl mx-auto relative">
        <PageNav />
        <h1 className="text-3xl font-poppins font-bold mb-8 text-white pt-16">Projects</h1>

        <div className="bg-background rounded-t-3xl -mt-4 p-8">
          {isLoading ? (
            <div>Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects?.map(project => (
                <Card key={project.title}>
                  <CardHeader>
                    <CardTitle className="font-poppins">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{project.description}</p>
                    {project.url && (
                      <a 
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#004225] hover:text-[#006537] transition-colors mt-4 inline-block font-medium"
                      >
                        View Project →
                      </a>
                    )}
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