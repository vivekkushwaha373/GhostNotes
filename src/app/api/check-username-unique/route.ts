import dbconnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import { z } from 'zod'
import { usernameValidation } from '@/schemas/signUpSchema'
import { Chela_One } from "next/font/google";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
   
    await dbconnect();
    try {
        const { searchParams } = new URL(request.url);
        const queryParams = {
            username: searchParams.get('username')
        }
        //validation with zod
        const result = UsernameQuerySchema.safeParse(queryParams);
        
        console.log(result);
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json({
                success: false,
                message:usernameErrors?.length>0? usernameErrors.join(','):'Invalid query parameters'  
            },{status:400})
        }

        const { username } = result.data;

        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true })
        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message:'Username is already taken',
            },{status:400})
        }

        return Response.json({
            success: true,
            message:'Username is unique'
        },{status:400})

    }
    catch (error) {
        console.log('Error checking username', error);
        return Response.json(
            {
                success: false,
                message: 'Error checking username'
            },
            { status: 500 }
        )
    }
}