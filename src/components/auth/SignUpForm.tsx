
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";

interface SignUpFormProps {
  onSuccess: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast({
        title: "Please agree to the terms",
        description: "You must agree to the terms of service to create an account.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Mock registration - would connect to backend
    setTimeout(() => {
      setIsLoading(false);
      
      if (name && email && password) {
        toast({
          title: "Registration successful!",
          description: "Your account has been created. Please sign in.",
        });
        onSuccess();
      } else {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email-signup">Email</Label>
        <Input
          id="email-signup"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password-signup">Password</Label>
        <div className="relative">
          <Input
            id="password-signup"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-8 w-8"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Password must be at least 8 characters long
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={agreedToTerms}
          onCheckedChange={() => setAgreedToTerms(!agreedToTerms)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the{" "}
          <a href="#" className="text-brand hover:underline">
            terms of service
          </a>{" "}
          and{" "}
          <a href="#" className="text-brand hover:underline">
            privacy policy
          </a>
        </label>
      </div>

      <Button
        type="submit"
        className="w-full bg-brand hover:bg-brand-dark"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
      
      <div className="text-center text-sm text-muted-foreground mt-6">
        <p>
          Already have an account?{" "}
          <a href="#" className="text-brand hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
