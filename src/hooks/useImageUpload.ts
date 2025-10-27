import { putImageProfile } from '@/service/my-account/put-image-profile';
import { getInformationItem } from '@/utils/informations/get-informations';
import { saveInformationsInStorage } from '@/utils/storage/save-informations-storage';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export function useImageUpload() {
  const [preview, setPreview] = useState<string>('/assets/avatar.png');
  const [loading, setLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const storedImage = getInformationItem('image_profile');
    if (storedImage && typeof storedImage === 'string' && storedImage.trim() !== '') {
      setPreview(storedImage);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleSubmit(file);
  };

  const handleRemove = () => {
    if (inputRef.current) inputRef.current.value = '';

    handleSubmit('');
  };

  const handleSubmit = (file: File | string) => {
    setLoading(true);

    setTimeout(async () => {
      const response = await putImageProfile(file);

      setLoading(false);

      if (!response.success) toast.error('Falha ao alterar imagem');

      toast.success('Imagem atualizada!');
      saveInformationsInStorage(response.data.image_profile ?? '');
      setPreview(response.data.image_profile ?? '/assets/avatar.png');
    }, 2000);
  };

  return {
    preview,
    loading,
    inputRef,
    handleFileChange,
    handleRemove,
  };
}
