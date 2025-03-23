import { NextRequest, NextResponse } from "next/server";
import { redis } from "../auth/redisClient";
import { URI } from "../URL";

export async function GET({params}:{params:{slug:string}}) {
    const res=await params // it shows no effect of await but on terminal it shows error.
    const shortenedUrl=res.slug
    const regex = /[^A-Za-z0-9]/;
    if (regex.test(shortenedUrl)) {
        return NextResponse.redirect(`${URI}/error/occurred`,{status:302})
    }
    try {
       const originalURL:string|null=await redis.get(shortenedUrl)
    if (originalURL) {
        return NextResponse.redirect(originalURL as string,{status:302})
    } else {
        return NextResponse.redirect(`${URI}/error/occurred`,{status:302})
    } 
    } catch (error) {
        console.log(error)
        return NextResponse.redirect(`${URI}/error/occurred`,{status:302})
    }
   
}