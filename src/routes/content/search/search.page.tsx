import { useLocation } from 'react-router-dom';

export default function SearchPage() {
    const location = useLocation();
    const searchQuery = location.state?.query || "";

    return (
        <div>Search: {searchQuery}</div>
    )
}
