import { useState } from "react";
import { translateError } from "../service/errors";
import { useTranslation } from "react-i18next";

export function useRequest() {
    const { t } = useTranslation();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const makeRequest = async (requestFunction: Function, params?: any) => {
        setLoading(true);
        setError(null);

        try {
            const result = await requestFunction(params);
            console.log('Result:', result); 
            if (result.code === 200 || result.code === 201) {
                setData(result.data);

            } else if (result?.error) {
                setError(translateError(result.error, t));
            }
            return result;
        } catch (err) {
            setError(t("errors.Processing error"));
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, makeRequest }
}