import { useQuery } from "@tanstack/react-query";
import { Photo } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import PageNav from "@/components/page-nav";

export default function Photos() {
  const { data: photos, isLoading } = useQuery<Photo[]>({
    queryKey: ['/api/photos']
  });

  return (
    <>
      <div className="h-40 bg-[#004225] absolute top-0 left-0 w-full" />
      <div className="max-w-4xl mx-auto relative">
        <PageNav />
        <h1 className="text-3xl font-poppins font-bold mb-8 text-white pt-16">Photos</h1>

        <div className="bg-background rounded-t-3xl -mt-4 p-8">
          {isLoading ? (
            <div>Loading photos...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos?.map(photo => (
                <Card key={photo.src}>
                  <CardContent className="p-2">
                    <AspectRatio ratio={4/3}>
                      <img 
                        src={photo.src}
                        alt={photo.alt}
                        className="rounded-md object-cover w-full h-full"
                        loading="lazy"
                      />
                    </AspectRatio>
                    <p className="mt-2 text-sm text-center text-muted-foreground">
                      {photo.alt}
                    </p>
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