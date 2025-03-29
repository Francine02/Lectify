import { DataSummarize } from "../types/DataSummarize";
import axios from "axios";

export const summaryRequest = async (data: DataSummarize) => {    
    try  {
        const response  = await axios.post(`${process.env.NEXT_PUBLIC_LECTIFY_API_SUMMARY}`, data, { responseType: 'blob' });

        const downloadUrl = URL.createObjectURL(response.data); 

        return {
            data: downloadUrl,
            code: response.status,
        }
    } catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 400) {
                console.log(error)
                return { error: data.error };
            }
        }
        console.log(error)
        return { error: "Processing error" };
    }
}