import React, {ReactNode, createContext, useContext} from 'react';
import {RootStore} from '../stores/RootStore';

let store: RootStore;

const StoreContext = createContext<RootStore | undefined>(undefined);

export function RootStoreProvider({children}: {children: ReactNode}) {
  const root = store ?? new RootStore();

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
}

export function useRootStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }
  return context;
}

export const useCityStore = () => useRootStore().cityStore;

export const useWeatherStore = () => useRootStore().weatherStore;

export const useLanguageStore = () => useRootStore().languageStore;
