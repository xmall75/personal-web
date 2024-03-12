import { addPost } from "@/lib/posts/addService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const req = await request.json()

        const res = await addPost(req)

        return NextResponse.json({
            status: res.status,
            message: res.message,
        }, {status: res.statusCode})
    }
    catch (err) {
        console.error('Error in POST function:', err);
        return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
    }
}