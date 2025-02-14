import logo from "../../assets/Logo-header.png";

export function Logo() {
    return (
        <>
            <img
                className='w-24 md:w-32'
                src={logo}
                alt="Logo escrito: Lectify." />
        </>
    )
}