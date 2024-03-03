import "@/presentation/components/components.css";
import Button from "../button";
import Toggle from "../toggle";
import Input from "../inputs";
import { useState } from "react";
import highlightKeyword from "@/presentation/utils/highlightKeyword";

export default function Cards(props: any) {
    const [edit, setEdit] = useState(props.subtitle)
    const [editStatus, setEditStatus] = useState(false)

    const handleEdit = () => {
        props.edit(props.id, edit)
        setEditStatus(false)
    }

    const content = highlightKeyword(props.subtitle, props.title)

    return (
        <div className="component_cards">
            <div className="vf gap12 w100">
                <div className="hf gap28 ca w100 sbj">
                    <div className="vf gap8">
                        <div className="h5">{props.title.toUpperCase()}</div>
                        <div className="p4">{props.date}</div>
                    </div>
                    <Toggle
                        size={20}
                        takeChecked={(e: boolean) => props.star(e)}
                    />
                </div>
                {
                    editStatus
                        ? <Input
                            type="textarea"
                            defaultValue={props.subtitle}
                            onChange={(e: string) => setEdit(e)}
                            onBlur={() => handleEdit()}
                        />
                        : <div className="p3">{content}</div>
                }
            </div>
            <div className="hf ca gap8">
                <Button type="edit" size={40} onClick={() => setEditStatus(true)} />
                <Button type="delete" size={40} onClick={props.delete} />
            </div>
        </div>
    )
}