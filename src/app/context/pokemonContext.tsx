'use client'
import { Pokemon } from "@/types/pokemon"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type PokemonContextType = {
    pokemon: Pokemon[];
    types: string[];
    limit: number;
    offset: number;
    activeType: number;
    fetchPokemon: (pokeType: number) => void;
    setLimit: (value: number) => void;
    setOffset: (value: number) => void;
    setActiveType: (calue: number) => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [types, setTypes] = useState<string[]>(["all"]);
    const [limit, setLimit] = useState<number>(20);
    const [offset, setOffset] = useState<number>(0);
    const [activeType, setActiveType] = useState<number>(0);

    function fetchPokemon(){
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
        fetchPokemon()
        fetch('api/types').then((r)=>r.json()).then((d)=>setTypes([...types, ...d]))
    },[])
    
    useEffect(()=>{
        fetchPokemon()
    },[activeType, limit, offset])

    return (
        <PokemonContext.Provider value={{ pokemon, types, limit, offset, activeType, setLimit, setOffset, setActiveType, fetchPokemon }}>
            {children}
        </PokemonContext.Provider>
    )
}

export function usePokemonProvider () {
    const context = useContext(PokemonContext);
    if (!context){
        throw new Error('usePokemonProvider must be used within a PokemonProvider');
    }
    return context;
}