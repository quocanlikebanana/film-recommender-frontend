import { useEffect, useState } from "react";

const useInfiniteScroll = (callback: () => void, offset: number = 200) => {
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;
            const clientHeight = document.documentElement.clientHeight;

            if (scrollHeight - scrollTop - clientHeight < offset && !isFetching) {
                setIsFetching(true);
                callback();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [callback, isFetching, offset]);

    const doneFetching = () => {
        setIsFetching(false);
    };

    return { isFetching, doneFetching };
};


export default useInfiniteScroll;








