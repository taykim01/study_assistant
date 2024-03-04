import "@/presentation/components/components.css"

export default function Input(props: any) {

    const handleChange = (e: any) => {
        const value = e.target.value;
        props.onChange(value);
    }

    switch (props.type) {
        case "textarea":
            return (
                <textarea
                    name="text"
                    className="component_textarea"
                    disabled={props.disabled || false}
                    onChange={handleChange}
                    defaultValue={props.defaultValue || ""}
                    onBlur={props.onBlur || null}
                />
            )

        default:
            return (
                <input
                    type={props.type}
                    name="text"
                    className="component_input"
                    placeholder={props.placeholder}
                    disabled={props.disabled || false}
                    onChange={handleChange}
                    defaultValue={props.defaultValue || ""}
                />
            )
    }
}