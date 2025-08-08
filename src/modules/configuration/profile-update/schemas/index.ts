// Zod: Validations management
import * as z from 'zod'

// Frontend validations
export const FrontendProfileSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .max(64, { message: t('maxLength') })
      .min(1, { message: t('emptyName') })
      .optional(),
    nickname: z
      .string()
      .max(64, { message: t('maxLength') })
      .optional(),
    gender: z
      .string()
      .refine(
        (value) => !value || ['Male', 'Female', 'Other'].includes(value),
        { message: t('invalidGender') }
      )
      .optional(),
    birthdate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, { message: t('invalidBirthdate') })
      .optional()
      .refine((date) => !date || new Date(date) < new Date(), {
        message: t('birthdateInFuture')
      }),
    phonePrefix: z
      .string()
      .regex(/^\+\d{1,4}$/, { message: t('invalidPhonePrefix') })
      .max(64, { message: t('maxLength') })
      .optional(),
    phoneNumber: z
      .string()
      .regex(/^\d{6,15}$/, { message: t('invalidPhoneNumber') })
      .optional(),
    email: z
      .string()
      .max(64, { message: t('maxLength') })
      .email({ message: t('invalidEmail') })
      .optional(),
    password: z
      .string()
      .min(12, { message: t('minPassword') })
      .max(64, { message: t('maxPassword') })
      .regex(/[A-Z]/, { message: t('uppercaseRequired') })
      .regex(/[a-z]/, { message: t('lowercaseRequired') })
      .regex(/\d/, { message: t('numberRequired') })
      .regex(/[^a-zA-Z0-9]/, { message: t('specialCharacterRequired') })
      .optional(),
    newPassword: z
      .string()
      .min(12, { message: t('minPassword') })
      .max(64, { message: t('maxPassword') })
      .regex(/[A-Z]/, { message: t('uppercaseRequired') })
      .regex(/[a-z]/, { message: t('lowercaseRequired') })
      .regex(/\d/, { message: t('numberRequired') })
      .regex(/[^a-zA-Z0-9]/, { message: t('specialCharacterRequired') })
      .optional(),
    zipCode: z
      .string()
      .max(10, { message: t('maxLength') })
      .optional(),
    country: z
      .string()
      .max(64, { message: t('maxLength') })
      .optional(),
    city: z
      .string()
      .max(64, { message: t('maxLength') })
      .optional(),
    address: z
      .string()
      .max(128, { message: t('maxLength') })
      .optional(),
    occupation: z
      .string()
      .max(64, { message: t('maxLength') })
      .optional(),
    interests: z.string().max(64).optional(),
    slogan: z
      .string()
      .max(64, { message: t('maxLength') })
      .optional(),
    portfolio: z
      .string()
      .url({ message: t('invalidPortfolio') })
      .max(128, { message: t('maxLength') })
      .optional()
  })

// Backend validations
export const BackendProfileSchema = z.object({
  name: z.string().min(1).max(64).optional(),
  nickname: z.string().max(64).optional(),
  gender: z
    .string()
    .optional(),
  birthdate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .refine((date) => {
      if (!date) return true
      const today = new Date()
      const birthDate = new Date(date)
      return birthDate < today
    }),
  phonePrefix: z
    .string()
    .regex(/^\+\d{1,4}$/)
    .max(64)
    .optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{6,15}$/)
    .optional(),
  email: z.string().email().max(64).optional(),
  password: z
    .string()
    .min(12)
    .max(64)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/\d/)
    .regex(/[^a-zA-Z0-9]/)
    .optional(),
  newPassword: z
    .string()
    .min(12)
    .max(64)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/\d/)
    .regex(/[^a-zA-Z0-9]/)
    .optional(),
  zipCode: z.string().max(10).optional(),
  country: z.string().max(64).optional(),
  city: z.string().max(64).optional(),
  address: z.string().max(128).optional(),
  occupation: z.string().max(64).optional(),
  interests: z.string().max(64).optional(),
  slogan: z.string().max(64).optional(),
  portfolio: z.string().url().max(128).optional()
})
