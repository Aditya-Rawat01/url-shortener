import { NextRequest, NextResponse } from "next/server";
import base62 from "base62";
import { redis } from "./redisClient";


export async function GET() {
    const numberOfShortenedUrl=await redis.get("numberOfShortenedUrl") as number
    return NextResponse.json({
        "urlShortened":numberOfShortenedUrl-10000,
        
    })
}
async function saveUserData({shortenedUrl,original}:{shortenedUrl:string,original:string}) {
    const multi = redis.multi();
    multi.set(shortenedUrl,original,{ex:1209600})
    multi.set(original,shortenedUrl,{ex:1209600})
    return await multi.exec();
  }
export async function POST(req:NextRequest) {
    const {original, alias} = await req.json()
    if (alias) {
        const originalURL=await redis.get(alias)
        if (originalURL) {
            return NextResponse.json({"statusText":"Alias already in use. Try something else."},{status:400})
        }
        else {
            try {
                await redis.set(alias,original,{ex:604800})
                return NextResponse.json({
                    "msg":{
                    "original":original,
                    "shortenedUrl":alias
                }})  
            } catch (error) {
                console.log(error)
                return NextResponse.json({"statusText":"Failed to shorten the url"},{status:400})
            }
            
        }
    }
    const alreadyShortenedURL=await redis.get(original)
    if (alreadyShortenedURL) {
        return NextResponse.json({
            "msg":{
                "original":original,
            "shortenedUrl":alreadyShortenedURL
            
            }
        })

    } else {
      let numberOfShortenedUrl=await redis.get("numberOfShortenedUrl") as number
      const shortenedUrl=base62.encode(numberOfShortenedUrl)
      try {
        await saveUserData({shortenedUrl,original})
    
    if (numberOfShortenedUrl<10000000000) {
        numberOfShortenedUrl++;
        await redis.set("numberOfShortenedUrl",numberOfShortenedUrl) as number

    } else {
        numberOfShortenedUrl=10000
        await redis.set("numberOfShortenedUrl",numberOfShortenedUrl) as number

    }
    return NextResponse.json({
        "msg":{
            "original":original,
            "shortenedUrl":shortenedUrl
        }
    })  
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({"statusText":"Failed to shorten the url"},{status:400})
     }
      } 
      
    
}
