import { DataSummarize } from "../types/DataSummarize";
import axios from "./config"

export const summaryRequest = async (data: DataSummarize) => {    
    try  {
        const response  = await axios.post('summarize', data);

        return {
            data: response.data,
            error: response.statusText
        }
    } catch (error) {
        return { error: "Erro ao converter arquivo!" };
    }
}