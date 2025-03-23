import { TitleProps } from "../../types/TitleProps"
import { SparklesText } from "../magicui/sparkles-text"

export function Title({ title, emphasis, titleContinuation, className, useSparkles }: TitleProps) {
    const content = (
        <h1 className={` ${className ? className : 'text-title-phone sm:text-title-tablet md:text-title-md lg:text-title-lg 2xl:text-title-2x1'} text-center font-black text-text drop-shadow-xl pb-6 `}>
            {title}
            {emphasis &&
                <span className="relative inline-block">
                    <span className="absolute inset-x-0 top-8 sm:top-8 md:top-10 lg:top-12 2xl:top-14 h-2 bg-gradient-to-r from-rosa via-rosa-secundary to-bege rounded-full"></span>
                    <span className="relative z-10 px-2">
                        {emphasis}
                    </span>
                </span>
            }
            {titleContinuation}
        </h1>
    );

    return useSparkles ? (
        <SparklesText colors={{ first: '#F2D3AC', second: '#ff0059b8' }} className="max-w-96 sm:max-w-[30rem] md:max-w-[40rem] mx-auto">
            {content}
        </SparklesText>
    ) : content;
}