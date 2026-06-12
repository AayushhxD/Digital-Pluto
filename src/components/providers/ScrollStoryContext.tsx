'use client'

import { createContext, useContext, useRef, type ReactNode } from 'react'

export interface ScrollStoryState {
  progress: number
  cameraZ: number
  planetScale: number
  cardsOpacity: number
  nebulaIntensity: number
}

const defaultState: ScrollStoryState = {
  progress: 0,
  cameraZ: 0,
  planetScale: 1,
  cardsOpacity: 1,
  nebulaIntensity: 0.6,
}

const ScrollStoryContext = createContext<ScrollStoryState>(defaultState)
const ScrollStorySetterContext = createContext<React.MutableRefObject<ScrollStoryState> | null>(null)

export function ScrollStoryProvider({ children }: { children: ReactNode }) {
  const stateRef = useRef<ScrollStoryState>({ ...defaultState })

  return (
    <ScrollStorySetterContext.Provider value={stateRef}>
      <ScrollStoryContext.Provider value={stateRef.current}>
        {children}
      </ScrollStoryContext.Provider>
    </ScrollStorySetterContext.Provider>
  )
}

export function useScrollStoryRef() {
  const ref = useContext(ScrollStorySetterContext)
  if (!ref) throw new Error('useScrollStoryRef must be used within ScrollStoryProvider')
  return ref
}

export function useScrollStory() {
  return useContext(ScrollStoryContext)
}
