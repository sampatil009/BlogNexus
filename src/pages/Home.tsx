
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiAssistant from "@/components/chatbot/AiAssistant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileEdit, BarChart3, MessageSquare, Award, TrendingUp } from "lucide-react";

const Home = () => {
  // Sample data for dashboard
  const recentPosts = [
    { id: 1, title: "Getting Started with AI Writing", date: "2 days ago", views: 254 },
    { id: 2, title: "SEO Best Practices for 2025", date: "1 week ago", views: 1854 },
    { id: 3, title: "How to Grow Your Blog Audience", date: "2 weeks ago", views: 3021 },
  ];

  const stats = [
    { title: "Total Posts", value: 24, icon: BookOpen, trend: "+3 this month" },
    { title: "Total Views", value: "12.5K", icon: TrendingUp, trend: "+18% vs last month" },
    { title: "Comments", value: 284, icon: MessageSquare, trend: "42 new this week" },
    { title: "Avg. Engagement", value: "4.8", icon: Award, trend: "Top 10%" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 md:px-6 py-6 md:py-10">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to ScribeAI</h1>
            <p className="text-muted-foreground">Your AI-powered blogging dashboard</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-brand" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
                <CardDescription>
                  Your most recent blog posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between border-b pb-4 last:border-none last:pb-0">
                      <div>
                        <h3 className="font-medium">{post.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">
                            Published {post.date}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            • {post.views} views
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button className="w-full bg-brand hover:bg-brand-dark">
                    <FileEdit className="mr-2 h-4 w-4" />
                    Create New Post
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse All Posts
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Review Comments
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
                <div className="bg-muted/50 rounded-lg p-4 mt-4">
                  <h4 className="font-medium text-sm mb-2">AI Tip</h4>
                  <p className="text-sm text-muted-foreground">
                    Try asking the AI Assistant for help with content ideas, SEO tips, or to improve your writing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default Home;
