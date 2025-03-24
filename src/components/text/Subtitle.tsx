import { TitleProps } from "./title/TitleProps";

export function Subtitle({ title }: TitleProps) {
    return (
        <p className="text-center text-secondary-phone sm:text-secondary-tablet font-semibold">
            {title}
        </p>
    )
}