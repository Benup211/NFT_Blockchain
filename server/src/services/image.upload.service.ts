import fs from "fs";
import path from "path";
const saveImageFromBase64 = (base64Image:string, filename:string) => {
    const base64Data = base64Image.split(",")[1]; // Remove the `data:image/jpeg;base64,` prefix
    const filePath = path.join(
        __dirname,
        "../../uploads/propertyImages",
        filename
    );
    const relativeFilePath = path.join("uploads", "propertyImages", filename);
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, Buffer.from(base64Data, "base64"), (err) => {
            if (err) reject("Error saving image");
            resolve(relativeFilePath);
        });
    });
};

const getImageFormat = (base64Image: string) => {
    const mimeTypeMatch = base64Image.match(/^data:image\/([a-zA-Z0-9]+);base64,/);
    if (mimeTypeMatch && mimeTypeMatch[1]) {
        return mimeTypeMatch[1];
    }
    throw new Error("Invalid Base64 image format");
};

export { saveImageFromBase64, getImageFormat };
