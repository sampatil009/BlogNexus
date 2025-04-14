
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Bot, Send, Circle, RefreshCw, ZapIcon, XIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      content: "Hi there! I'm your AI writing assistant from BlogNexus. How can I help you today? I can suggest content ideas, help with writer's block, optimize your SEO, and more.",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    setTimeout(() => {
      generateResponse(inputValue);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    let response = "";
    
    if (lowerQuery.includes("idea") || lowerQuery.includes("topic") || lowerQuery.includes("what should i write")) {
      const topics = [
        "10 Ways AI is Transforming Content Creation in 2025",
        "The Complete Guide to SEO in 2025: What's Changed?",
        "How to Build an Engaged Reader Community for Your Blog",
        "Writing Techniques to Keep Readers Coming Back",
        "The Psychology Behind Viral Blog Posts",
        "Creating a Content Calendar That Actually Works",
        "How to Monetize Your Blog Without Annoying Your Readers",
        "Visual Storytelling: Beyond Words in Modern Blogging",
        "Ethical Considerations for AI-Assisted Writing",
        "Finding Your Unique Voice in a Crowded Blogging Space"
      ];
      
      const randomTopics = getRandomItems(topics, 4);
      response = `Here are some blog post ideas you might like:\n\n1. "${randomTopics[0]}"\n2. "${randomTopics[1]}"\n3. "${randomTopics[2]}"\n4. "${randomTopics[3]}"\n\nWould you like more specific ideas on any of these topics?`;
    } 
    else if (lowerQuery.includes("seo") || lowerQuery.includes("keyword") || lowerQuery.includes("rank")) {
      response = "To improve your SEO, I recommend:\n\n1. Use your primary keyword in the title, first paragraph, and at least one heading\n2. Include related keywords throughout your content naturally\n3. Ensure your content is comprehensive (1500+ words for competitive topics)\n4. Use descriptive image alt text\n5. Create internal links to your other relevant content\n6. Focus on readability with short paragraphs and clear headings\n\nWould you like me to analyze a specific aspect of your SEO strategy?";
    } 
    else if (lowerQuery.includes("writer's block") || lowerQuery.includes("stuck") || lowerQuery.includes("can't write")) {
      response = "Writer's block happens to everyone! Here are some techniques to overcome it:\n\n1. Free write for 10 minutes without editing - just get words on the page\n2. Change your environment - try writing in a new location\n3. Start in the middle - you don't have to begin with the introduction\n4. Write the outline first, then fill in the sections\n5. Interview an imaginary expert on your topic\n6. Set a timer for 25 minutes and commit to writing until it goes off\n\nWhich approach would you like to try?";
    }
    else if (lowerQuery.includes("improve") || lowerQuery.includes("better") || lowerQuery.includes("enhance")) {
      response = "To enhance your content, consider:\n\n1. Add real-world examples to illustrate your points\n2. Include data and statistics to support your claims\n3. Use storytelling techniques to engage readers emotionally\n4. Incorporate multimedia elements (images, videos, infographics)\n5. Add a strong call-to-action at the end\n6. Create a compelling headline that promises value\n\nWould you like suggestions for any specific part of your content?";
    }
    else if (lowerQuery.includes("headline") || lowerQuery.includes("title")) {
      response = "Creating compelling headlines is crucial! Try these formulas:\n\n1. How to [Achieve Desired Result] Without [Negative Thing]\n2. [Number] Proven Ways to [Achieve Desired Outcome]\n3. The Ultimate Guide to [Topic]: Everything You Need to Know\n4. What Nobody Tells You About [Topic]\n5. Why [Common Belief] Is Wrong and What to Do Instead\n\nWould you like me to suggest specific headlines based on your topic?";
    }
    else {
      response = "I'm here to help with your content creation! I can:\n\n• Suggest blog post ideas and topics\n• Provide SEO optimization tips\n• Help overcome writer's block\n• Offer content improvement suggestions\n• Create compelling headlines\n• Develop content outlines\n\nWhat specific aspect of content creation can I assist you with today?";
    }
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, botMessage]);
  };

  const getRandomItems = (array: string[], count: number) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!isOpen && (
        <Button 
          className="fixed bottom-6 right-6 rounded-full p-4 h-14 w-14 bg-brand hover:bg-brand-dark shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="h-6 w-6" />
          <span className="sr-only">Open AI Assistant</span>
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[350px] md:w-[400px] h-[500px] shadow-lg flex flex-col z-50">
          <CardHeader className="border-b bg-brand text-white px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <CardTitle className="text-base font-medium">BlogNexus Assistant</CardTitle>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-brand-dark rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <ScrollArea className="flex-1 h-[calc(100%-80px)]" type="always">
              <div className="space-y-4 p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-brand text-white rounded-br-none'
                          : 'bg-muted rounded-bl-none'
                      }`}
                    >
                      <p className="whitespace-pre-line text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-lg rounded-bl-none max-w-[80%]">
                      <div className="flex items-center gap-1.5">
                        <Circle className="h-2 w-2 animate-pulse" />
                        <Circle className="h-2 w-2 animate-pulse delay-150" />
                        <Circle className="h-2 w-2 animate-pulse delay-300" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t p-3">
              <div className="relative">
                <Textarea
                  placeholder="Ask for content ideas, SEO tips, or writing help..."
                  className="min-h-12 resize-none pr-12"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  className="absolute right-1 bottom-1 h-9 w-9 p-0"
                  size="icon"
                  onClick={handleSend}
                  disabled={isLoading || !inputValue.trim()}
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <ZapIcon className="h-3 w-3 mr-1" />
                  <span>Powered by AI</span>
                </div>
                <button 
                  onClick={() => {
                    setMessages([messages[0]]);
                    toast({
                      title: "Chat cleared",
                      description: "Your conversation has been reset.",
                    });
                  }}
                  className="hover:text-foreground"
                >
                  Clear chat
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AiAssistant;
