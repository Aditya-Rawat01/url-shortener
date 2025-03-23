import { NextRequest, NextResponse } from "next/server";
import { redis } from "../auth/redisClient";
import { URI } from "../URL";

export async function GET(req:NextRequest,{params}:{params:{slug:string}}) {
    const res= params.slug
    const shortenedUrl=res
    const regex = /[^A-Za-z0-9]/;
    if (regex.test(shortenedUrl)) {
        return NextResponse.redirect(`${URI}/error`,{status:302})
    }
    try {
       const originalURL:string|null=await redis.get(shortenedUrl)
    if (originalURL) {
        return NextResponse.redirect(originalURL as string,{status:302})
    } else {
        return NextResponse.redirect(`${URI}/error`,{status:302})
    } 
    } catch (error) {
        console.log(error)
        return NextResponse.redirect(`${URI}/error`,{status:302})
    }
   
}