// resend
import { Resend } from 'resend'

// RESEND_API_KEY
const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (
  email: string,
  token: string,
  emailMessage: string
) => {
  try {
    // Verification link data
    const companyEmail = 'arrimate.team@gmail.com'
    const confirmLink = `http://localhost:3000/new-verification?token=${token}`

    // Verification link message
    const word = 'Confirm';
    const messageLink = emailMessage.includes(word)
      ? `<p>Click <a href='${confirmLink}'>here</a> to confirm your registration.</p>`
      : `<p>Hacer clic <a href='${confirmLink}'>aquí</a> para confirmar el registro.</p>`

    // Message sent to user
    await resend.emails.send({
      from: companyEmail,
      to: email,
      subject: emailMessage,
      html: messageLink
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error sending email to ${email}:`, error.message)
      throw new Error(
        'Failed to send verification email. Please try again later.'
      )
    } else {
      console.error(`Unexpected error for ${email}:`, error)
      throw new Error('Unexpected error occurred while sending the email.')
    }
  }
}
