import "@/presentation/components/components.css"

export default function Input(props: any) {

    const handleChange = (e: any) => {
        const value = e.target.value;
        props.onChange(value);
    }

    return (
        <input
            type="text"
            name="text"
            className="component_input"
            placeholder={props.placeholder}
            disabled={props.disabled || false}
            onChange={handleChange}
            defaultValue={props.defaultValue || ""}
        />
    )
}