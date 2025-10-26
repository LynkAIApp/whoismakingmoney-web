'use client';

import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTAScrollButtonProps {
  children: React.ReactNode;
}

export function CTAScrollButton({ children }: CTAScrollButtonProps) {
  const handleScroll = () => {
    const element = document.getElementById('case-studies');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Button 
      size="lg" 
      variant="outline" 
      className="w-full sm:w-auto text-base px-8 py-6"
      onClick={handleScroll}
    >
      <Target className="w-5 h-5 mr-2" />
      {children}
    </Button>
  );
}
