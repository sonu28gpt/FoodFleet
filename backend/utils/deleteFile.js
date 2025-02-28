// import { ApiError } from "./ApiError.js";
import fs from "fs";

export const deleteFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch (error) {
        console.error(`Error deleting file at ${filePath}:`, error);
        // throw ( new ApiError(500,`Error deleting file at ${filePath}:`));
    }
};