import {create} from "zustand"

export const useCodeStore = create((set) => ({
    codes: [],
    setCodes: (codes) => set({codes})
}))