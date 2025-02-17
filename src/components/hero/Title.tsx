import { TitleProps } from "../../types/TitleProps"

export function Title({ title, emphasis, titleContinuation }: TitleProps) {
    return (
        <h1 className="text-title-phone sm:text-title-tablet md:text-title-md lg:text-title-lg 2xl:text-title-2x1 text-center font-black text-text drop-shadow-xl pb-10">
            {title}
            <span className="bg-gradient-to-r from-rosa via-rosa-secundary to-bege bg-[length:100%_0.5rem] bg-no-repeat bg-bottom pb-1"> {emphasis}
            </span>
            {titleContinuation}
        </h1>
    )
}