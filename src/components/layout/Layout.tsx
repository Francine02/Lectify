import { useRouter } from "next/router";
import { ReactNode } from "react";
import Animated from "../animations/Animation";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    const router = useRouter();
    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-bg-dark dark:bg-[radial-gradient(#141414_1px,transparent_1px)] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="pt-5 md:pt-7 px-8 sm:px-12 md:px-20 lg:px-24 xl:px-28 2xl:px-36">
                <Header />
                <div className="table w-full h-[calc(100vh-6rem)]">
                    <div className="table-cell align-middle">
                        <Animated key={router.asPath} direction="down">
                            {children}
                        </Animated>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}