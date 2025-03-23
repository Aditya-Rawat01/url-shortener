import image from "@/components/errorImage.png"
import Image from "next/image"
export default function Page() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center relative">
            <Image src={image} alt="404 error" className="max-w-96"/>
            <p className="text-xl mt-3 font-mono">Sorry, The link is broken or expired!!</p>
            </div>
    )
}