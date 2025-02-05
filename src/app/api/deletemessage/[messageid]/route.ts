import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbconnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import { User } from 'next-auth';
import mongoose from "mongoose";

export async function DELETE(request: Request,{params}:{params:{messageid:string}}) {
    await dbconnect();
    const messageid = params.messageid;
    const session = await getServerSession(authOptions);
    const user = session?.user as User;

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: 'Not authenticated'
        },
            {
                status: 401
            })
    }

    try {
        const updateResult=await UserModel.updateOne({_id:user._id},{$pull:{messages:{_id:messageid}}})
        if (updateResult.modifiedCount == 0) {
            return Response.json({
                success: false,
                message:'Message not found or already deleted'
            },{status:401})
        }

        return Response.json({
            success: true,
            message:'Message Deleted'
        },{status:201})
    }
    catch (error) {
        console.log('Error in deleting message route ', error);
        return Response.json({
            success: false,
            message:'Error deleting message'
        },{status:500})
    }

    //usefull for aggregation
  


}
