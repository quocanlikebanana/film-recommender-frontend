import { ReactNode, useState } from "react";
import { ContentContext } from "./Content.context";

interface ContentProviderProps {
    children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
    const [backdropOpen, setBackdropOpen] = useState(false);

    const handleOpenBackdrop = () => {
        setBackdropOpen(true);
    };

    const handleCloseBackdrop = () => {
        setBackdropOpen(false);
    };

    return (
        <ContentContext.Provider value={{ backdropOpen, handleOpenBackdrop, handleCloseBackdrop }}>
            {children}
        </ContentContext.Provider>
    );
};