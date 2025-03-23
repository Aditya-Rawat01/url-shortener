"use server"

import axios from "axios"
import { URI } from "../URL"

// the post req can be directly moved here but i am using this as proxy/form validation only.
export async function shortenUrl(url: string, alias:string): Promise<{success:boolean, data:string}> {

  try {
    new URL(url)
  } catch (e) {
    console.log(e)
    return {"success":false, "data":"Invalid URL"}
  }

const regex = /[^A-Za-z0-9]/;
const trimmedAlias=alias.trim()
if (regex.test(alias.trim())) {
  return {"success":false, "data":"Alias can only contain alphanumeric characters"}
}

  try {
    const {data} = await axios.post(`${URI}/auth`,{
    original:url,
    alias:trimmedAlias
  })
  return {"success":true,"data":`${URI}/${data.msg.shortenedUrl}`}
  
  } catch (error:any) {
    
      return {"success":false,"data": error.response.data?.statusText || "Server error"}
  }

}

