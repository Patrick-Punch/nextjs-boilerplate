import { Pokemon } from "@/types/item"

import { getItemFromCache, setItemInCache } from "./itemCache"

export async function fetchSomePokemon(limit: number, offset: number){
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    const r = await fetch(url)
    const data = await r.json()
    const results = data["results"]
    const pokemon: Pokemon[] = [];

    for (let i = 0; i < results.length; i++){
        pokemon.push(await fetchPokemon(results[i]["url"]))
    }
    return pokemon;
}

async function fetchPokemon(url: string){

    let pokemon = getItemFromCache(url)
    if (pokemon){
        return pokemon
    }

    console.log(`Fetching: ${url}`)
    const r = await fetch(url)
    const data = await r.json()
    pokemon = {
        id: data["id"],
        name: data["name"],
        imgUrl: data["sprites"]["other"]["official-artwork"]["front_default"],
        height: data["height"],
        weight: data["weight"],
        abilities: data["abilities"].map((obj: any)=>obj["ability"]["name"]),
        types: data["types"].map((obj: any)=>obj["type"]["name"]),
    }

    setItemInCache(url, pokemon)
    return pokemon
}

export async function fetchTypes(){
    const r = await fetch("https://pokeapi.co/api/v2/type")
    const data = await r.json()
    return data["results"].map((result: any)=>result.name)
}

