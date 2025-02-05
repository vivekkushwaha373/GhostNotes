import VerificationEmail from '../../emails/VerificationEmail'
import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport(
    {
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    }
)


export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
    
){
    try {

        await transporter.sendMail({
            from: 'GhostNote👻<Ghostnote@VIVEK.email>', // sender address
            to: email, // list of receivers
            subject: 'Ghost Note | Verification code',
            // text: "Hello world?", // plain text body
            html: VerificationEmail({ username, otp: verifyCode }), // html body
        });
       
        return {
            
            success:true, message:'Verification email sent succesfully'
        }
    }
    catch (error) {
        console.log('Error sending verification email ', error);
        return {success:false, message:'Failed to send verification email'}
    }
}
