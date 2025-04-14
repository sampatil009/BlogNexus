
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiAssistant from "@/components/chatbot/AiAssistant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Users, Clock, ArrowUp, ArrowDown } from "lucide-react";
import { 
  AreaChart, Area, BarChart as RechartsBarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from "recharts";

const Statistics = () => {
  const [dateRange, setDateRange] = useState("30days");
  
  // Sample data for charts
  const viewsData = [
    { name: "Jan", views: 4000, visitors: 2400 },
    { name: "Feb", views: 3000, visitors: 1398 },
    { name: "Mar", views: 2000, visitors: 9800 },
    { name: "Apr", views: 2780, visitors: 3908 },
    { name: "May", views: 1890, visitors: 4800 },
    { name: "Jun", views: 2390, visitors: 3800 },
    { name: "Jul", views: 3490, visitors: 4300 },
  ];

  const postsData = [
    { name: "How to Write Better Titles", views: 1200, engagement: 85 },
    { name: "SEO Best Practices", views: 1800, engagement: 92 },
    { name: "Content Marketing Trends", views: 980, engagement: 74 },
    { name: "AI Writing Tips", views: 1670, engagement: 88 },
    { name: "Growing Your Audience", views: 2100, engagement: 90 },
  ];

  const referralData = [
    { name: "Google", value: 4500 },
    { name: "Social Media", value: 3200 },
    { name: "Direct", value: 2100 },
    { name: "Other Blogs", value: 1500 },
    { name: "Newsletter", value: 980 },
  ];

  const insightsData = [
    {
      title: "Most Active Time",
      value: "2 PM - 4 PM",
      change: "+12%",
      trend: "up",
      description: "Peak engagement time for your content"
    },
    {
      title: "Popular Topic",
      value: "AI Writing",
      change: "+28%",
      trend: "up",
      description: "Based on engagement and view time"
    },
    {
      title: "Reader Retention",
      value: "73%",
      change: "+5%",
      trend: "up",
      description: "Readers who return within 7 days"
    },
    {
      title: "Average Read Time",
      value: "4m 12s",
      change: "-18s",
      trend: "down",
      description: "Average time spent per article"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 md:px-6 py-6 md:py-10">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Statistics & Analytics</h1>
              <p className="text-muted-foreground">Track your blog performance and reader engagement</p>
            </div>
            <div className="flex">
              <Tabs defaultValue={dateRange} value={dateRange} onValueChange={setDateRange} className="w-[400px]">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="7days">7 Days</TabsTrigger>
                  <TabsTrigger value="30days">30 Days</TabsTrigger>
                  <TabsTrigger value="90days">90 Days</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {insightsData.map((insight, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {insight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{insight.value}</div>
                  <div className="flex items-center mt-1">
                    <span className={`text-xs ${insight.trend === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                      {insight.trend === 'up' ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      {insight.change}
                    </span>
                    <p className="text-xs text-muted-foreground ml-2">{insight.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Traffic Overview</CardTitle>
                    <CardDescription>Views and unique visitors over time</CardDescription>
                  </div>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={viewsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="views" stroke="#8884d8" fillOpacity={1} fill="url(#colorViews)" />
                      <Area type="monotone" dataKey="visitors" stroke="#82ca9d" fillOpacity={1} fill="url(#colorVisitors)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Top Performing Posts</CardTitle>
                    <CardDescription>Posts with highest engagement</CardDescription>
                  </div>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={postsData}
                      layout="vertical"
                      margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="views" fill="#8884d8" />
                      <Bar dataKey="engagement" fill="#82ca9d" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Reader Demographics</CardTitle>
                    <CardDescription>Age and geographic distribution</CardDescription>
                  </div>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Age Distribution</h4>
                    <div className="h-6 rounded-full bg-muted overflow-hidden flex">
                      <div className="bg-blue-500 h-full" style={{ width: "15%" }}></div>
                      <div className="bg-green-500 h-full" style={{ width: "35%" }}></div>
                      <div className="bg-yellow-500 h-full" style={{ width: "25%" }}></div>
                      <div className="bg-purple-500 h-full" style={{ width: "15%" }}></div>
                      <div className="bg-pink-500 h-full" style={{ width: "10%" }}></div>
                    </div>
                    <div className="flex text-xs justify-between mt-1">
                      <span>18-24 (15%)</span>
                      <span>25-34 (35%)</span>
                      <span>35-44 (25%)</span>
                      <span>45-54 (15%)</span>
                      <span>55+ (10%)</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Top Regions</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>United States</span>
                          <span>42%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: "42%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>United Kingdom</span>
                          <span>18%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted">
                          <div className="bg-green-500 h-full rounded-full" style={{ width: "18%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Canada</span>
                          <span>12%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted">
                          <div className="bg-yellow-500 h-full rounded-full" style={{ width: "12%" }}></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Australia</span>
                          <span>8%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted">
                          <div className="bg-purple-500 h-full rounded-full" style={{ width: "8%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Traffic Sources</CardTitle>
                    <CardDescription>Where your readers are coming from</CardDescription>
                  </div>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referralData.map((source, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{source.name}</span>
                        <span>{source.value} visits</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted">
                        <div 
                          className={`h-full rounded-full ${
                            i === 0 ? "bg-blue-500" : 
                            i === 1 ? "bg-green-500" : 
                            i === 2 ? "bg-yellow-500" : 
                            i === 3 ? "bg-purple-500" : "bg-pink-500"
                          }`} 
                          style={{ width: `${(source.value / 4500) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
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

export default Statistics;
