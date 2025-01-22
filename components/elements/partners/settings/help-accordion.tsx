'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, Send } from "lucide-react";
import Link from "next/link";

const HelpAccordionItem = ({ title, content }: { title: string; content: React.ReactNode }) => (
  <AccordionItem value={title}>
    <AccordionTrigger className="text-gray-200 hover:text-white">
      {title}
    </AccordionTrigger>
    <AccordionContent className="text-gray-400">
      {content}
    </AccordionContent>
  </AccordionItem>
)

 export function HelpAccordion() {
    return (
      <Accordion type="single" collapsible className="w-full [&>*]:border-b-0">
        <AccordionItem value="support-service">
          <AccordionTrigger className="text-muted-foreground hover:text-primary-foreground">
            Support service
          </AccordionTrigger>
          <AccordionContent>

          <div className="space-y-3 p-4">
      <div className="flex items-center gap-5">
        <Phone className="w-6 h-6 text-blue-500" /> 
        <span className="text-md font-medium text-white">+38 (068) 439 2129</span>
      </div>
      <div className="flex items-center gap-5">
        <MessageSquare className="w-6 h-6 text-purple-500" /> 
        <span className="text-md font-medium  text-white">Viber: +38 (068) 439 2129</span>
      </div>
      <div className="flex items-center gap-5">
        <Send className="w-6 h-6 text-sky-500" /> 
        <span className="text-md font-medium  text-white">Telegram: @nomo_office</span>
      </div>
    </div>

    <p className="text-sm text-muted-foreground mt-3">
      Need assistance? Our support team is here to help you with any questions or issues.
    </p>

    <Button
      variant="link"
      className=" text-white hover:text-primary-foreground p-0 h-auto text-sm mt-2"
      asChild
    >
      <Link href="#">Contact support</Link>
    </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="privacy-policy">
          <AccordionTrigger className="text-muted-foreground hover:text-primary-foreground">
            Privacy policy
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground mb-2">
              Learn about how we collect, use, and protect your personal information.
            </p>
            <Button variant="link" className="text-muted-foreground hover:text-primary-foreground p-0 h-auto text-sm" asChild>
              <Link href="#">Read privacy policy</Link>
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="terms-of-use">
          <AccordionTrigger className="text-muted-foreground hover:text-primary-foreground">
            Terms of use
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground mb-2">
              Review our terms of service to understand your rights and responsibilities.
            </p>
            <Button variant="link" className="text-muted-foreground hover:text-primary-foreground p-0 h-auto text-sm" asChild>
              <Link href="#">View terms of use</Link>
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  
  