'use client'

// Alerts
import FormError from '@/modules/auth/form-pieces/alerts/error-alert'
import FormSuccess from '@/modules/auth/form-pieces/alerts/success-alert'

// Buttons
import SubmitButton from '@/modules/configuration/profile-update/components/buttons/submit-button'

// Cards
import CardWrapper from '@/modules/configuration/profile-update/components/cards/card-wrapper'

// Fieldset
import FormFieldset from '@/modules/configuration/profile-update/components/fieldsets/form-fieldset'

// Forms
import { FormProvider } from 'react-hook-form'

// Google
import autocomplete from '@/lib/google/google-maps'
import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js'

// Hooks
import { useSettingsForm } from '@/modules/configuration/profile-update/hooks/useSettingsForm'

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

// React
import { useEffect, useState } from 'react'

// Shadcn
import { Form } from '@/modules/ui/form'

export default function SettingsForm() {
  // Hooks
  const { form, error, success, isPending, hydrated, onSubmit } = useSettingsForm()

  // Translations
  const f = useTranslations('ProfileForm')
  const t = useTranslations('Button')

  // States
  const [city, setCity] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>([])
  const [value, setValue] = useState<string>('')

  // Effects
  useEffect(() => {
    (
      async () => {
        try {
          const results = await autocomplete(value)
          setPredictions(results)
        } catch (error) {
          console.error('Error fetching predictions:', error)
        }
      }
    )()
  }, [value])

  return hydrated ? (
    <CardWrapper>
      <FormProvider {...form}>
        <Form {...form}>
          <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-8 mt-8'>

              {/* Identity */}
              <FormFieldset legend={f('identity')}>
                <NameInput name='name' isPending={isPending} />
                <NicknameInput name='nickname' isPending={isPending} />
                <GenderInput name='gender' isPending={isPending} />
                <BirthdateInput name='birthdate' isPending={isPending} />
              </FormFieldset>

              {/* Credentials */}
              <FormFieldset legend={f('credentials')}>
                <div className='grid w-full h-fit grid-cols-[1fr,1fr] gap-2'>
                  <PhonePrefixInput name='prefix' isPending={isPending} />
                  <PhoneNumberInput name='number' isPending={isPending} />
                </div>
                <EmailInput name='email' isPending={isPending} />
                <PasswordInput name='password' isPending={isPending} />
                <NewPasswordInput name='newPassword' isPending={isPending} />
              </FormFieldset>

              {/* Location */}
              <FormFieldset legend={f('location')}>
                <ZipCodeInput
                  predictions={predictions}
                  setValue={setValue}
                  name='zipCode'
                  isPending={isPending}
                  setCountry={setCountry}
                  setCity={setCity}
                />
                <CountryInput
                  country={country}
                  name='country'
                  isPending={isPending}
                />
                <CityInput city={city} name='city' isPending={isPending} />
                <AddressInput name='address' isPending={isPending} />
              </FormFieldset>

              {/* Vocation */}
              <FormFieldset legend={f('vocation')}>
                <OccupationInput name='occupation' isPending={isPending} />
                <InterestsInput name='interests' isPending={isPending} />
                <SloganInput name='slogan' isPending={isPending} />
                <PortfolioInput name='portfolio' isPending={isPending} />
              </FormFieldset>
              
            </div>

            {/* Messages */}
            <FormError message={error} />
            <FormSuccess message={success} />

            {/* Submit */}
            <div className='w-full h-fit flex justify-end'>
              <SubmitButton message={t('save')} isPending={isPending} />
            </div>
          </form>
        </Form>
      </FormProvider>
    </CardWrapper>
  ) : null
}
