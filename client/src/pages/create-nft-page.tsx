import {Footer} from "../components/common";
import logo from "../assets/branding/logo.png";
import { useEffect } from "react";
import { useClientState } from "../state/client-state";

export const CreateNFTPage = () => {
    const {setNavbarTab}=useClientState();
    useEffect(()=>{
        setNavbarTab("Sell");
    },[])
    return (
        <>
            <div className="main bg-gray-900 min-h-screen flex flex-col">
                <div className="relative isolate overflow-hidden flex-grow">
                    <svg
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                    >
                        <defs>
                            <pattern
                                x="50%"
                                y={-1}
                                id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                                width={200}
                                height={200}
                                patternUnits="userSpaceOnUse"
                            >
                                <path d="M.5 200V.5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg
                            x="50%"
                            y={-1}
                            className="overflow-visible fill-gray-800/20"
                        >
                            <path
                                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                                strokeWidth={0}
                            />
                        </svg>
                        <rect
                            fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
                            width="100%"
                            height="100%"
                            strokeWidth={0}
                        />
                    </svg>
                    <div
                        aria-hidden="true"
                        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
                    >
                        <div
                            style={{
                                clipPath:
                                    "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
                            }}
                            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
                        />
                    </div>
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-14 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            {" "}
                            {/* Increased max-width */}
                            <img
                                alt="Your Company"
                                src={logo}
                                className="mx-auto h-16 w-auto"
                            />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                                NFT Your Property
                            </h2>
                            <p className=" text-center text-lg leading-9 tracking-tight text-gray-400">
                                If you have a highly demanded property that
                                you'd like to sell as an NFT, please fill out
                                this form
                            </p>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                            {" "}
                            {/* Increased max-width */}
                            <form
                                action="#"
                                method="POST"
                                className="space-y-6"
                            >
                                <div>
                                    <label
                                        htmlFor="firstname"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        First Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder="Enter your First Name"
                                            id="firstname"
                                            name="firstname"
                                            type="text"
                                            required
                                            autoComplete="firstname"
                                            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="lastname"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        Last Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder="Enter your Last Name"
                                            id="lastname"
                                            name="lastname"
                                            type="text"
                                            required
                                            autoComplete="lastname"
                                            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder="Enter your Email"
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="location"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        Property Location
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder="Enter Property Location"
                                            id="location"
                                            name="location"
                                            type="text"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="state"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        State in which the property is located
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder="Enter State"
                                            id="state"
                                            name="state"
                                            type="text"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="marketvalue"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        Market value of the property
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            placeholder="Enter Market Value"
                                            id="marketvalue"
                                            name="marketvalue"
                                            type="text"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            placeholder="Enter Property Description"
                                            id="description"
                                            name="description"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 px-2"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="ownership"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        Is it your property?
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="ownership"
                                            name="ownership"
                                            required
                                            defaultValue="yes"
                                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                        >
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="nftimage"
                                        className="block text-sm font-medium leading-6 text-white"
                                    >
                                        NFT Image
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="nftimage"
                                            name="nftimage"
                                            type="file"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-2">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                name="agreement"
                                                value="agree"
                                                className="form-checkbox h-4 w-4 text-orange-600 focus:ring-orange-600"
                                                required
                                            />
                                            <span className="ml-2 text-white">
                                                I agree to receive other
                                                communication from Block Land
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="block w-full rounded-md bg-orange-600 px-3.5 py-1.5 text-lg font-semibold text-white shadow-sm ring-1 ring-gray-900 hover:bg-orange-500 focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
                                    >
                                        Create NFT
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
