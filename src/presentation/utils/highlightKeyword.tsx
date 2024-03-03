import { useMemo } from "react";

export default function highlightKeyword(text: string, keyword: string) {
    const highlightedText = useMemo(() => {
        const regex = new RegExp(`(${keyword})`, "gi");
        return { __html: text.replace(regex, "<mark>$1</mark>")};
    }, [text, keyword]);

    return <p dangerouslySetInnerHTML={highlightedText} />;
}