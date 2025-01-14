import { useContext } from "react";
import { ContentContext } from "./Content.context";

export const useContentContext = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useBackdrop must be used within a BackdropProvider');
    }
    return context;
};