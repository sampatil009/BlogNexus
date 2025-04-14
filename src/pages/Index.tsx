
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import Footer from "@/components/Footer";
import { PenLine, Lightbulb, ZapIcon, Bot, Shield } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const navigate = useNavigate();

  // Temporary mock login for demo
  const handleSuccessfulAuth = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row py-10 md:py-20 gap-12">
          <div className="flex-1 space-y-8 md:mt-8">
            <div className="space-y-2">
              <h1 className="hero-text">
                <span className="gradient-text">ScribeAI</span> <br />
                Elevate Your Content
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px]">
                The AI-powered blogging platform that helps you create engaging, 
                SEO-optimized content with intelligent assistance every step of the way.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
              <div className="flex gap-4">
                <div className="mt-1">
                  <PenLine className="h-6 w-6 text-brand" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Smart Content Creation</h3>
                  <p className="text-muted-foreground">
                    AI-powered writing assistance to help you craft the perfect blog post
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1">
                  <ZapIcon className="h-6 w-6 text-brand" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">SEO Optimization</h3>
                  <p className="text-muted-foreground">
                    Get real-time suggestions to improve your content's search visibility
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1">
                  <Bot className="h-6 w-6 text-brand" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">AI Assistant</h3>
                  <p className="text-muted-foreground">
                    Chat with our AI to brainstorm ideas or overcome writer's block
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1">
                  <Shield className="h-6 w-6 text-brand" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Spam Protection</h3>
                  <p className="text-muted-foreground">
                    Automatically detect and filter spam comments on your posts
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 hidden md:block">
              <Button size="lg" variant="default" className="bg-brand hover:bg-brand-dark">
                Learn More
              </Button>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-auto md:mx-0">
            <div className="bg-card border rounded-xl shadow-sm p-6 md:p-8 w-full">
              <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 w-full mb-6">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                  <SignInForm onSuccess={handleSuccessfulAuth} />
                </TabsContent>
                <TabsContent value="signup">
                  <SignUpForm onSuccess={() => setActiveTab("signin")} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
