import GitIcon from "@/components/GitIcon"
import { LinkedInIcon } from "@/components/LinkedinIcon"
import { TwitterIcon } from "@/components/TwitterIcon"
import { UrlShortener } from "@/components/url-shortener"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "SlimURL | URL Shortener",
  description: "Shorten your long URLs with our simple, fast URL shortener.",
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col text-gray-700 sm:text-gray-800">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-bold sm:text-xl">SlimURL</h1>
          <nav className="ml-auto flex gap-4">
            <Link href="https://github.com/Aditya-Rawat01/url-shortener/" className="text-sm font-medium hover:underline">
              Github
            </Link>
            <Link href="https://www.linkedin.com/in/aditya-rawat-qwerty" className="text-sm font-medium hover:underline">
              Linkedin
            </Link>
            <Link href="https://x.com/adityarawat240" className="text-sm font-medium hover:underline">
              Twitter
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
              <p>Shorten Your <span className="rainbow-text-animated p-1">URLs</span></p>
              <p>Share with Confidence</p>
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Transform long, unwieldy links into clean, memorable, and trackable short URLs in seconds.
            </p>
          </div>
          <div className="w-full max-w-3xl mx-auto px-3">
            <UrlShortener />
          </div>
        </section>
        <section className="container py-12 px-5">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-bold">Simple & Fast</h3>
              <p className="text-sm text-muted-foreground">
                Shorten URLs with just one click. No registration required.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-bold">Reliable Links</h3>
              <p className="text-sm text-muted-foreground">
              Enjoy platform-independent shortened links that remain operational for a two-week period.
              Custom Alias links stays up for 1 week.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-bold">Zero Downtime</h3>
              <p className="text-sm text-muted-foreground">Enjoy uninterrupted service with our zero-downtime infrastructure powered by NextJS + Redis.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row md:px-5">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} SlimURL. All rights reserved.</p>
          
          <div className="flex gap-6">
          <Link href="https://github.com/Aditya-Rawat01/url-shortener/" className="text-sm font-medium hover:underline">
              <GitIcon/>
            </Link>
            <Link href="https://www.linkedin.com/in/aditya-rawat-qwerty" className="text-sm font-medium hover:underline">
              <LinkedInIcon/>
            </Link>
            <Link href="https://x.com/adityarawat240" className="text-sm font-medium hover:underline">
              <TwitterIcon/>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">Made by Aditya (👉ﾟヮﾟ)👉</p>
        </div>
      </footer>
    </div>
  )
}

