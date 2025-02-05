import dbconnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import ResetEmail from "../../../../emails/ResetEmail";

export async function POST(request: Request) {
    await dbconnect();

    try {
        const {email} = await request.json();
        // const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({email})

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: 'User not found'
                },
                { status: 500 }
            )
        }

       
        const token = crypto.randomBytes(32).toString('hex').toLowerCase();

        let transporter = nodemailer.createTransport(
            {
                host: process.env.MAIL_HOST,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            }
        )

       
        
        await transporter.sendMail({
                    from: 'GhostNote👻<Ghostnote@VIVEK.email>', // sender address
                    to: email, // list of receivers
                    subject: 'Ghost Note | Reset your password',
                    html: ResetEmail(token)
        });

        user.verifyToken = token;
        user.verifyTokenExpiry = new Date(Date.now() + 5 * 60 * 1000);

        await user.save();
       
        return Response.json(
                {
                    success: true,
                    message: 'Check your Email account, a link is sent'
                },
                { status: 200 }
        )
        



    }
    catch (error) {
        console.log('Error verifying user', error)
        return Response.json({
            success: false,
            message: 'Error in sending email'
        }, { status: 500 })
    }
}