import { Dispatch, SetStateAction } from "react"
import { Border } from "../finishQuiz/Border"

interface ModalProps {
    setShowModal: Dispatch<SetStateAction<boolean>>
    children: React.ReactNode
}

export function Modal({ setShowModal, children }: ModalProps) {
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-200/35 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <div className="relative transform overflow-hidden rounded-lg bg-white transition-all max-w-lg">
                        <Border />
                        <p onClick={() => setShowModal(false)} className="flex justify-end pr-5 pt-2 text-gray-500 cursor-pointer">x</p>
                        <div className="bg-white px-5 pb-8 ">
                            <div className="sm:flex sm:items-start">
                                <div>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}