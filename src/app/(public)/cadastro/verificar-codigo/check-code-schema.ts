import z from 'zod';

const baseSchema = z.object({
  input1: z.string().optional(),
  input2: z.string().optional(),
  input3: z.string().optional(),
  input4: z.string().optional(),
  input5: z.string().optional(),
  input6: z.string().optional(),
});

export type CheckCodeFormInputs = z.infer<typeof baseSchema>;

export const checkCodeSchema = baseSchema
  .transform((data) => ({
    code: `${data.input1 ?? ''}${data.input2 ?? ''}${data.input3 ?? ''}${data.input4 ?? ''}${
      data.input5 ?? ''
    }${data.input6 ?? ''}`,
  }))
  .refine((data) => data.code.length === 6, {
    message: 'O código deve ter 6 caracteres',
    path: ['code'],
  });

export type CheckCodeData = z.infer<typeof checkCodeSchema>;
