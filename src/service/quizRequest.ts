import axios from "./config"

export const quizRequest = async (formData: FormData) => {    
    try  {
        const response  = await axios.post('questions', formData);

        return {
            data: response.data,
            code: response.status
        }
    } catch (error) {
        return { error: "Erro ao converter arquivo!" };
    }
}