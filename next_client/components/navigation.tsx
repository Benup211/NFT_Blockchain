"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useToast } from "@/hooks/use-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navigation() {
    const pathname = usePathname();
    const router = useRouter();
    const { toast } = useToast();

    //   const { user, setUser, notifications, markNotificationAsRead, clearNotifications } = useAppContext();
    const user: { name: string } | null = null;
    const notifications: any[] = [];
    const setUser = (user: any) => {};

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        toast({
            title: "Logged out successfully",
            description: "See you soon!",
        });
        router.push("/");
    };

    return (
        <header className="flex justify-center sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 md:p-0">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            Blockland
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/properties"
                            className={
                                pathname === "/properties"
                                    ? "text-foreground"
                                    : "text-foreground/60"
                            }
                        >
                            Properties
                        </Link>
                        {user && (
                            <>
                                <Link
                                    href="/dashboard"
                                    className={
                                        pathname === "/dashboard"
                                            ? "text-foreground"
                                            : "text-foreground/60"
                                    }
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/create-nft"
                                    className={
                                        pathname === "/create-nft"
                                            ? "text-foreground"
                                            : "text-foreground/60"
                                    }
                                >
                                    Create NFT
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Add search functionality here */}
                    </div>
                    <nav className="flex items-center gap-2">
                        {!user ? (
                            <>
                                <Button
                                    variant="ghost"
                                    asChild
                                    className="mr-2"
                                >
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/register">Register</Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="relative h-8 w-8 rounded-full"
                                        >
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage
                                                    src="/avatars/01.png"
                                                    // alt={user.name}
                                                />
                                                <AvatarFallback>
                                                    {/* {user.name.charAt(0)} */}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-56"
                                        align="end"
                                        forceMount
                                    >
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard">
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/profile">Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={handleLogout}
                                        >
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        )}
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    );
}
