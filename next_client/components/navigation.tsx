"use client";

import React, { useEffect, useState } from "react";
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
import { useAuthStore } from "@/state/auth-state";
import { Menu, X } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

export function Navigation() {
    const pathname = usePathname();
    const router = useRouter();
    const { toast } = useToast();
    const {
        user,
        setUser,
        isAuthenticated,
        getUser,
        setAuthenticated,
        setLoading,
        isLoading,
        logout,
    } = useAuthStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        try {
            logout().finally(() => {
                setUser({
                    uuid: "",
                    email: "",
                    first_name: "",
                    last_name: "",
                    blockchainPublicKey: "",
                });
                toast({
                    title: "Logged out successfully",
                    description: "See you soon!",
                });
                router.push("/");
            });
        } catch (err) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        try {
            getUser().finally(() => {
                setLoading(false);
            });
        } catch (err) {
            console.log("error"+err);
        }
    }, [getUser]);

    const NavLinks = () => (
        <>
            <Link
                href="/properties"
                className={
                    pathname === "/properties"
                        ? "text-foreground font-semibold"
                        : "text-foreground/60 hover:text-foreground transition-colors"
                }
            >
                Properties
            </Link>
            {isAuthenticated && (
                <>
                    <Link
                        href="/dashboard"
                        className={
                            pathname === "/dashboard"
                                ? "text-foreground font-semibold"
                                : "text-foreground/60 hover:text-foreground transition-colors"
                        }
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/create-nft"
                        className={
                            pathname === "/create-nft"
                                ? "text-foreground font-semibold"
                                : "text-foreground/60 hover:text-foreground transition-colors"
                        }
                    >
                        Create NFT
                    </Link>
                </>
            )}
        </>
    );

    if (isLoading) {
        return <NavigationSkeleton />;
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center">
                    <div className="flex items-center flex-1">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 mr-6"
                        >
                            <span className="font-bold text-lg">Blockland</span>
                        </Link>
                        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                            <NavLinks />
                        </nav>
                    </div>

                    <div className="flex items-center space-x-4 ml-auto">
                        {!isAuthenticated ? (
                            <div className="hidden md:flex items-center space-x-2">
                                <Button variant="ghost" asChild>
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/register">Register</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="hidden md:block">
                                <UserMenu
                                    user={user}
                                    handleLogout={handleLogout}
                                />
                            </div>
                        )}
                        <ModeToggle />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden ml-auto"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-[300px] sm:w-[400px]"
                            >
                                <SheetTitle>BlockLand</SheetTitle>
                                <nav className="flex flex-col space-y-4 mt-4">
                                    <NavLinks />
                                    {!isAuthenticated ? (
                                        <div className="flex flex-col space-y-2">
                                            <Button asChild variant="outline">
                                                <Link href="/login">Login</Link>
                                            </Button>
                                            <Button asChild>
                                                <Link href="/register">
                                                    Register
                                                </Link>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col space-y-2">
                                            <Link
                                                href="/dashboard"
                                                className="font-medium"
                                            >
                                                Dashboard
                                            </Link>
                                            <Button
                                                onClick={handleLogout}
                                                variant="destructive"
                                            >
                                                Log out
                                            </Button>
                                        </div>
                                    )}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}

interface User {
    uuid: string;
    email: string;
    first_name: string;
    last_name: string;
    blockchainPublicKey: string;
}

function UserMenu({
    user,
    handleLogout,
}: {
    user: User;
    handleLogout: () => void;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>
                            {user?.first_name.charAt(0)||""}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function NavigationSkeleton() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Skeleton className="h-8 w-24" />
                    </div>
                    <nav className="hidden md:flex items-center space-x-6">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-20" />
                    </nav>
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8" />
                    </div>
                </div>
            </div>
        </header>
    );
}
