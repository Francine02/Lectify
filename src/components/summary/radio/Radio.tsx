import { RadioPros } from "@/src/components/summary/radio/RadioProps";

export function Radio({ value, text, checked, onChange }: RadioPros) {
    return (
        <div className="flex items-center justify-center my-2 sm:my-0">
            <label
                className="relative flex items-center cursor-pointer bg-[#D9D9D9] rounded-full"
                form={value}>
                <input
                    checked={checked}
                    onChange={onChange}
                    name="format"
                    value={value}
                    type="radio"
                    className="peer checked:bg-gradient-to-b checked:from-rosa checked:via-rosa-secundary checked:to-bege border-none h-4 w-4 cursor-pointer appearance-none rounded-full border transition-all"
                    id={value} />
                <span
                    className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transformm -translate-x-1/2 -translate-y-1/2">
                </span>
            </label>
            <label
                className="ml-2 font-medium cursor-pointer text-sm"
                form={value}>{text}</label>

        </div>
    )
}