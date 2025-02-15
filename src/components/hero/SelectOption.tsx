import { TitleProps } from "../../types/TitleProps";

export function SelectOption({ title }: TitleProps) {
    return (
        <p className="text-center text-secondary-phone sm:text-secondary-tablet pt-10 font-semibold">
            {title}
        </p>
    )
}