import dbconnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    await dbconnect();

    try {
        const { newpassword,confirmpassword,token} = await request.json();
        // const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({ verifyToken: token });

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: 'Password Reset failed'
                },
                { status: 500 }
            )
        }

        if (newpassword!=confirmpassword) {
            return Response.json({
                success: false,
                message:'Make sure isPassword and confirmpassword is same'
            },{status:400})
        }

        if (user.verifyTokenExpiry < new Date()) {
            return Response.json(
                {
                    success: false,
                    message: 'Password Reset failed time out. Try again' 
                },{status:400}
            )
        }

        const hashedPassword = await bcrypt.hash(newpassword,10);
        user.password = hashedPassword;
        await user.save();

        return Response.json(
            {
                success: true,
                message: 'Yout Password is updated successfully'
            },
            { status: 200 }
        )




    }
    catch (error) {
        console.log('Error Updating password', error)
        return Response.json({
            success: false,
            message: 'Error in updating password'
        }, { status: 500 })
    }
}