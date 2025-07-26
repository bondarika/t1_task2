import { z } from 'zod';

export function createZodValidator<T>(schema: z.ZodSchema<T>) {
  return (values: T) => {
    try {
      schema.parse(values);
      return {};
    } catch (e) {
      const errors: Record<string, string> = {};
      if (e instanceof z.ZodError) {
        e.issues.forEach((err: z.ZodIssue) => {
          if (err.path.length) {
            errors[err.path[0] as string] = err.message;
          }
        });
      }
      return errors;
    }
  };
}
