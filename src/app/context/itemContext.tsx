'use client'
import { Pokemon } from "@/types/item"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type itemContextType = {
    pokemon: Pokemon[];
    types: string[];
    limit: number;
    offset: number;
    activeType: number;
    fetchItem: (pokeType: number) => void;
    setLimit: (value: number) => void;
    setOffset: (value: number) => void;
    setActiveType: (calue: number) => void;
}

const ItemContext = createContext<itemContextType | undefined>(undefined);

export const ItemProvider = ({ children }: { children: ReactNode }) => {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [types, setTypes] = useState<string[]>(["all"]);
    const [limit, setLimit] = useState<number>(20);
    const [offset, setOffset] = useState<number>(0);
    const [activeType, setActiveType] = useState<number>(0);

    function fetchItem(){
        if (activeType == 0){
            fetch(`/api/pokemon?limit=${limit}&offset=${offset}`).
            then((r)=>r.json()).
            then((d)=>setPokemon(d))
        }
        else {
            fetch(`/api/pokemon?limit=${limit}&offset=${offset}&type=${types[activeType]}`).
            then((r)=>r.json()).
            then((d)=>setPokemon(d))
        }
    }
    useEffect(()=>{
        fetchItem()
        fetch('api/types').then((r)=>r.json()).then((d)=>setTypes([...types, ...d]))
    },[])
    
    useEffect(()=>{
        fetchItem()
    },[activeType, limit, offset])

    return (
        <ItemContext.Provider value={{ pokemon, types, limit, offset, activeType, setLimit, setOffset, setActiveType, fetchItem }}>
            {children}
        </ItemContext.Provider>
    )
}

export function usePokemonProvider () {
    const context = useContext(ItemContext);
    if (!context){
        throw new Error('usePokemonProvider must be used within a PokemonProvider');
    }
    return context;
}