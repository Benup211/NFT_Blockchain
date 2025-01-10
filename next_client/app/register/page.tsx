"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MetaLogo } from "@/components/metamask/logo";
import { ethers } from "ethers";
import { useAuthStore } from "@/state/auth-state";
import { Loader } from "lucide-react";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [metaAccount, setMetaAccount] = useState(null);
    const router = useRouter();
    const { toast } = useToast();
    const { isLoading, registerUser } = useAuthStore();

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
        if (metaAccount != null) {
            toast({
                title: "You are already connected to MetaMask",
                description: `MetaMask connected with account: ${metaAccount}`,
            });
            return;
        }
        try {
            const providerMeta = new ethers.BrowserProvider(window.ethereum);
            const accounts = await providerMeta.send("eth_requestAccounts", []);
            const accountSignin = accounts[0];
            setMetaAccount(accountSignin);
            toast({
                title: "MetaMask Connected Successfully",
                description: `MetaMask connected successfully with account: ${accountSignin}`,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword||
            !metaAccount
        ) {
            toast({
                title: "Error",
                description: "All fields are required",
                variant: "destructive",
            });
            return;
        }
        if (password !== confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match",
                variant: "destructive",
            });
            return;
        }
        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            blockchainPublicKey: metaAccount,
        };
        try {
            await registerUser(data);
            toast({
                title: "Registered successfully",
                description: "Please log in with your new account.",
            });
            router.push("/login");
        } catch (error) {
            toast({
              title: "Registration failed",
              description: `${(error as any).message}`,
              variant: "destructive"
            });
        }
    };

    return (
        <div className="container mx-auto flex h-screen items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>
                        Create your account to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">First Name</Label>
                                <Input
                                    id="fname"
                                    placeholder="Enter your first name"
                                    value={firstName}
                                    disabled={isLoading}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Last Name</Label>
                                <Input
                                    id="lname"
                                    placeholder="Enter your last name"
                                    value={lastName}
                                    disabled={isLoading}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    required
                                />
                            </div>
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
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="confirmPassword">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    disabled={isLoading}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <Button
                                onClick={() => {
                                    connectToMeta();
                                }}
                                type="button"
                                className="w-full flex justify-center items-center"
                                variant={"outline"}
                                disabled={isLoading}
                            >
                                {metaAccount == null ? (
                                    <p> Connect To MetaMask</p>
                                ) : (
                                    <p>Sucessfully Connected To MetaMask</p>
                                )}
                                <MetaLogo />
                            </Button>
                        </div>
                        <Button className="mt-4 w-full" type="submit">
                            {isLoading ? (
                                <Loader className="w-6 h-6 animate-spin  mx-auto" />
                            ) : (
                                "Register"
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/login")}
                    >
                        Already have an account? Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
