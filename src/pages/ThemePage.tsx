
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiAssistant from "@/components/chatbot/AiAssistant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Palette, MoveHorizontal, CheckCircle, Layout, Type, Sparkles, SunMoon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ThemePage = () => {
  const { toast } = useToast();
  const [primaryColor, setPrimaryColor] = useState("#9b87f5");
  const [layout, setLayout] = useState("boxed");
  const [font, setFont] = useState("inter");
  const [darkMode, setDarkMode] = useState(false);

  const handleSaveTheme = () => {
    toast({
      title: "Theme updated",
      description: "Your theme preferences have been saved successfully.",
    });
  };

  const colorPresets = [
    { name: "Purple (Default)", value: "#9b87f5", className: "bg-[#9b87f5]" },
    { name: "Blue", value: "#3b82f6", className: "bg-[#3b82f6]" },
    { name: "Green", value: "#10b981", className: "bg-[#10b981]" },
    { name: "Rose", value: "#f43f5e", className: "bg-[#f43f5e]" },
    { name: "Amber", value: "#f59e0b", className: "bg-[#f59e0b]" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-4 md:px-6 py-6 md:py-10">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Appearance Settings</h1>
            <p className="text-muted-foreground">Customize the look and feel of your blog</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    <span>Theme Settings</span>
                  </CardTitle>
                  <CardDescription>
                    Customize your blog's appearance to match your style
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="colors">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="colors">Colors</TabsTrigger>
                      <TabsTrigger value="layout">Layout</TabsTrigger>
                      <TabsTrigger value="typography">Typography</TabsTrigger>
                    </TabsList>
                    <TabsContent value="colors" className="pt-6 space-y-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Primary Color</h3>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {colorPresets.map((color) => (
                              <div 
                                key={color.value} 
                                className="flex flex-col items-center"
                              >
                                <button
                                  type="button"
                                  onClick={() => setPrimaryColor(color.value)}
                                  className={`h-12 w-full rounded-md ${color.className} relative`}
                                >
                                  {primaryColor === color.value && (
                                    <CheckCircle className="absolute inset-0 m-auto h-6 w-6 text-white" />
                                  )}
                                </button>
                                <span className="text-xs mt-1">{color.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-2">Custom Color</h3>
                          <div className="flex items-center space-x-2">
                            <div
                              className="h-10 w-10 rounded-md border"
                              style={{ backgroundColor: primaryColor }}
                            ></div>
                            <Input
                              type="text"
                              value={primaryColor}
                              onChange={(e) => setPrimaryColor(e.target.value)}
                              className="w-[120px]"
                            />
                          </div>
                        </div>
                        <div className="pt-4">
                          <h3 className="text-sm font-medium mb-2">Dark Mode</h3>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="dark-mode"
                              checked={darkMode}
                              onCheckedChange={setDarkMode}
                            />
                            <Label htmlFor="dark-mode" className="cursor-pointer">
                              <div className="flex items-center gap-2">
                                <SunMoon className="h-4 w-4" />
                                <span>Enable dark mode</span>
                              </div>
                            </Label>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="layout" className="pt-6">
                      <div>
                        <h3 className="text-sm font-medium mb-3">Layout Style</h3>
                        <RadioGroup
                          defaultValue={layout}
                          value={layout}
                          onValueChange={setLayout}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="boxed" id="boxed" />
                            <Label htmlFor="boxed" className="cursor-pointer">
                              <div className="flex items-center gap-2">
                                <Layout className="h-4 w-4" />
                                <span>Boxed</span>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="wide" id="wide" />
                            <Label htmlFor="wide" className="cursor-pointer">
                              <div className="flex items-center gap-2">
                                <MoveHorizontal className="h-4 w-4" />
                                <span>Wide</span>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="full" id="full" />
                            <Label htmlFor="full" className="cursor-pointer">
                              <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4" />
                                <span>Full Width</span>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-4 mt-6">
                        <h3 className="text-sm font-medium mb-2">Layout Options</h3>
                        <div className="flex items-center space-x-2">
                          <Switch id="sidebar" defaultChecked />
                          <Label htmlFor="sidebar">Show sidebar on post pages</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="featured-image" defaultChecked />
                          <Label htmlFor="featured-image">Display featured images</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="author" defaultChecked />
                          <Label htmlFor="author">Show author details</Label>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="typography" className="pt-6">
                      <div>
                        <h3 className="text-sm font-medium mb-3">Font Family</h3>
                        <RadioGroup
                          defaultValue={font}
                          value={font}
                          onValueChange={setFont}
                          className="grid grid-cols-1 gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="inter" id="inter" />
                            <Label htmlFor="inter" className="cursor-pointer">
                              <div className="flex items-center gap-2">
                                <Type className="h-4 w-4" />
                                <span className="font-['Inter']">Inter (Default)</span>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="montserrat" id="montserrat" />
                            <Label htmlFor="montserrat" className="cursor-pointer">
                              <div className="flex items-center gap-2">
                                <Type className="h-4 w-4" />
                                <span className="font-['Montserrat']">Montserrat</span>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="roboto" id="roboto" />
                            <Label htmlFor="roboto" className="cursor-pointer">
                              <div className="flex items-center gap-2">
                                <Type className="h-4 w-4" />
                                <span>Roboto</span>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="merriweather" id="merriweather" />
                            <Label htmlFor="merriweather" className="cursor-pointer">
                              <div className="flex items-center gap-2">
                                <Type className="h-4 w-4" />
                                <span>Merriweather</span>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-4 mt-6">
                        <h3 className="text-sm font-medium mb-2">Typography Options</h3>
                        <div className="flex items-center space-x-2">
                          <Switch id="serif-headings" />
                          <Label htmlFor="serif-headings">Use serif font for headings</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="larger-text" />
                          <Label htmlFor="larger-text">Increase base font size</Label>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    See how your theme will look
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <div 
                      className="h-8 flex items-center px-3"
                      style={{ 
                        backgroundColor: darkMode ? "#2d2d2d" : "#f8f8f8",
                        borderBottom: `1px solid ${darkMode ? "#444" : "#e2e2e2"}`
                      }}
                    >
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    <div 
                      className={`p-4 ${font === "montserrat" ? "font-['Montserrat']" : font === "inter" ? "font-['Inter']" : ""}`}
                      style={{ 
                        backgroundColor: darkMode ? "#1a1a1a" : "#ffffff",
                        color: darkMode ? "#e0e0e0" : "#333333"
                      }}
                    >
                      <div 
                        className="h-8 w-40 rounded mb-3" 
                        style={{ backgroundColor: primaryColor }}
                      ></div>
                      <div className="space-y-2">
                        <div 
                          className="h-4 w-full rounded" 
                          style={{ backgroundColor: darkMode ? "#333" : "#eaeaea" }}
                        ></div>
                        <div 
                          className="h-4 w-3/4 rounded" 
                          style={{ backgroundColor: darkMode ? "#333" : "#eaeaea" }}
                        ></div>
                        <div 
                          className="h-4 w-5/6 rounded" 
                          style={{ backgroundColor: darkMode ? "#333" : "#eaeaea" }}
                        ></div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <div 
                          className="h-6 w-16 rounded"
                          style={{ backgroundColor: primaryColor }}
                        ></div>
                        <div 
                          className="h-6 w-16 rounded"
                          style={{ backgroundColor: darkMode ? "#333" : "#eaeaea" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Button onClick={handleSaveTheme} className="w-full bg-brand hover:bg-brand-dark">
                  Save Theme Settings
                </Button>
                <Button variant="outline" className="w-full">
                  Reset to Defaults
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
};

export default ThemePage;
