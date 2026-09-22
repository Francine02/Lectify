import { DROPZONE_ACCEPT } from '@/constants/form/mime-types';
import { cn } from '@/utils/cn';
import { UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { Error } from '../Error';
import { File } from './File';

export function Dropzone() {
  const [file, setFile] = useState<File | null>(null);

  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: DROPZONE_ACCEPT,
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0] ?? null);
      setValue('file', acceptedFiles[0], { shouldValidate: true });
    },
  });

  if (file && !errors.file) return <File text={file.name} onDelete={() => setFile(null)} />;

  return (
    <div className="w-full space-y-2">
      <div
        {...getRootProps()}
        className={cn(
          'cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-colors',
          isDragActive
            ? 'border-purple-500 bg-purple-50'
            : 'border-line-strong bg-canvas hover:border-purple-400 hover:bg-purple-50/50'
        )}
      >
        <input {...register('file')} {...getInputProps()} />

        <div className="flex flex-col items-center gap-2">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
            <UploadCloud size={22} />
          </span>

          <p className="text-sm font-bold">Arraste um arquivo ou clique para enviar</p>
          <p className="text-xs text-subtle">PDF ou Markdown, até 5 MB</p>
        </div>
      </div>

      {!!errors.file && <Error text={errors.file?.message?.toString()} />}
    </div>
  );
}
