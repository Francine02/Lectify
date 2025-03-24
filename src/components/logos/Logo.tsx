import Link from "next/link";

export function Logo() {
    return (
        <Link href="/">
            <img
                className='w-24 md:w-28 pt-2 mx-auto'
                src="/assets/Logo-header.png"
                alt="Logo escrito: Lectify." />
        </Link>
    )
}