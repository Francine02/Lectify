export interface InputProps {
    type: 'text' | 'email',
    placeholder: string,
    errorMessage: string | undefined,
    errors: boolean
}