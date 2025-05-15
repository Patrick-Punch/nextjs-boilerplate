import { Pokemon } from "@/types/item";

// map variable
const cachedPokemon= new Map<string, Pokemon>()

// setPokemonInCache
export function setPokemonInCache(url: string, pokemon: Pokemon){
    cachedPokemon.set(url, pokemon)
}

// getPokemonFromCache
export function getPokemonFromCache(url: string) {
    return cachedPokemon.get(url)
}