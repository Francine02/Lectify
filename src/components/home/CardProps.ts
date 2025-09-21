import { LinkProps } from "@/components/footer/LinkProps";
import { Url } from "next/dist/shared/lib/router/router";

export interface CardProps extends LinkProps {
  href: Url;
}
