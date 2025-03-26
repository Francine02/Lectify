import axios from "./config"

export const quizRequest = async (formData: FormData) => {
    try {
        const response = await axios.post('questions', formData);

        return {
            data: response.data,
            code: response.status
        }
    } catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 413) {
                return { error: "file size exceeds the maximum limit of 5 mb." };
            }

            if (status === 400) {
                return { error: data.error };
            }

            return { error: "Processing error" };
        }

        return { error: "Network error" };
    }
}