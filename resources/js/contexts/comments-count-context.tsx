import GetCommentsCount from '@/actions/App/Actions/Admin/Comments/GetCommentsCount';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';

interface CommentsCountContextValue {
    count: number | undefined;
    isLoading: boolean;
    refetch: () => void;
}

const CommentsCountContext = createContext<CommentsCountContextValue | null>(
    null,
);

interface CommentsCountProviderProps {
    children: ReactNode;
}

export function CommentsCountProvider({
    children,
}: CommentsCountProviderProps) {
    const [count, setCount] = useState<number | undefined>();
    const [isLoading, setIsLoading] = useState(true);

    const fetchCount = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(GetCommentsCount.url());
            if (response.ok) {
                const data: { count: number } = await response.json();
                setCount(data.count);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCount();
    }, [fetchCount]);

    return (
        <CommentsCountContext.Provider
            value={{ count, isLoading, refetch: fetchCount }}
        >
            {children}
        </CommentsCountContext.Provider>
    );
}

export function useCommentsCount(): CommentsCountContextValue {
    const context = useContext(CommentsCountContext);
    if (!context) {
        throw new Error(
            'useCommentsCount must be used within CommentsCountProvider',
        );
    }
    return context;
}
