export interface ButtonProps {
    onClick?: (e: React.FormEvent) => void,
    loading?: boolean,
    text: string,
    disabled?: boolean,
    secondary?: boolean,
    className?: string,
    type?: string
}