
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiAssistant from "@/components/chatbot/AiAssistant";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Check, AlertCircle, Bot, ZapIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const CreatePost = () => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const [activeTab, setActiveTab] = useState("write");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [post, setPost] = useState({
    title: editId ? "Getting Started with AI Writing" : "",
    content: editId ? "This is a sample content for the edited post. AI writing tools have revolutionized content creation..." : "",
    excerpt: editId ? "Learn how to leverage AI to improve your writing process and create better content faster." : "",
    category: editId ? "AI" : "",
    tags: editId ? "AI, Writing, Content Creation" : "",
    coverImage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setPost(prev => ({ ...prev, category: value }));
  };

  const handleSave = () => {
    if (!post.title || !post.content || !post.category) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields.",
      });
      return;
    }

    // In a real app, this would save to an API
    toast({
      title: editId ? "Post updated" : "Post created",
      description: editId 
        ? "Your post has been updated successfully." 
        : "Your post has been created successfully.",
    });
    
    navigate("/posts");
  };

  const handleAskAI = () => {
    toast({
      title: "AI Suggestion",
      description: "Based on your content, consider adding more specific examples to engage readers.",
    });
  };

  const handleSEOCheck = () => {
    toast({
      title: "SEO Analysis",
      description: "Your content has a good keyword density. Consider adding more headings for better structure.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 md:px-6 py-6 md:py-10">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {editId ? "Edit Post" : "Create New Post"}
              </h1>
              <p className="text-muted-foreground">
                {editId
                  ? "Update your existing blog post"
                  : "Write a new blog post with AI assistance"}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate("/posts")}>
                Cancel
              </Button>
              <Button
                className="bg-brand hover:bg-brand-dark"
                onClick={handleSave}
              >
                {editId ? "Update Post" : "Publish Post"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Post Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        placeholder="Enter a catchy title..."
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        name="excerpt"
                        value={post.excerpt}
                        onChange={handleChange}
                        placeholder="Brief summary of your post (appears in previews)"
                        className="mt-1 resize-none"
                        rows={2}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-0">
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="w-full grid grid-cols-2">
                      <TabsTrigger value="write">Write</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="write" className="p-6">
                      <Textarea
                        id="content"
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                        placeholder="Write your blog post content here..."
                        className="min-h-[300px] resize-none"
                      />
                      <div className="flex justify-end gap-3 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleSEOCheck}
                        >
                          <ZapIcon className="mr-2 h-4 w-4" />
                          SEO Check
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleAskAI}>
                          <Bot className="mr-2 h-4 w-4" />
                          Ask AI for Help
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="preview" className="p-6">
                      {post.content ? (
                        <div className="prose max-w-none">
                          <h1>{post.title}</h1>
                          <p>{post.content}</p>
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground py-12">
                          <AlertCircle className="mx-auto h-12 w-12 opacity-20" />
                          <p className="mt-2">No content to preview</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={post.category}
                        onValueChange={handleCategoryChange}
                      >
                        <SelectTrigger id="category" className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AI">AI</SelectItem>
                          <SelectItem value="SEO">SEO</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Writing">Writing</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        name="tags"
                        value={post.tags}
                        onChange={handleChange}
                        placeholder="Separate tags with commas"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Cover Image</Label>
                      <div className="mt-1 border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                        <Image className="h-8 w-8 mx-auto text-muted-foreground/50" />
                        <p className="text-sm text-muted-foreground mt-2">
                          Drag & drop an image or
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                        >
                          Browse Files
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">AI Suggestions</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-1" />
                      <p className="text-sm">
                        Add more subheadings to improve readability
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-1" />
                      <p className="text-sm">
                        Include specific examples to engage readers
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-1" />
                      <p className="text-sm">
                        Add a clear call-to-action at the end
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => {
                        toast({
                          title: "AI Analysis",
                          description: "Full content analysis complete. New suggestions available.",
                        });
                      }}
                    >
                      <ZapIcon className="mr-2 h-4 w-4" />
                      Analyze Content
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default CreatePost;
