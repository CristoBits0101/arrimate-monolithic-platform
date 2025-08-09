'use client'

// Cards
import CardWrapper from '@/modules/configuration/profile-update/components/cards/card-wrapper'

// Fieldset
import FormFieldset from '@/modules/configuration/profile-update/components/fieldsets/form-fieldset'

// Forms
import { FormProvider } from 'react-hook-form'


// Hooks
import { useSettingsFormContext } from '@/modules/configuration/profile-update/contexts/settings-form-context'

// Inputs
import AddressInput from '@/modules/configuration/profile-update/components/inputs/address-input'
import BirthdateInput from '@/modules/configuration/profile-update/components/inputs/birthdate-input'
import CityInput from '@/modules/configuration/profile-update/components/inputs/city-input'
import CountryInput from '@/modules/configuration/profile-update/components/inputs/country-input'
import EmailInput from '@/modules/configuration/profile-update/components/inputs/email-input'
import GenderInput from '@/modules/configuration/profile-update/components/inputs/gender-input'
import InterestsInput from '@/modules/configuration/profile-update/components/inputs/interests-input'
import NameInput from '@/modules/configuration/profile-update/components/inputs/name-input'
import NewPasswordInput from '@/modules/configuration/profile-update/components/inputs/new-password-input'
import NicknameInput from '@/modules/configuration/profile-update/components/inputs/nickname-input'
import OccupationInput from '@/modules/configuration/profile-update/components/inputs/occupation-input'
import PasswordInput from '@/modules/configuration/profile-update/components/inputs/password-input'
import PhoneNumberInput from '@/modules/configuration/profile-update/components/inputs/phone-number-input'
import PhonePrefixInput from '@/modules/configuration/profile-update/components/inputs/phone-prefix-input'
import PortfolioInput from '@/modules/configuration/profile-update/components/inputs/portfolio-input'
import SloganInput from '@/modules/configuration/profile-update/components/inputs/slogan-input'
import ZipCodeInput from '@/modules/configuration/profile-update/components/inputs/zip-code-input'

// Intl
import { useTranslations } from 'next-intl'

// Shadcn
import { Form } from '@/modules/ui/form'

export default function SettingsForm() {
  // Hooks
  const { form, isPending, handleUpdate } = useSettingsFormContext()

  // Translations
  const f = useTranslations('ProfileForm')

  return (
    <CardWrapper>
      <FormProvider {...form}>
        <Form {...form}>
          <form className='space-y-8 text-sm' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-8 mt-8'>
              <FormFieldset legend={f('identity')}>
                <NameInput name='name' isPending={isPending} />
                <NicknameInput name='nickname' isPending={isPending} />
                <GenderInput name='gender' isPending={isPending} />
                <BirthdateInput name='birthdate' isPending={isPending} />
              </FormFieldset>
              <FormFieldset legend={f('credentials')}>
                <div className='grid w-full h-fit grid-cols-[1fr,1fr] gap-2'>
                  <PhonePrefixInput name='phonePrefix' isPending={isPending} />
                  <PhoneNumberInput name='phoneNumber' isPending={isPending} />
                </div>
                <EmailInput name='email' isPending={isPending} />
                <PasswordInput name='password' isPending={isPending} />
                <NewPasswordInput name='newPassword' isPending={isPending} />
              </FormFieldset>
              <FormFieldset legend={f('location')}>
                <ZipCodeInput name='zipCode' isPending={isPending} />
                <CountryInput name='country' isPending={isPending} />
                <CityInput name='city' isPending={isPending} />
                <AddressInput name='address' isPending={isPending} />
              </FormFieldset>
              <FormFieldset legend={f('vocation')}>
                <OccupationInput name='occupation' isPending={isPending} />
                <InterestsInput name='interests' isPending={isPending} />
                <SloganInput name='slogan' isPending={isPending} />
                <PortfolioInput name='portfolio' isPending={isPending} />
              </FormFieldset>
            </div>

          </form>
        </Form>
      </FormProvider>
    </CardWrapper>
  )
}
