
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Bot, Send, Circle, RefreshCw, ZapIcon, XIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const { toast } = useToast();
  
  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      generateResponse(inputValue);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (query: string) => {
    let response = "";
    
    // Very simple mock responses based on keywords
    if (query.toLowerCase().includes("seo")) {
      response = "To improve your SEO, focus on using relevant keywords naturally throughout your content. Ensure your headings include target phrases, and create comprehensive, valuable content that answers user questions.";
    } else if (query.toLowerCase().includes("idea") || query.toLowerCase().includes("topic")) {
      response = "Here are some blog post ideas:\n1. '10 Ways AI is Transforming Content Creation'\n2. 'The Complete Guide to SEO in 2025'\n3. 'How to Build an Engaged Reader Community'\n4. 'Writing Techniques to Keep Readers Coming Back'";
    } else if (query.toLowerCase().includes("writer's block") || query.toLowerCase().includes("stuck")) {
      response = "Writer's block happens to everyone! Try these techniques:\n1. Free write for 10 minutes without editing\n2. Change your environment\n3. Start in the middle instead of the beginning\n4. Interview an imaginary expert on your topic";
    } else {
      response = "Thanks for your message. I'm here to help with content creation, SEO optimization, and writing suggestions. Could you provide more details about what you need help with?";
    }
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, botMessage]);
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
          <CardContent className="flex-1 flex flex-col p-0">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
            </div>

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
