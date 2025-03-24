import Link from "next/link";
import { CardProps } from "../../types/ImgTitleProps";
import { Border } from "../animationsMagicUi/Border";

export function Card({ text, img, href }: CardProps) {
    return (
        <Link href={href} className="pt-5 grid items-center justify-center hover:brightness-[96%] cursor-pointer transition duration-100 ease-in-out m-auto sm:m-0">
            <div className="rounded-3xl relative overflow-clip">
                <div className="grid items-center justify-center bg-bg-components p-4 w-60 md:w-72 h-36 sm:h-[10rem] rounded-3xl">
                <Border />
                    <img src={img} alt="Icon" className="mx-auto" />

                    <p className="text-center text-[0.8rem] sm:text-[1rem] font-semibold text-text">
                        {text}
                    </p>
                </div>
            </div>
        </Link>

    )
}