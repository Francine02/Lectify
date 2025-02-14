import { Language } from "./Language";
import { Logo } from "./Logo";

export function Header() {
    return (
        <header className="flex justify-between items-center">
            <Logo />
            <Language />
        </header>
    )
}