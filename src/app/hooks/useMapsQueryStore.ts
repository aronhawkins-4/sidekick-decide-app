import { create } from 'zustand';

interface MapsQueryStoreProps {
	queryString: string;
	setQueryString: (input: string) => void;
	resetQueryString: () => void;
}

const useMapsQueryStore = create<MapsQueryStoreProps>()((set) => ({
	queryString: '',
	setQueryString: (input) => set(() => ({ queryString: input })),
	resetQueryString: () => set({ queryString: '' }),
}));
export default useMapsQueryStore;
