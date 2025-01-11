export const pinJSONToIPFS = async (jsonContent: {
    property_name: string;
    property_location: string;
}) => {
    const pinataJWT = process.env.NEXT_PUBLIC_PINATA_JWT;
    console.log("pinataJWT", pinataJWT);
    if (!pinataJWT) {
        throw new Error(
            "Missing Pinata API credentials in environment variables."
        );
    }

    const name = "pinnie.json";
    const cidVersion = 1;

    const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
    const headers = {
        Authorization: `Bearer ${pinataJWT}`,
        "Content-Type": "application/json",
    };

    const body = JSON.stringify({
        pinataOptions: { cidVersion },
        pinataMetadata: { name },
        pinataContent: jsonContent,
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers,
            body,
        });

        if (!response.ok) {
            throw new Error(
                `Error: ${response.status} - ${response.statusText}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Error pinning JSON to IPFS:", error);
        throw error;
    }
};
