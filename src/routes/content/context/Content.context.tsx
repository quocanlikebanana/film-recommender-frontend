import { createContext } from "react";

interface ContentContextType {
    backdropOpen: boolean;
    handleOpenBackdrop: () => void;
    handleCloseBackdrop: () => void;
}

export const ContentContext = createContext<ContentContextType | undefined>(undefined);