import { LinkProps } from "./LinkProps";

export function Links({ img, text, link }: LinkProps) {
    return (
        <a href={link} className="flex justify-center pt-3 hover:opacity-75 items-center" target="_blank">
            {img && (
                <img src={img} alt="Icon" className="mr-2" />
            )}
            <p className="text-center text-[0.8rem] sm:text-[1rem] font-semibold text-text">
                {text}
            </p>
        </a>
    )
}