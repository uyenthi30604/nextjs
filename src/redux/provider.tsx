'use client'
import { Provider } from "react-redux";
import { store, AppStore } from "./store";
import React, { useRef } from "react";


export function ReduxProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = store()
    }
    return <Provider store={storeRef.current}>{children}</Provider>
}