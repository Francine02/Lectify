import Link from "next/link";
import { CardProps } from "../../types/ImgTitleProps";

export function Card({ text, img, href }: CardProps) {
    return (
        <Link href={href} className="pt-5 grid items-center justify-center hover:brightness-[96%] cursor-pointer transition duration-100 ease-in-out m-auto sm:m-0">
            <div className="rounded-3xl bg-gradient-to-t from-rosa to-bege p-[0.1rem] hover:from-bege hover:to-rosa transition duration-100 ease-in-out">
                <div className="grid items-center justify-center bg-bg-components p-4 rounded-3xl w-60 md:w-72 h-32 sm:h-40">
                    <img src={img} alt="Icon" className="mx-auto" />

                    <p className="text-center text-[0.8rem] sm:text-[1rem] font-semibold text-text">
                        {text}
                    </p>
                </div>
            </div>
        </Link>

    )
}