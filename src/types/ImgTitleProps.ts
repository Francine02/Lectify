import { Url } from "next/dist/shared/lib/router/router";

export interface ImagTitleProps {
    img?: string,
    link?: string,
    text: string
}

export interface CardProps extends ImagTitleProps {
    href: Url;
}