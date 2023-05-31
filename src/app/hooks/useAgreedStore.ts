import { create } from 'zustand';

interface AgreedStoreProps {
	agreedName: string;
	agreedList: string[];
	setAgreedName: (name: string) => void;
	resetAgreedName: () => void;
	pushAgreedList: (name: string) => void;
	resetAgreedList: () => void;
	removeAgreedList: (name: string) => void;
}

const useAgreedStore = create<AgreedStoreProps>()((set) => ({
	agreedName: '',
	agreedList: [],
	setAgreedName: (name) => set(() => ({ agreedName: name })),
	resetAgreedName: () => set({ agreedName: '' }),
	pushAgreedList: (name) => set((state) => ({ agreedList: [...state.agreedList, name] })),
	resetAgreedList: () => set({ agreedList: [] }),
	removeAgreedList: (name) => set((state) => ({ agreedList: state.agreedList.filter((item) => item !== name) })),
}));
export default useAgreedStore;
