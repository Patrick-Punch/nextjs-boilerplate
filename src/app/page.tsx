'use client';

import { useState } from "react";
import { Pokemon } from "@/types/item";
import { Box } from "@mui/material";

import TypeSelect from "./components/typeSelect";
import PokemonTable from "./components/pokemonTable";
import GenericTable from "./components/table"

export default function Home() {

  const [data, setData] = useState<Pokemon[]>([]);

  return (
    <Box>
      <TypeSelect/>
      <PokemonTable/>
    </Box>
  );
}
