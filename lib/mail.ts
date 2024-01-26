import email from "next-auth/providers/email"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendResetPasswordEmail = async ( email: string, token: string ) => {
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p><a href="${resetLink}">Click here to reset your password.</a></p>`
    })
}

export const sendVerificationEmail = async ( email: string, token: string ) => {
    const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `<p><a href="${confirmLink}">Click here to confirm email.</a></p>`
    })
}
export const sendTwoFactorEmail = async ( email: string, token: string ) => {
    
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `<p>This is your two factor authentication code: ${token}</p>`
    })
}