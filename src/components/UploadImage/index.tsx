'use client';
import { useImageUpload } from '@/hooks/useImageUpload';
import { Button } from '../Button';

export function UploadImage() {
  const { preview, inputRef, handleFileChange, handleRemove, loadingAction } = useImageUpload();

  const isRemovingImage = loadingAction === 'remove';
  const isChangingImage = loadingAction === 'upload';

  const isDefaultImage = preview === '/assets/avatar.png';

  return (
    <div className="flex mx-auto relative h-fit flex-col">
      <img
        src={preview}
        className="rounded-full object-cover border-purple-300 border-2 border-dashed size-40 sm:size-64 lg:size-72 2xl:size-80 bg-purple-50 mx-auto"
      />

      <input
        accept="image/*"
        className="hidden"
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
      />

      <div className="flex gap-4 mx-auto mt-5 max-w-3xl">
        <Button
          type="button"
          onClick={handleRemove}
          disabled={loadingAction !== null || isDefaultImage}
          isLoading={isRemovingImage}
          className="py-1.5 bg-white border border-gray-300 text-gray-800 font-semibold hover:brightness-90 text-xs md:text-sm w-32 md:w-40"
        >
          Excluir imagem
        </Button>
        <Button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="py-1.5 text-xs md:text-sm w-20 md:w-24 bg-purple-600"
          isLoading={isChangingImage}
          disabled={loadingAction !== null}
        >
          Alterar
        </Button>
      </div>
    </div>
  );
}
