import { useState } from "react"

//Encapsulates data necessary for an input form
export const useForm = (type) => {
    const [value, setValue] = useState("")

    const onChange = (e) => {
        setValue(e.target.value)
    }

    //Method is named onReset to use obj destructuring
    //Attrs starting with on are not passed, so this won't cause warnings
    const onReset = () => setValue("")

    return {
        type, value, onChange, onReset
    }
}