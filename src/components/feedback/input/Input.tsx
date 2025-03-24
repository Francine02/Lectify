import { forwardRef, ForwardRefRenderFunction } from "react"
import { Error } from "../../error/Error"
import { InputProps } from "./InputProps";

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ type, placeholder, errors, errorMessage, ...rest }, ref) => {
    return (
        <div className="relative">
            <input
                {...rest}
                ref={ref}
                className='w-full px-2 py-2 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]'
                type={type}
                placeholder={placeholder} />
            {errors && <Error className=" pt-1" text={errorMessage} />}
        </div>
    )
}

export const Input = forwardRef(InputBase);