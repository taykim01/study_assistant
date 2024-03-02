import "@/presentation/components/components.css";

export default function Search(props: any) {

    const handleInput = (e: any) => {
        const value = e.target.value;
        props.onChange(value)
    }

    return (
        <div className="search_input__container">
            <div className="search_shadow__input"></div>
            <button className="search_input__button__shadow">
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px">
                    <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fillRule="evenodd" fill="#17202A"></path>
                </svg>
            </button>
            <input type="text" name="text" className="search_input__search" placeholder="What do you want to search?" onChange={handleInput} />
        </div>
    )
}