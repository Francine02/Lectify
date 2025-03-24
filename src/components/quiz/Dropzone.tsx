import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Border } from "../animationsMagicUi/Border";

export function Dropzone({ onFileChange }: { onFileChange: (file: File) => void }) {
    const { t } = useTranslation();
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<boolean>(false);

    const acceptedFileTypes = ["application/pdf", "text/markdown"];

    const validateFileType = (file: File): boolean => {
        return acceptedFileTypes.includes(file.type);
    }

    const handleFileSelection = (file: File) => {
        if (validateFileType(file)) {
            setFile(file);
            onFileChange(file);
            setError(false);
        } else {
            setError(true);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            handleFileSelection(selectedFile);
        }
    }

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            handleFileSelection(droppedFile);
        }
    }

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
    }

    return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
            {file ? (
                <p className="text-[#868686] w-full sm:w-96 overflow-auto p-3 flex justify-center items-center max-h-40 rounded-lg cursor-pointer bg-bg-components ">
                    {t("hero.page3.fileIn")}: <span className="font-semibold"> {file.name}</span>
                </p>
            ) : (
                <div className="rounded-3xl relative overflow-x-clip">
                    <Border/>
                    <label
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full sm:w-[30rem] h-32 sm:h-28 border-2 border-dashed border-transparent rounded-3xl cursor-pointer bg-bg-components hover:bg-gray-100 p-6 sm:p-8 md:p-10"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <img
                                className="w-12"
                                src="/assets/Upload.png"
                                alt="upload" />
                            <p className="mb-2 text-sm font-black">
                                {t("hero.page3.addFile")}
                            </p>
                            <p className="text-xs font-extralight">PDF - MD</p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
            )}
            {error && (
                <p className="mt-2 text-sm text-red-500">{t("errors.typeFile")}</p>
            )}
        </div>
    );
}
