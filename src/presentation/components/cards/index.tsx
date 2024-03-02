import "@/presentation/components/components.css";
import Button from "../button";
import Toggle from "../toggle";

export default function Cards(props: any) {
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
                <div className="p3">{props.subtitle}</div>
            </div>
            <div className="hf ca gap8">
                <Button type="edit" size={40} onClick={props.edit} />
                <Button type="delete" size={40} onClick={props.delete} />
            </div>
        </div>
    )
}