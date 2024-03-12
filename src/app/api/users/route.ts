import { retrieveDataById, retrieveData } from "@/lib/firebase/service"
import { getUserByEmail } from "@/lib/users/getService"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const id = searchParams.get('id')

    if(email) {
        const detail = await getUserByEmail(email)

        if(!detail) {
            return NextResponse.json({status: 404, message: 'user not found', data: {}})
        }

        return NextResponse.json({
            status: 200,
            message: 'success',
            data: detail
        })
    }

    if(id) {
        const detail = await retrieveDataById('users', id)

        if(!detail) {
            return NextResponse.json({status: 404, message: 'user not found', data: {}})
        }

        return NextResponse.json({
            status: 200,
            message: 'success',
            data: detail
        })
    }

    const users = await retrieveData('users')

    return NextResponse.json({
        status: 200,
        message: 'success',
        data: users
    })
}