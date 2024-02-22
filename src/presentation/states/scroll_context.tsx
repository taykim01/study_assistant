import React from "react";

interface ScrollContextType {
    scrollTo: (location: any) => any;
    refS1: React.RefObject<any>;
    refS2: React.RefObject<any>;
}

export const ScrollContext = React.createContext<any>(null);  