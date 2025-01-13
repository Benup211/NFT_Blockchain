"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <Image
                src="/bg.avif"
                alt="Modern cityscape at night"
                fill 
                style={{ objectFit: "cover" }}
                quality={100}
                priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative z-10 container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center text-white">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Revolutionize Real Estate with NFTs
                    </motion.h1>
                    <motion.p
                        className="text-xl mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Discover, invest, and trade in tokenized properties with
                        ease and security.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Button
                            asChild
                            size="lg"
                            className="mr-4 bg-white text-black hover:bg-gray-200"
                        >
                            <Link href="/properties">Explore Properties</Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            className="border-white bg-white text-black hover:bg-gray-400 "
                        >
                            <Link href="#">Learn More</Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
