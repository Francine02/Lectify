export const translateError = (errorCode: string, t: (key: string) => string) => {
    const normalizedError = errorCode.trim().toLowerCase();

    const errorMap: { [key: string]: string } = {
        "url exceeds maximum length": t("errors.URL exceeds maximum length"),
        "document conversion error": t("errors.Document conversion error"),
        "os error": t("errors.OS error"),
        "document building error": t("errors.Document building error"),
        "chat generation error": t("errors.ChatGenerationError"),
        "unable to understand the audio": t("errors.Unable to understand the audio"),
        "service request error": t("errors.Service request error"),
        "audio recognition error": t("errors.Audio recognition error"),
        "download error": t("errors.Download error"),
        "network error": t("errors.Network error"),
        "audio downloading error": t("errors.Audio downloading error"),
        "file exceeds maximum length": t("errors.File exceeds maximum length"),
        "suspicious file name": t("errors.Suspicious file name"),
        "extraction error": t("errors.Extraction error"),
        "file size exceeds the maximum limit of 5 mb.": t("errors.Payload Too Large"),
        "processing error": t("errors.Processing error"),
    };

    return errorMap[normalizedError] || t("errors.Processing error");
};
