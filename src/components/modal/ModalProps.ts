import { Dispatch, SetStateAction } from "react"

export interface ModalProps {
    setShowModal: Dispatch<SetStateAction<boolean>>,
    children: React.ReactNode
}