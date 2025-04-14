
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiAssistant from "@/components/chatbot/AiAssistant";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  CheckCircle, 
  AlertTriangle, 
  Search, 
  MoreVertical,
  ThumbsUp,
  MessageCircle,
  ArrowUp,
  Shield,
  User,
  Flag,
  Trash2,
  Reply,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Comments = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  // Sample comments data
  const allComments = [
    {
      id: 1,
      author: "Alex Johnson",
      avatar: "",
      content: "Great article! I've been using these techniques for a while and they really work.",
      date: "2 hours ago",
      post: "SEO Best Practices for 2025",
      likes: 5,
      replies: 2,
      isSpam: false,
      isFlagged: false,
    },
    {
      id: 2,
      author: "Samantha Lee",
      avatar: "",
      content: "This was so helpful. I'd love to see more content about content marketing strategies.",
      date: "5 hours ago",
      post: "Content Marketing Trends",
      likes: 8,
      replies: 1,
      isSpam: false,
      isFlagged: false,
    },
    {
      id: 3,
      author: "Michael Brown",
      avatar: "",
      content: "Check out my website for more SEO tips and tricks: www.spammy-website.com",
      date: "1 day ago",
      post: "SEO Best Practices for 2025",
      likes: 0,
      replies: 0,
      isSpam: true,
      isFlagged: true,
    },
    {
      id: 4,
      author: "Emma Wilson",
      avatar: "",
      content: "I disagree with point #3. In my experience, focusing on keywords alone isn't enough anymore.",
      date: "2 days ago",
      post: "How to Grow Your Blog Audience",
      likes: 3,
      replies: 4,
      isSpam: false,
      isFlagged: false,
    },
    {
      id: 5,
      author: "James Smith",
      avatar: "",
      content: "SUBSCRIBE TO MY CHANNEL FOR FREE MARKETING TIPS!!! [link removed]",
      date: "3 days ago",
      post: "Getting Started with AI Writing",
      likes: 0,
      replies: 0,
      isSpam: true,
      isFlagged: true,
    },
    {
      id: 6,
      author: "David Chen",
      avatar: "",
      content: "I've implemented these suggestions and seen a 20% increase in traffic. Thanks for sharing!",
      date: "4 days ago",
      post: "Content Marketing Trends",
      likes: 12,
      replies: 2,
      isSpam: false,
      isFlagged: false,
    },
  ];

  const flaggedComments = allComments.filter(comment => comment.isFlagged);
  const spamComments = allComments.filter(comment => comment.isSpam);
  
  const getCommentsForTab = (tab: string) => {
    switch (tab) {
      case "flagged":
        return flaggedComments;
      case "spam":
        return spamComments;
      case "all":
      default:
        return allComments;
    }
  };

  const handleDeleteComment = (id: number) => {
    toast({
      title: "Comment deleted",
      description: "The comment has been removed successfully.",
    });
  };

  const handleMarkAsSpam = (id: number) => {
    toast({
      title: "Marked as spam",
      description: "The comment has been marked as spam and hidden from public view.",
    });
  };

  const handleApproveComment = (id: number) => {
    toast({
      title: "Comment approved",
      description: "The comment is now visible to all readers.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 md:px-6 py-6 md:py-10">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Comment Management</h1>
            <p className="text-muted-foreground">Manage and moderate comments on your blog posts</p>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Comments</CardTitle>
                  <CardDescription>
                    View and manage reader engagement
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search comments..."
                      className="pl-9 w-[250px]"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">
                    All Comments
                    <span className="ml-2 text-xs bg-muted px-1.5 py-0.5 rounded-full">
                      {allComments.length}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="flagged">
                    Flagged
                    <span className="ml-2 text-xs bg-muted px-1.5 py-0.5 rounded-full">
                      {flaggedComments.length}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="spam">
                    Spam
                    <span className="ml-2 text-xs bg-muted px-1.5 py-0.5 rounded-full">
                      {spamComments.length}
                    </span>
                  </TabsTrigger>
                </TabsList>
                <div className="mt-6">
                  {getCommentsForTab(activeTab).map((comment) => (
                    <div key={comment.id} className="py-4 border-b last:border-b-0">
                      <div className="flex justify-between">
                        <div className="flex gap-4">
                          <Avatar>
                            <AvatarImage src={comment.avatar} />
                            <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-sm">
                                {comment.author}
                                {comment.isSpam && (
                                  <Badge variant="destructive" className="ml-2 py-0 px-1.5">
                                    <Shield className="h-3 w-3 mr-1" />
                                    Spam
                                  </Badge>
                                )}
                              </h3>
                              <span className="text-xs text-muted-foreground">
                                {comment.date}
                              </span>
                            </div>
                            <p className="mt-1">{comment.content}</p>
                            <div className="mt-2 flex items-center gap-4">
                              <span className="text-xs text-muted-foreground flex items-center">
                                <MessageCircle className="h-3 w-3 mr-1" />
                                {comment.post}
                              </span>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                {comment.likes} likes
                              </span>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <ArrowUp className="h-3 w-3 mr-1" />
                                {comment.replies} replies
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleApproveComment(comment.id)}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleMarkAsSpam(comment.id)}>
                                <Flag className="h-4 w-4 mr-2" />
                                Mark as Spam
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Reply className="h-4 w-4 mr-2" />
                                Reply
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteComment(comment.id)}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comment Analysis</CardTitle>
              <CardDescription>
                AI-powered insights about comment trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <div className="mb-2">
                      <User className="h-6 w-6 text-brand" />
                    </div>
                    <div className="text-2xl font-bold">432</div>
                    <div className="text-sm text-muted-foreground text-center">Total Comments</div>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <div className="mb-2">
                      <Shield className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div className="text-2xl font-bold">24</div>
                    <div className="text-sm text-muted-foreground text-center">Spam Comments</div>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                    <div className="mb-2">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold">95.7%</div>
                    <div className="text-sm text-muted-foreground text-center">Engagement Rate</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Sentiment Analysis</h3>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="flex h-full">
                      <div className="bg-green-500 h-full" style={{ width: "65%" }}></div>
                      <div className="bg-yellow-500 h-full" style={{ width: "20%" }}></div>
                      <div className="bg-red-500 h-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-green-500">Positive (65%)</span>
                    <span className="text-yellow-500">Neutral (20%)</span>
                    <span className="text-red-500">Negative (15%)</span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">AI Spam Detection Active</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Our AI has automatically filtered 24 spam comments in the last 30 days. 
                        The AI model is constantly learning from your moderation decisions to improve accuracy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default Comments;
