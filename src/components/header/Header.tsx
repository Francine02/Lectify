import { Language } from "./Language";
import { Logo } from "../logos/Logo";
import { ToggleTheme } from "./ToggleTheme";

export function Header() {
    return (
        <header className="flex justify-between items-center">
            <Logo />

            <div className=" space-x-3">
                <Language />
                <ToggleTheme />
            </div>
        </header>
    )
}