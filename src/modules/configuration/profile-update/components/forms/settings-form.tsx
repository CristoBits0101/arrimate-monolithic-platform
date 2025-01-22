'use client'

// Cards
import CardWrapper from '@/modules/configuration/profile-update/components/cards/card-wrapper'

// Fieldset
import FormFieldset from '@/modules/configuration/profile-update/components/fieldsets/form-fieldset'

// Forms
import { useForm } from 'react-hook-form'

// Translations
import { useTranslations } from 'next-intl'

export default function SettingsForm() {
  // Forms
  const { handleSubmit, register } = useForm()

  // Handlers
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  // Translations
  const pf = useTranslations('ProfileForm')
  const f = useTranslations('Forms')

  return (
    <CardWrapper>
      <form className='space-y-8' onSubmit={onSubmit}>
        <div className='space-y-8 mt-8'>

          {/* IDENTITY */}
          <FormFieldset legend={pf('identity')}>
            <label htmlFor='name'>{f('inputs.name')}</label>
            <input type='text' {...register('name')} />

            <label htmlFor='nickname'>{f('inputs.nickname')}</label>
            <input type='text' {...register('nickname')} />

            <label htmlFor='gender'>{f('inputs.gender')}</label>
            <input type='text' {...register('gender')} />

            <label htmlFor='birthdate'>{f('inputs.birthdate')}</label>
            <input type='text' {...register('birthdate')} />
          </FormFieldset>

          {/* CREDENTIALS */}
          <FormFieldset legend={pf('credentials')}>
            <div className='grid w-full h-fit grid-cols-[1fr,1fr] gap-2'>
              <label htmlFor='phonePrefix'>{f('inputs.phonePrefix')}</label>
              <input type='text' {...register('phonePrefix')} />

              <label htmlFor='phoneNumber'>{f('inputs.phoneNumber')}</label>
              <input type='text' {...register('phoneNumber')} />
            </div>

            <label htmlFor='email'>{f('inputs.email')}</label>
            <input type='text' {...register('email')} />

            <label htmlFor='password'>{f('inputs.password')}</label>
            <input type='text' {...register('password')} />

            <label htmlFor='newPassword'>{f('inputs.newPassword')}</label>
            <input type='text' {...register('newPassword')} />
          </FormFieldset>

          {/* LOCATION */}
          <FormFieldset legend={pf('location')}>
            <label htmlFor='zipCode'>{f('inputs.zipCode')}</label>
            <input type='text' {...register('zipCode')} />

            <label htmlFor='country'>{f('inputs.country')}</label>
            <input type='text' {...register('country')} />

            <label htmlFor='city'>{f('inputs.city')}</label>
            <input type='text' {...register('city')} />

            <label htmlFor='address'>{f('inputs.address')}</label>
            <input type='text' {...register('address')} />
          </FormFieldset>

          {/* VOCATION */}
          <FormFieldset legend={pf('location')}>
            <label htmlFor='occupation'>{f('inputs.occupation')}</label>
            <input type='text' {...register('occupation')} />

            <label htmlFor='interests'>{f('inputs.interests')}</label>
            <input type='text' {...register('interests')} />

            <label htmlFor='slogan'>{f('inputs.slogan')}</label>
            <input type='text' {...register('slogan')} />

            <label htmlFor='portfolio'>{f('inputs.portfolio')}</label>
            <input type='text' {...register('portfolio')} />
          </FormFieldset>
        </div>

        {/* SUBMIT */}
        <button type='submit'>Submit</button>
      </form >
    </CardWrapper >
  )
}
