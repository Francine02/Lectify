import { putImageProfile } from '@/service/my-account/put-image-profile';
import { getInformationItem } from '@/utils/informations/get-informations';
import { saveInformationsInStorage } from '@/utils/storage/save-informations-storage';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export function useImageUpload() {
  const [preview, setPreview] = useState<string>('/assets/avatar.png');
  const [loadingAction, setLoadingAction] = useState<'upload' | 'remove' | null>(null);

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

    setLoadingAction('upload');
    handleSubmit(file);
  };

  const handleRemove = () => {
    if (inputRef.current) inputRef.current.value = '';

    setLoadingAction('remove');
    handleSubmit('');
  };

  const handleSubmit = async (file: File | string) => {
    try {
      const response = await putImageProfile(file);

      if (!response.success) {
        toast.error('Falha ao alterar imagem');
        return;
      }

      toast.success('Imagem atualizada!');
      saveInformationsInStorage({ image_profile: response.data.image_profile ?? '' });
      setPreview(response.data.image_profile ?? '/assets/avatar.png');
    } finally {
      setLoadingAction(null);
    }
  };

  return {
    preview,
    loadingAction,
    inputRef,
    handleFileChange,
    handleRemove,
  };
}
