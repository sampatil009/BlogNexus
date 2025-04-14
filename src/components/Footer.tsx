
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t py-6 md:py-8">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <p className="text-lg font-semibold">
              <span className="text-brand">Blog</span>
              <span className="text-foreground">Nexus</span>
            </p>
            <p className="text-muted-foreground text-sm">
              The AI-powered blogging platform
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              About
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Features
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Pricing
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Blog
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
        
        <div className="border-t mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 BlogNexus. All rights reserved.
          </p>
          
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
