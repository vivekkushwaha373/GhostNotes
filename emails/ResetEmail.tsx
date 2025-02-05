

export default function ResetEmail(token: string): string {
    return `
  <div style="font-family: Arial, sans-serif; text-align: center;">
    <h2>Password Reset Request</h2>
    <p>If you requested a password reset, click the link below:</p>
    <a href="${process.env.BASE_URL}/forget/${token}" 
       style="display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">
       Click this link to reset your password
    </a>
    <p>If you did not request this, you can ignore this email.</p>
  </div>
`
}