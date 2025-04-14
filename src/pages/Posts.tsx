
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiAssistant from "@/components/chatbot/AiAssistant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Calendar, FileEdit, Search, ThumbsUp, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();
  
  // Sample posts data
  const posts = [
    { 
      id: 1, 
      title: "Getting Started with AI Writing", 
      excerpt: "Learn how to leverage AI to improve your writing process and create better content faster.",
      date: "May 15, 2025", 
      views: 254,
      likes: 47,
      comments: 12,
      category: "AI"
    },
    { 
      id: 2, 
      title: "SEO Best Practices for 2025", 
      excerpt: "The latest search engine optimization techniques to help your content reach a wider audience.",
      date: "May 10, 2025", 
      views: 1854,
      likes: 132,
      comments: 28,
      category: "SEO"
    },
    { 
      id: 3, 
      title: "How to Grow Your Blog Audience", 
      excerpt: "Proven strategies to attract more readers and build a loyal following for your blog.",
      date: "May 3, 2025", 
      views: 3021,
      likes: 215,
      comments: 47,
      category: "Marketing"
    },
    { 
      id: 4, 
      title: "Content Marketing Trends", 
      excerpt: "Explore the latest trends shaping the future of content marketing and how to use them.",
      date: "Apr 28, 2025", 
      views: 1241,
      likes: 86,
      comments: 19,
      category: "Marketing"
    },
    { 
      id: 5, 
      title: "Writing Compelling Headlines", 
      excerpt: "Learn the art of crafting headlines that grab attention and drive more clicks to your content.",
      date: "Apr 20, 2025", 
      views: 1876,
      likes: 153,
      comments: 32,
      category: "Writing"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 md:px-6 py-6 md:py-10">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Posts</h1>
              <p className="text-muted-foreground">Manage and analyze your blog content</p>
            </div>
            <Button onClick={() => navigate("/create-post")} className="bg-brand hover:bg-brand-dark">
              <FileEdit className="mr-2 h-4 w-4" />
              Create New Post
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
                className="pl-9"
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="ai">AI</SelectItem>
                  <SelectItem value="seo">SEO</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-[200px]">
              <Select defaultValue="newest">
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl hover:text-brand cursor-pointer" onClick={() => navigate(`/posts/${post.id}`)}>
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-xs flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3" /> {post.date}
                        <span className="inline-flex items-center gap-1">
                          <BookOpen className="h-3 w-3" /> {post.views} views
                        </span>
                      </CardDescription>
                    </div>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="border-t pt-3 flex justify-between">
                  <div className="flex space-x-4">
                    <div className="flex items-center gap-1 text-sm">
                      <ThumbsUp className="h-4 w-4" /> {post.likes}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <MessageSquare className="h-4 w-4" /> {post.comments}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/posts/${post.id}`)}>
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/create-post?edit=${post.id}`)}>
                      Edit
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default Posts;
