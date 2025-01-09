import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Aaryash Shakya",
        role: "Real Estate Investor",
        content:
            "NFT Real Estate has revolutionized the way I invest in properties. The platform is intuitive and the blockchain integration provides unparalleled security.",
    },
    {
        name: "Aditya Shrestha",
        role: "Property Developer",
        content:
            "As a developer, I've found NFT Real Estate to be a game-changer. It's opened up new avenues for funding and has streamlined the entire development process.",
    },
    {
        name: "Kaushal Kumar Mishra",
        role: "First-time Investor",
        content:
            "I was hesitant about real estate investing, but NFT Real Estate made it accessible and less intimidating. Their AI tools have been incredibly helpful in my decision-making process.",
    },
];

export function TestimonialsSection() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                    What Our Users Say
                </h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="flex flex-col h-full">
                            <CardHeader className="flex items-center">
                                <Avatar className="h-10 w-10 mr-4">
                                    <AvatarFallback>
                                        {testimonial.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="flex mb-4 justify-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-5 w-5 text-yellow-400 fill-current"
                                        />
                                    ))}
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    {testimonial.content}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
