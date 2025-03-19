export function Subtitle({ title }: { title: string }) {
    return (
        <h2 className="py-3 font-serif sm:text-secondary-tablet w-full md:w-[35rem] mx-auto">
            {title}
        </h2>
    )
}