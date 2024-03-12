import { retrieveDataById, retrieveData } from "@/lib/firebase/service"
import { getPostByName } from "@/lib/posts/getService"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')
    const id = searchParams.get('id')

    if(name) {
        const detail = await getPostByName(name)

        if(!detail) {
            return NextResponse.json({status: 404, message: 'post not found', data: {}})
        }

        return NextResponse.json({
            status: 200,
            message: 'success',
            data: detail
        })
    }

    if(id) {
        const detail = await retrieveDataById('posts', id)

        if(!detail) {
            return NextResponse.json({status: 404, message: 'post not found', data: {}})
        }

        return NextResponse.json({
            status: 200,
            message: 'success',
            data: detail
        })
    }

    const posts = await retrieveData('posts')

    return NextResponse.json({
        status: 200,
        message: 'success',
        data: posts
    })
}