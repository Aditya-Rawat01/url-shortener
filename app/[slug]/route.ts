import { NextRequest, NextResponse } from "next/server";
import { redis } from "../auth/redisClient";
import { URI } from "../URL";

export async function GET(req:NextRequest,{params}:{params:{slug:string}}) {
    const res=await params // it shows no effect of await but on terminal it shows error.
    const shortenedUrl=res.slug
    try {
       const originalURL:string|null=await redis.get(shortenedUrl)
    if (originalURL) {
        return NextResponse.redirect(originalURL as string,{status:302})
    } else {
        return NextResponse.redirect(`${URI}/error`,{status:307})
    } 
    } catch (error) {
        
        return NextResponse.redirect(`${URI}/error`,{status:307})
    }
   
}