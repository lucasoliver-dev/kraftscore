'use client'

import React, { createContext, useContext, useRef, type ReactNode } from 'react'
import { FootballStore } from '@/stores/FootballStore'
import { PredictionStore } from '@/stores/PredictionStore'

/**
 * Root MobX store that aggregates all domain stores.
 */
export class RootStore {
  /**
   * Store responsible for football fixtures and leagues.
   */
  footballStore: FootballStore
  /**
   * Store responsible for AI predictions per fixture.
   */
  predictionStore: PredictionStore

  /**
   * Creates a new RootStore instance and initializes all sub-stores.
   */
  constructor() {
    this.footballStore = new FootballStore()
    this.predictionStore = new PredictionStore()
  }
}

/**
 * React context that provides access to the RootStore instance.
 */
const StoreContext = createContext<RootStore | null>(null)

/**
 * Props for the StoreProvider component.
 */
type StoreProviderProps = {
  /**
   * React children to be rendered inside the provider.
   */
  children: ReactNode
}

/**
 * Provides a single RootStore instance for the React component tree.
 *
 * @param props - The component props.
 * @param props.children - React children.
 */
export const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<RootStore>()

  if (!storeRef.current) {
    storeRef.current = new RootStore()
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  )
}

/**
 * Custom hook to access the RootStore inside React components.
 *
 * @returns The RootStore instance.
 * @throws If used outside of StoreProvider.
 */
export const useStores = (): RootStore => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStores must be used within a StoreProvider')
  }

  return context
}
