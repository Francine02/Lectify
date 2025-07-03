import { Logo } from "../logos/Logo";
import { Language } from "./Language";

export function Header() {
    return (
        <header className="flex justify-between items-center">
            <Logo />

            <div className=" space-x-3">
                <Language />
            </div>
        </header>
    )
}