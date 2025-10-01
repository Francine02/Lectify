import z from 'zod';

const baseSchema = z.object({
  input1: z.string().length(1, 'Código precisa ter 6 dígitos'),
  input2: z.string().length(1),
  input3: z.string().length(1),
  input4: z.string().length(1),
  input5: z.string().length(1),
  input6: z.string().length(1),
});

export type CheckCodeFormInputs = z.infer<typeof baseSchema>;

export const checkCodeSchema = baseSchema;
