import "@/presentation/components/components.css";
import { useEffect, useState } from "react";

export default function Toggle(props: any) {
    const [checked, setChecked] = useState(props.checked || false)

    useEffect(() => {
        props.takeChecked(checked)
    }, [checked])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <div className="component_toggle_heart-container" style={{ width: props.size, height: props.size }}>
            <input className="component_toggle_checkbox" type="checkbox" checked={checked} onClick={() => setChecked(!checked)} onChange={handleChange} />
            <div className="component_toggle_svg-container">
                <svg xmlns="http://www.w3.org/2000/svg" className="component_toggle_svg-outline" viewBox="0 0 24 24">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="component_toggle_svg-filled" viewBox="0 0 24 24">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" height={props.size} width={props.size} className="component_toggle_svg-celebrate">
                    <polygon points="10,10 20,20"></polygon>
                    <polygon points="10,50 20,50"></polygon>
                    <polygon points="20,80 30,70"></polygon>
                    <polygon points="90,10 80,20"></polygon>
                    <polygon points="90,50 80,50"></polygon>
                    <polygon points="80,80 70,70"></polygon>
                </svg>
            </div>
        </div>
    )
}