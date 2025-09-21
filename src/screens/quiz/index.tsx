import { Button } from '@/components/button';
import { Checkbox } from '@/components/Checkbox';
import { Error } from '@/components/Error';
import { LogoPink } from '@/components/logos/LogoPink';
import { Dropzone } from '@/components/quiz/Dropzone';
import { Title } from '@/components/text/title/Title';
import { useQuizContext } from '@/context/QuizContext';
import { useRequest } from '@/hooks/useRequest';
import { quizRequest } from '@/service/quizRequest';
import { DataQuiz } from '@/src/types/DataQuiz';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export function QuizContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const { setData, setScore } = useQuizContext();
  const methods = useForm<DataQuiz>({
    mode: 'onChange',
    defaultValues: {
      file: null,
      quizPolity: false,
    },
  });
  const { data, loading, error, makeRequest } = useRequest();

  const file = methods.watch('file');
  const isQuizPolityChecked = methods.watch('quizPolity');

  const handleQuiz = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append('file', file, file.name);
    }

    await makeRequest(quizRequest, formData);
  };

  if (data) {
    setScore(0);
    setData(data);
    router.push('/quiz/questions');
  }

  return (
    <>
      <LogoPink />
      <Title useSparkles title={t('hero.title.test')} emphasis={t('hero.title.testLine')} />
      {/* <Subtitle title={t("hero.page3.file")} /> */}

      <FormProvider {...methods}>
        <Dropzone />
        {(error || methods.formState.errors.file) && (
          <Error
            className="flex justify-center mb-5 mt-[-1.5rem] text-center"
            text={error || methods.formState.errors?.file?.message?.toString()}
          />
        )}

        <Checkbox name="quizPolity" />

        <div className="flex justify-center mt-5">
          <Button
            disabled={!file || !isQuizPolityChecked || !methods.formState.isValid}
            type="submit"
            text={t('hero.page3.button')}
            loading={loading}
            onClick={handleQuiz}
          />
        </div>
      </FormProvider>
    </>
  );
}
