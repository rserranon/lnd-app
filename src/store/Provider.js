import React, {createContext, useContext} from "react"

const StoreContext = createContext(undefined)

function StoreProvider({children, store}) {
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}

function useStore() {
    const store = useContext(StoreContext)
    if (!store)
        throw new Error('useStore() must be used within a StoreProvider.');
    return store
}

export {StoreProvider, useStore}