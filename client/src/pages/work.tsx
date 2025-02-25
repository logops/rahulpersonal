import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import PageNav from "@/components/page-nav";

export default function Work() {
  return (
    <>
      <div className="h-40 bg-[#004225] absolute top-0 left-0 w-full" />
      <div className="max-w-4xl mx-auto relative">
        <PageNav />
        <h1 className="text-3xl font-poppins font-bold mb-8 text-white pt-16">Work</h1>

        <div className="bg-background rounded-t-3xl -mt-4 p-8">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="about">About Me</TabsTrigger>
              <TabsTrigger value="future">Future Work</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <Card>
                <CardContent className="prose prose-slate mt-6">
                  <h2>About Me</h2>
                  <p>Content will be loaded from markdown...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="future">
              <Card>
                <CardContent className="prose prose-slate mt-6">
                  <h2>Future Work Thesis</h2>
                  <p>Content will be loaded from markdown...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resume">
              <Card>
                <CardContent className="prose prose-slate mt-6">
                  <h2>Resume</h2>
                  <p>Content will be loaded from markdown...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}