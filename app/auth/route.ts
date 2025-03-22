import { NextRequest, NextResponse } from "next/server";
import base62 from "base62";
import { redis } from "./redisClient";

let numberOfShortenedUrl=10000
export function GET() {
    return NextResponse.json({
        "urlShortened":numberOfShortenedUrl-10000
    })
}
async function saveUserData({shortenedUrl,original}:{shortenedUrl:string,original:string}) {
    const multi = redis.multi();
     multi.set(shortenedUrl,original,{ex:1209600})
    multi.set(original,shortenedUrl,{ex:1209600})
    return await multi.exec();
  }
export async function POST(req:NextRequest) {
    const {original} = await req.json()
    const alreadyShortenedURL=await redis.get(original)
    if (alreadyShortenedURL) {
        return NextResponse.json({
            "msg":{
                "original":original,
            "shortenedUrl":alreadyShortenedURL
            
            }
        })

    } else {
      const shortenedUrl=base62.encode(numberOfShortenedUrl)
      await saveUserData({shortenedUrl,original})
    
    if (numberOfShortenedUrl<10000000000) {
        numberOfShortenedUrl++;
    } else {
        numberOfShortenedUrl=10000
    }
    return NextResponse.json({
        "msg":{
            "original":original,
            "shortenedUrl":shortenedUrl
        }
    })  
    }
    
}
