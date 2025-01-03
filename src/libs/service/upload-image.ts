import { request } from "../requests";

export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await request.post("/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch (error) {
        console.error("Upload failed:", error);
        throw error;
    }
};

export const uploadMultipleImage = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append("files", file);
    });

    try {
        const response = await request.post("/upload/multiple", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch (error) {
        console.error("Upload failed:", error);
        throw error;
    }
};
