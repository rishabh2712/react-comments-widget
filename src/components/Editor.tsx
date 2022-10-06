import { useEffect, useRef, useState } from "react"

import { ActionTypes } from "../types";
import Button from "./Button";
import useCommentsStore from '../hooks/use-comments-store'

function Editor({
    id,
    initiateReply,
    mutate,
}) {
    const { store } = useCommentsStore()
    const isCommited = typeof id !== "undefined"
    const [value, setValue] = useState(isCommited ? store?.get(id)?.text : "");
    const inputRef = useRef<HTMLInputElement>(null)
    const [isEdit, setEdit] = useState(id ? false : true);

    const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        if (inputRef.current && isEdit) {
            inputRef.current.focus();
        }
    }, [isEdit])

    const update = (type?: ActionTypes) => {
        /**
         * In case of commited comment, but non ieditable, simply make the edit enable
         */
        if (type === ActionTypes.UPDATE && !isEdit) {
            setEdit(true)
            return
        }

        /**
         * Incase of the edit is enabled, pressing cancel should disable the edit mode
         */
        if (type === ActionTypes.DELETE && isEdit) {
            setEdit(false)
            return
        }

        mutate(value, type)
        setEdit(false)
    }

    return (
        <div className="p-2">
            {isEdit ? (
                <input
                    ref={inputRef}
                    value={value}
                    onChange={handleInput}
                    type="textarea"
                    className="
                        form-control
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        border-solid border-2 border-sky-500
                    "
                    id="exampleFormControlInput1"
                    placeholder="What are your thoughts?"
                />
            ) : (
                <span>{value}</span>
            )}
            <div className="flex gap-x-0.5 mt-2">
                {!isEdit && <Button onClick={initiateReply}><i className="fa fa-reply mr-2" aria-hidden="true"></i>Reply</Button>}
                <Button className="mr-2" onClick={() => update(isCommited ? ActionTypes.UPDATE : ActionTypes.ADD)}>{isEdit ? "Save" : "Edit"}</Button>
                <Button className="mr-2" onClick={() => update(ActionTypes.DELETE)}>{isEdit ? "Cancel" : "Delete"}</Button>
            </div>
        </div>
    )
}

export default Editor