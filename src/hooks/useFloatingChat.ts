import { create } from 'zustand'

interface FloatingChatStore {
  isOpen: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
}

export const useFloatingChat = create<FloatingChatStore>((set) => ({
  isOpen: false,
  openChat: () => set({ isOpen: true }),
  closeChat: () => set({ isOpen: false }),
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen }))
}))