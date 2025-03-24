import React from "react";

export interface RadioPros {
    text: string,
    value: string,
    checked: boolean,
    onChange: ( e: React.ChangeEvent<HTMLInputElement> ) => void
}