import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Border } from "../animationsMagicUi/Border";
import { File } from "../file/File";

export function Dropzone() {
    const { t } = useTranslation();
    const { setValue, register, watch, formState: { errors }, setError } = useFormContext();

    const acceptedFileTypes = ["application/pdf", "text/markdown"];
    const file = watch("file");

    const validateFileType = (file: File): boolean => {
        return acceptedFileTypes.includes(file.type);
    }

    const handleFileChange = (file: File | undefined) => {
        if (!file) {
            setValue("file", null, { shouldValidate: true });
            return;
        }
        if (!validateFileType(file)) {
            setError("file", { type: "manual", message: t("errors.typeFile") });
        } else {
            setValue("file", file, { shouldValidate: true });
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        handleFileChange(droppedFile);
    }

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
    }

    return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
            {file && !errors.file? (
                <File text={file.name} />
            ) : (
                <div className="rounded-3xl relative overflow-x-clip">
                    <Border />
                    <label
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full sm:w-[30rem] h-32 sm:h-28 border-2 border-dashed border-transparent rounded-3xl cursor-pointer bg-bg-components hover:bg-gray-100 p-6 sm:p-8 md:p-10"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <img
                                className="w-9"
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
                            {...register("file", {
                                onChange: (e) => {
                                    const selectedFile = e.target.files?.[0];
                                    handleFileChange(selectedFile);
                                }
                            })}
                        />
                    </label>
                </div>
            )}
        </div>
    );
}
