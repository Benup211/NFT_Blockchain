"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/state/auth-state";
import { MetaLogo } from "@/components/metamask/logo";
import { ethers } from "ethers";
import { Loader } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { toast } = useToast();
    const { isLoading, loginUser, loginByBlockchainPublicKey,setLoading } = useAuthStore();

    const connectToMeta = async () => {
        if (window.ethereum == undefined) {
            toast({
                title: "Error",
                description:
                    "Metamask wallet is not installed in your browser. Please install it and try again.",
                variant: "destructive",
            });
            return;
        }
        try {
            const providerMeta = new ethers.BrowserProvider(window.ethereum);
            const accounts = await providerMeta.send("eth_requestAccounts", []);
            const accountSignin = accounts[0];
            if (accountSignin) {
                await loginByBlockchainPublicKey(accountSignin).finally(() => {
                    const loggedInUser = useAuthStore.getState().user;
                    toast({
                        title: "Login successfully",
                        description: `Welcome back ${loggedInUser.first_name}!`,
                    });
                    setLoading(false);
                    router.push("/dashboard");
                });
            }
        } catch (error) {
            toast({
                title: "Login failed",
                description: `${(error as any).message}`,
                variant: "destructive",
            });
            return;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email == "" || password == "") {
            toast({
                title: "Login failed",
                description: "Please enter email and password",
                variant: "destructive",
            });
            return;
        }
        try {
            await loginUser(email, password).finally(() => {
                const loggedInUser = useAuthStore.getState().user;
                toast({
                    title: "Login successfully",
                    description: `Welcome back ${loggedInUser.first_name}!`,
                });
            });
            router.push("/dashboard");
        } catch (error) {
            toast({
                title: "Login failed",
                description: `${(error as any).message}`,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="container mx-auto flex h-screen items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    disabled={isLoading}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    disabled={isLoading}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <Button className="mt-4 w-full" type="submit">
                            {isLoading ? (
                                <Loader className="w-6 h-6 animate-spin  mx-auto" />
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </form>
                    <p className="flex justify-center items-center my-2">or</p>
                    <Button
                        onClick={() => {
                            connectToMeta();
                        }}
                        type="button"
                        className="w-full flex justify-center items-center"
                        variant={"outline"}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader className="w-6 h-6 animate-spin  mx-auto" />
                        ) : (
                            <p> Connect With MetaMask</p>
                        )}
                        <MetaLogo />
                    </Button>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/register")}
                    >
                        Create Account
                    </Button>
                    <Link
                        href="/forgot-password"
                        className="text-sm text-muted-foreground hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
function awaittoast(arg0: { title: string; description: string }) {
    throw new Error("Function not implemented.");
}
