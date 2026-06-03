import { ALLOWED_MIMES_TYPES } from '@/constants/form/mime-types';
import { useDropzone } from 'react-dropzone';
import { FaRegFileAlt } from 'react-icons/fa';
import { File } from './File';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Error } from '../Error';

export function Dropzone() {
    const [file, setFile] = useState<File | null>(null);

    const {
        setValue,
        register,
        formState: { errors },
    } = useFormContext();

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        accept: {
            ALLOWED_MIMES_TYPES,
        },
        multiple: false,
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0] ?? null);
            setValue('file', acceptedFiles[0], { shouldValidate: true });
        },
    });

    return (
        <>
            {file && !errors.file ? (
                <File text={file.name} onDelete={() => setFile(null)} />
            ) : (
                <div className=" min-w-full">
                    <div
                        {...getRootProps()}
                        className="border-2 border-purple-700 bg-purple-50 border-dashed rounded-lg p-8 cursor-pointer"
                    >
                        <input {...register('file')} {...getInputProps()} />

                        <div className="flex flex-col items-center text-purple-700 space-y-2">
                            <FaRegFileAlt className="size-10 mb-8" />
                            <h2 className="font-semibold">Clique ou araste para enviar um arquivo</h2>
                            <p className="subtitle">PDF ou MD</p>
                        </div>
                    </div>

                    {!!errors.file && <Error text={errors.file?.message?.toString()} />}
                </div>
            )}
        </>
    );
}
