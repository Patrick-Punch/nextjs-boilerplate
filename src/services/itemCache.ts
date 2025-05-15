import { Pokemon } from "@/types/item";

// map variable
const cachedItem= new Map<string, Pokemon>()

// setPokemonInCache
export function setItemInCache(url: string, pokemon: Pokemon){
    cachedItem.set(url, pokemon)
}

// getPokemonFromCache
export function getItemFromCache(url: string) {
    return cachedItem.get(url)
}