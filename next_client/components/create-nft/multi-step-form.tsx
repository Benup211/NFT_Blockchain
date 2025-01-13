"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    X,
    CheckCircle,
    HelpCircle,
    Home,
    ImageIcon,
    FileText,
    CheckSquare,
    Codesandbox,
    Edit2,
    MapPin,
    DollarSign,
    Building,
    User,
    List,
    FileCode,
    AlertTriangle,
    FileDown,
} from "lucide-react";
import { generateDummyContract } from "@/utils/contract-generation";
import { jsPDF } from "jspdf";
import { Checkbox } from "@/components/ui/checkbox";
import { pinJSONToIPFS } from "@/utils/ipfs-property-data";
import { toast } from "@/hooks/use-toast";
import { getBlocklandContract } from "@/utils/blockland-contract";
import { ethers, JsonRpcProvider } from "ethers";
import { useAuthStore } from "@/state/auth-state";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { usePropertyCreateStore } from "@/state/property-create-state";

export type PropertyType = "house" | "apartment";

type FormData = {
    name: string;
    location: string;
    features: string[];
    description: string;
    price: string;
    type: PropertyType;
    image: string;
    creator: string;
    smartContract: string;
    contractText: string;
    isContractGenerated: boolean;
    isContractEdited: boolean;
};

const initialFormData: FormData = {
    name: "",
    location: "",
    features: [],
    description: "",
    price: "",
    type: "house",
    image: "",
    creator: "",
    smartContract: "",
    contractText: "",
    isContractGenerated: false,
    isContractEdited: false,
};

const steps = [
    { title: "Basic Info", icon: Home },
    { title: "Features", icon: ImageIcon },
    { title: "Contract", icon: FileText },
    { title: "Verification", icon: CheckSquare },
    { title: "Minting", icon: Codesandbox },
];

export default function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        ...initialFormData,
        features: [],
    });
    const [isVerified, setIsVerified] = useState(false);
    const [isEditingContract, setIsEditingContract] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid },
    } = useForm<FormData>({
        mode: "onChange",
        defaultValues: formData,
    });
    const [ipfsData, setIpfsData] = useState<string>("");
    const [tokenId, setTokenId] = useState<string>("");
    const [checkingIpfs, setCheckingIpfs] = useState(false);
    const { user } = useAuthStore();
    const router = useRouter();
    const { isCreating, createProperty } = usePropertyCreateStore();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setFormData((prevData) => ({ ...prevData, ...data }));
        if (currentStep < steps.length - 1) {
            setCurrentStep((prevStep) => prevStep + 1);
        } else {
            try {
                await createProperty({
                    name: formData.name,
                    location: formData.location,
                    features: formData.features,
                    description: formData.description,
                    price: formData.price,
                    type: formData.type,
                    image: formData.image,
                    contractText: formData.contractText,
                    tokenID: tokenId,
                    ipfsHash: ipfsData,
                });
                router.push("/dashboard");
            } catch (err) {
                console.log(err);
            }
        }
    };
    const mintNFT = async () => {
        if (!window.ethereum) throw new Error("MetaMask is not installed.");
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contract = await getBlocklandContract(signer);
            console.log("contract", contract);
            const nonceProvider = new JsonRpcProvider(
                process.env.NEXT_PUBLIC_NETWORK_URL
            );
            const nonce = await nonceProvider.getTransactionCount(
                await signer.getAddress(),
                "latest"
            );
            const tx = await contract.safeMint(
                user.blockchainPublicKey,
                ipfsData,
                {
                    nonce: nonce,
                    gasLimit: 300000,
                }
            );
            await tx.wait();
            toast({
                title: "Success",
                description: "NFT mint successful.",
            });
        } catch (err) {
            toast({
                title: "Error",
                description: "Minting NFT failed.",
                variant: "destructive",
            });
        }
    };

    const addFeature = (feature: string) => {
        const updatedFeatures = [...watch("features"), feature];
        setValue("features", updatedFeatures);
    };

    const removeFeature = (feature: string) => {
        const updatedFeatures = watch("features").filter((f) => f !== feature);
        setValue("features", updatedFeatures);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue("image", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const verifyIPFS = async () => {
        try {
            setCheckingIpfs(true);
            const data = await pinJSONToIPFS({
                property_name: formData.name,
                property_location: formData.location,
            });
            if (data.isDuplicate === true) {
                toast({
                    title: "Error",
                    description: "IPFS data is a duplicate. Please try again.",
                    variant: "destructive",
                });
                router.push("/dashboard");
            } else {
                toast({
                    title: "Success",
                    description: "IPFS data has been verified.",
                });
                setIpfsData(data.IpfsHash);
                setIsVerified(true);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to verify IPFS data.",
                variant: "destructive",
            });
            router.push("/dashboard");
        } finally {
            setCheckingIpfs(false);
        }
    };

    const generateContract = () => {
        const contractText = generateDummyContract(
            watch("name"),
            watch("price")
        );
        setValue("contractText", contractText);
        setValue("isContractGenerated", true);
        setValue("isContractEdited", false);
    };

    const handleContractEdit = () => {
        setIsEditingContract(true);
    };

    const handleContractSave = () => {
        setIsEditingContract(false);
        setValue("isContractEdited", true);
    };

    const downloadContractPDF = () => {
        const doc = new jsPDF();
        const contractText = watch("contractText");
        const splitText = doc.splitTextToSize(contractText, 180);
        doc.text(splitText, 15, 15);
        doc.save(`${watch("name")}_contract.pdf`);
    };

    return (
        <Card className="w-full max-w-4xl mx-auto p-6 shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center mb-6">
                    Create Your Real Estate NFT
                </CardTitle>
                <div className="relative mb-8">
                    <div className="flex justify-between mb-2">
                        {steps.map((step, index) => (
                            <TooltipProvider key={index}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div
                                            className={`flex flex-col items-center ${
                                                index <= currentStep
                                                    ? "text-primary"
                                                    : "text-muted-foreground"
                                            }`}
                                        >
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                    index < currentStep
                                                        ? "bg-primary text-primary-foreground"
                                                        : index === currentStep
                                                        ? "border-2 border-primary text-primary"
                                                        : "bg-muted text-muted-foreground"
                                                }`}
                                            >
                                                {React.createElement(
                                                    step.icon,
                                                    { size: 20 }
                                                )}
                                            </div>
                                            <span className="text-xs mt-1 hidden sm:inline">
                                                {step.title}
                                            </span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{step.title}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                    <div className="w-full bg-muted h-1 rounded-full overflow-hidden mt-2">
                        <div
                            className="h-full bg-primary transition-all duration-300 ease-in-out"
                            style={{
                                width: `${
                                    (currentStep / (steps.length - 1)) * 100
                                }%`,
                            }}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <form
                            id="nftForm"
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {currentStep === 0 && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="name">
                                            Property Name
                                        </Label>
                                        <Input
                                            id="name"
                                            {...register("name", {
                                                required:
                                                    "Property name is required",
                                            })}
                                            className="w-full"
                                        />
                                        {errors.name && (
                                            <span className="text-red-500 text-sm">
                                                {errors.name.message}
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location">
                                            Location
                                        </Label>
                                        <Input
                                            id="location"
                                            {...register("location", {
                                                required:
                                                    "Location is required",
                                            })}
                                            className="w-full"
                                        />
                                        {errors.location && (
                                            <span className="text-red-500 text-sm">
                                                {errors.location.message}
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="price">
                                            Price (ETH)
                                        </Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            {...register("price", {
                                                required: "Price is required",
                                            })}
                                            className="w-full"
                                        />
                                        {errors.price && (
                                            <span className="text-red-500 text-sm">
                                                {errors.price.message}
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="type">
                                            Property Type
                                        </Label>
                                        <Select
                                            onValueChange={(value) =>
                                                setValue(
                                                    "type",
                                                    value as PropertyType
                                                )
                                            }
                                        >
                                            <SelectTrigger
                                                id="type"
                                                className="w-full"
                                            >
                                                <SelectValue placeholder="Select property type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="house">
                                                    House
                                                </SelectItem>
                                                <SelectItem value="apartment">
                                                    Apartment
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.type && (
                                            <span className="text-red-500 text-sm">
                                                {errors.type.message}
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                            {currentStep === 1 && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="image">
                                            Property Image
                                        </Label>
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="w-full"
                                        />
                                        {watch("image") && (
                                            <div className="mt-2">
                                                <img
                                                    src={watch("image")}
                                                    alt="Property"
                                                    className="max-w-[200px] h-auto rounded-lg shadow-md"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="features">
                                            Features
                                        </Label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {watch("features").map(
                                                (feature, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className="text-sm py-1 px-2"
                                                    >
                                                        {feature}
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeFeature(
                                                                    feature
                                                                )
                                                            }
                                                            className="ml-2 text-red-500 hover:text-red-700"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <Input
                                                id="features"
                                                placeholder="Add a feature"
                                                className="flex-grow"
                                                onKeyPress={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        const input =
                                                            e.target as HTMLInputElement;
                                                        if (
                                                            input.value.trim()
                                                        ) {
                                                            addFeature(
                                                                input.value.trim()
                                                            );
                                                            input.value = "";
                                                        }
                                                    }
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    const input =
                                                        document.getElementById(
                                                            "features"
                                                        ) as HTMLInputElement;
                                                    if (input.value.trim()) {
                                                        addFeature(
                                                            input.value.trim()
                                                        );
                                                        input.value = "";
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            {...register("description", {
                                                required:
                                                    "Description is required",
                                            })}
                                            className="w-full h-32"
                                        />
                                        {errors.description && (
                                            <span className="text-red-500 text-sm">
                                                {errors.description.message}
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                            {currentStep === 2 && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="creator">Creator</Label>
                                        <Input
                                            id="creator"
                                            {...register("creator", {
                                                required:
                                                    "Creator name is required",
                                            })}
                                            className="w-full"
                                        />
                                        {errors.creator && (
                                            <span className="text-red-500 text-sm">
                                                {errors.creator.message}
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-4 mt-6">
                                        <div className="flex items-center justify-between">
                                            <Label
                                                htmlFor="contractText"
                                                className="text-lg font-semibold"
                                            >
                                                Smart Contract
                                            </Label>
                                            <div className="space-x-2">
                                                <Button
                                                    type="button"
                                                    onClick={generateContract}
                                                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                                                >
                                                    {watch(
                                                        "isContractGenerated"
                                                    )
                                                        ? "Regenerate Contract"
                                                        : "Generate Contract"}
                                                </Button>
                                                {watch("isContractGenerated") &&
                                                    !isEditingContract && (
                                                        <Button
                                                            type="button"
                                                            onClick={
                                                                handleContractEdit
                                                            }
                                                            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                                                        >
                                                            <Edit2 className="mr-2 h-4 w-4" />{" "}
                                                            Edit Contract
                                                        </Button>
                                                    )}
                                                {isEditingContract && (
                                                    <Button
                                                        type="button"
                                                        onClick={
                                                            handleContractSave
                                                        }
                                                        className="bg-green-600 text-white hover:bg-green-700"
                                                    >
                                                        Save Changes
                                                    </Button>
                                                )}
                                                {watch(
                                                    "isContractGenerated"
                                                ) && (
                                                    <Button
                                                        type="button"
                                                        onClick={
                                                            downloadContractPDF
                                                        }
                                                        variant="outline"
                                                        size="sm"
                                                        className="text-xs"
                                                    >
                                                        <FileDown className="mr-1 h-3 w-3" />{" "}
                                                        Download Contract
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                        {watch("isContractGenerated") ? (
                                            <div className="p-4 bg-muted rounded-md">
                                                {isEditingContract ? (
                                                    <Textarea
                                                        {...register(
                                                            "contractText"
                                                        )}
                                                        className="w-full h-64 font-mono text-sm"
                                                    />
                                                ) : (
                                                    <pre className="whitespace-pre-wrap text-sm">
                                                        {watch("contractText")}
                                                    </pre>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="p-4 bg-muted/50 rounded-md text-center text-muted-foreground">
                                                Click the "Generate Contract"
                                                button to create your smart
                                                contract.
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                            {currentStep === 3 && (
                                <>
                                    <h3 className="text-2xl font-semibold mb-6">
                                        Verify Your Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Card className="col-span-1 md:col-span-2">
                                            <CardHeader>
                                                <CardTitle className="flex items-center">
                                                    <Home className="mr-2" />
                                                    Property Overview
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="grid grid-cols-2 gap-4">
                                                <div className="flex items-center">
                                                    <Home className="mr-2 h-4 w-4" />
                                                    <div>
                                                        <Label>Name</Label>
                                                        <p className="text-sm font-medium">
                                                            {watch("name")}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <MapPin className="mr-2 h-4 w-4" />
                                                    <div>
                                                        <Label>Location</Label>
                                                        <p className="text-sm font-medium">
                                                            {watch("location")}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <DollarSign className="mr-2 h-4 w-4" />
                                                    <div>
                                                        <Label>Price</Label>
                                                        <p className="text-sm font-medium">
                                                            {watch("price")} ETH
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <Building className="mr-2 h-4 w-4" />
                                                    <div>
                                                        <Label>Type</Label>
                                                        <p className="text-sm font-medium">
                                                            {watch("type")}
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center">
                                                    <List className="mr-2" />
                                                    Features
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex flex-wrap gap-2">
                                                    {watch("features").map(
                                                        (feature, index) => (
                                                            <Badge
                                                                key={index}
                                                                variant="secondary"
                                                            >
                                                                {feature}
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center">
                                                    <User className="mr-2" />
                                                    Creator
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm font-medium">
                                                    {watch("creator")}
                                                </p>
                                            </CardContent>
                                        </Card>

                                        <Card className="col-span-1 md:col-span-2">
                                            <CardHeader>
                                                <CardTitle className="flex items-center">
                                                    <FileText className="mr-2" />
                                                    Description
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm">
                                                    {watch("description")}
                                                </p>
                                            </CardContent>
                                        </Card>

                                        {watch("image") && (
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="flex items-center">
                                                        <ImageIcon className="mr-2" />
                                                        Property Image
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="flex justify-center">
                                                    <img
                                                        src={watch("image")}
                                                        alt="Property"
                                                        className="max-w-[200px] h-auto rounded-lg shadow-md"
                                                    />
                                                </CardContent>
                                            </Card>
                                        )}

                                        <Card className="col-span-1 md:col-span-2">
                                            <CardHeader>
                                                <CardTitle className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <FileCode className="mr-2" />
                                                        Smart Contract
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        onClick={
                                                            downloadContractPDF
                                                        }
                                                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                                                    >
                                                        Download PDF
                                                    </Button>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <pre className="text-xs whitespace-pre-wrap bg-muted p-2 rounded-md max-h-40 overflow-y-auto">
                                                    {watch("contractText")}
                                                </pre>
                                            </CardContent>
                                        </Card>

                                        <div className="col-span-1 md:col-span-2 mt-6">
                                            <Button
                                                onClick={() => {
                                                    verifyIPFS();
                                                }}
                                                type="button"
                                                disabled={isVerified}
                                                className="w-full"
                                            >
                                                {isVerified ? (
                                                    "Verified in IPFS"
                                                ) : checkingIpfs ? (
                                                    <Loader className="w-6 h-6 animate-spin  mx-auto" />
                                                ) : (
                                                    "Verify in IPFS"
                                                )}
                                            </Button>
                                            {isVerified && (
                                                <div className="mt-2 flex items-center justify-center text-green-500">
                                                    <CheckCircle className="mr-2" />
                                                    <span>
                                                        Successfully verified in
                                                        IPFS
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                            {currentStep === 4 && (
                                <>
                                    <h3 className="text-2xl font-semibold mb-6 text-center">
                                        Mint Your Real Estate NFT
                                    </h3>
                                    <div className="space-y-6">
                                        <Card className="overflow-hidden">
                                            <CardHeader className="bg-primary/10 pb-2">
                                                <CardTitle className="text-lg flex items-center">
                                                    <Codesandbox className="mr-2 h-5 w-5" />
                                                    NFT Summary
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="pt-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center space-x-2">
                                                            <Home className="h-4 w-4 text-primary" />
                                                            <p className="text-sm">
                                                                <span className="font-medium">
                                                                    Property:
                                                                </span>{" "}
                                                                {watch("name")}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <MapPin className="h-4 w-4 text-primary" />
                                                            <p className="text-sm">
                                                                <span className="font-medium">
                                                                    Location:
                                                                </span>{" "}
                                                                {watch(
                                                                    "location"
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <DollarSign className="h-4 w-4 text-primary" />
                                                            <p className="text-sm">
                                                                <span className="font-medium">
                                                                    Price:
                                                                </span>{" "}
                                                                {watch("price")}{" "}
                                                                ETH
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center space-x-2">
                                                            <User className="h-4 w-4 text-primary" />
                                                            <p className="text-sm">
                                                                <span className="font-medium">
                                                                    Creator:
                                                                </span>{" "}
                                                                {watch(
                                                                    "creator"
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <FileCode className="h-4 w-4 text-primary" />
                                                            <p className="text-sm">
                                                                <span className="font-medium">
                                                                    Contract:
                                                                </span>{" "}
                                                                {watch(
                                                                    "isContractEdited"
                                                                )
                                                                    ? "Custom"
                                                                    : "Generated"}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <List className="h-4 w-4 text-primary" />
                                                            <div className="flex flex-wrap gap-1">
                                                                {watch(
                                                                    "features"
                                                                )
                                                                    .slice(0, 3)
                                                                    .map(
                                                                        (
                                                                            feature,
                                                                            index
                                                                        ) => (
                                                                            <Badge
                                                                                key={
                                                                                    index
                                                                                }
                                                                                variant="outline"
                                                                                className="text-xs"
                                                                            >
                                                                                {
                                                                                    feature
                                                                                }
                                                                            </Badge>
                                                                        )
                                                                    )}
                                                                {watch(
                                                                    "features"
                                                                ).length >
                                                                    3 && (
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="text-xs"
                                                                    >
                                                                        +
                                                                        {watch(
                                                                            "features"
                                                                        )
                                                                            .length -
                                                                            3}{" "}
                                                                        more
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Alert
                                            variant="destructive"
                                            className="border-l-4 border-yellow-400 bg-yellow-50"
                                        >
                                            <AlertTriangle className="h-5 w-5 text-yellow-400" />
                                            <AlertTitle className="text-base font-semibold text-yellow-800">
                                                Important Information
                                            </AlertTitle>
                                            <AlertDescription className="mt-2 text-sm text-yellow-700">
                                                <ul className="list-disc list-inside space-y-1">
                                                    <li>
                                                        Minting an NFT is
                                                        irreversible.
                                                    </li>
                                                    <li>
                                                        You will incur gas fees
                                                        on the Ethereum network.
                                                    </li>
                                                    <li>
                                                        Ensure you have
                                                        sufficient ETH in your
                                                        wallet.
                                                    </li>
                                                </ul>
                                            </AlertDescription>
                                        </Alert>

                                        <div className="flex items-center justify-between">
                                            <Button
                                                type="button"
                                                onClick={downloadContractPDF}
                                                variant="outline"
                                                size="sm"
                                                className="text-xs"
                                            >
                                                <FileDown className="mr-1 h-3 w-3" />{" "}
                                                Download Contract
                                            </Button>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            variant="ghost"
                                                        >
                                                            <HelpCircle className="h-4 w-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p className="text-xs">
                                                            Review the contract
                                                            before minting
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="terms" />
                                                <Label
                                                    htmlFor="terms"
                                                    className="text-sm"
                                                >
                                                    I agree to the{" "}
                                                    <a
                                                        href="#"
                                                        className="text-primary hover:underline"
                                                    >
                                                        Terms and Conditions
                                                    </a>
                                                </Label>
                                            </div>
                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    mintNFT();
                                                }}
                                            >
                                                Mint NFT
                                            </Button>
                                            <Input
                                                id="tokenID"
                                                placeholder="Add Minted TokenID"
                                                className="flex-grow"
                                                onChange={(e) =>{
                                                    setTokenId(e.target.value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </form>
                    </motion.div>
                </AnimatePresence>
            </CardContent>
            <CardFooter className="flex justify-between mt-6 pt-4 border-t">
                {currentStep > 0 && (
                    <Button
                        type="button"
                        onClick={() =>
                            setCurrentStep((prevStep) => prevStep - 1)
                        }
                        variant="outline"
                        disabled={checkingIpfs}
                    >
                        Previous
                    </Button>
                )}
                <Button
                    type="submit"
                    form="nftForm"
                    disabled={
                        (currentStep === 2 && !watch("isContractGenerated")) ||
                        (currentStep === 3 && !isVerified) ||
                        (currentStep === 4 && tokenId == "")
                    }
                    className={currentStep === 0 ? "ml-auto" : ""}
                >
                    {currentStep === steps.length - 1
                        ? "Add to MetaServer"
                        : "Next"}
                </Button>
            </CardFooter>
        </Card>
    );
}
