"use client"

import type React from "react"

import { ChangeEvent, FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Copy, Link } from "lucide-react"
import { shortenUrl } from "@/app/lib/actions"
import { toast } from "sonner"

export function UrlShortener() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [alias,setAlias]=useState("")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url) {
      toast.error("Please enter a URL")
      return
    }
    try {
      setIsLoading(true)

      const result = await shortenUrl(url,alias)
      if (result.success) {
      toast.success("URL shortened.🎉")
      setShortUrl(result.data)

      } else {
      toast.error(result.data)

      }
    } catch (err) {
      toast.error(err as string)
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card className="w-full relative">
      <CardHeader>
        <CardTitle>URL Shortener</CardTitle>
        <CardDescription>Enter a long URL to get a short, shareable link.</CardDescription>
      </CardHeader>
      <CardContent>
      {isLoading
      ?
      <div className="w-full flex flex-col items-center">
        <div className="loader"></div>
        <p>Shortening your Url 🤖</p>
      </div>
      :
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col gap-3">
          <div className="relative flex-1 flex">
              <Link className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            {/* <label>Original URL</label> */}
            <Input
              type="url"
              placeholder="https://example.com/very/long/url/that/needs/shortening"
              value={url}
              onChange={(e:ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
              className="pl-9"
              required
            />
            
           <Button type="submit" disabled={isLoading} className="ml-2">
            {isLoading ? "Shortening..." : "Shorten"}
          </Button> 
          </div>
            <Input
              type="alias"
              placeholder="Custom Alias (optional): abc123, xyz321 etc"
              value={alias}
              onChange={(e:ChangeEvent<HTMLInputElement>) => setAlias(e.target.value)}
            />
        </div>
      </div>
    </form>

      }

        
        {shortUrl && (
          <div className="mt-6 space-y-2">
            <p className="text-sm font-medium">Your shortened URL:</p>
            <div className="flex items-center gap-2">
              <Input value={shortUrl} readOnly className="bg-muted" />
              <Button size="icon" variant="outline" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {copied ? "Copied to clipboard!" : "Click the copy button to copy to clipboard"}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">Shortened URls stay up for 2 weeks ❣️</p>
      </CardFooter>
    </Card>
  )
}

