import { PageBlankProps } from "./PageBlankProps";

export function PageBlank({img, text}: PageBlankProps) {
    return (
        <div className=" text-center">
            <img src={img} alt="icone" className="w-20 mx-auto" />
            <p className="text-lg font-semibold text-gray-900">{text}</p>
        </div>
    )
}