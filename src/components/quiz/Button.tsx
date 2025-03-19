import { Loading } from "./Loading";

interface ButtonProps {
    onClick: (e: React.FormEvent) => void,
    loading: boolean,
    text: string,
    disabled?: boolean
}

export function Button({ onClick, loading, text, disabled }: ButtonProps) {
    return (
        <button disabled={disabled} className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:brightness-[96%] '} pt-5 grid items-center justify-center transition duration-100 ease-in-out mx-auto sm:m-0`} onClick={onClick}>
            <div className={`${disabled ? '' : 'hover:from-bege hover:to-rosa transition duration-100 ease-in-out'} rounded-xl bg-gradient-to-t from-rosa to-bege p-[0.1rem] `}>
                <div className="grid items-center justify-center bg-bg-components px-14 py-1.5 rounded-xl w-20">

                    {loading ? (
                        <Loading />
                    ) : (
                        <p className="text-center text-[0.8rem] sm:text-[1rem] font-bold text-text">
                            {text}
                        </p>
                    )}
                </div>
            </div>
        </button>

    )
}