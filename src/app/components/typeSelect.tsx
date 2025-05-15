import { Box, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";

import { usePokemonProvider } from "@/app/context/itemContext";



export default function TypeSelect(){

    const {
        types, limit, offset, activeType,
        setLimit, setOffset, setActiveType } = usePokemonProvider();

    return (
        <Box sx={{display: "flex", flexDirection: "row", width: "100%", m:2}}>
            <TextField
                id="limit"
                label="Limit"
                type="number"
                variant="outlined"
                value={limit}
                onChange={(e)=>setLimit(parseInt(e.target.value))}
                sx={{width: "100%", m: 2}} />
            <TextField
                id="offset"
                label="Offset"
                type="number"
                variant="outlined"
                value={offset}
                onChange={(e)=>setOffset(parseInt(e.target.value))}
                sx={{width: "100%", m: 2}} />        
            <FormControl fullWidth sx={{m: 2}}>
                <InputLabel id="types-select-label">Types</InputLabel>
                <Select
                sx={{textTransform: "capitalize"}}
                labelId="types-select-label"
                id="types-select"
                value={types[activeType]}
                label="Types"
                onChange={(e)=>setActiveType(types.indexOf(e.target.value.toString()))}
                >
                {
                types.map((type, i)=>
                    <MenuItem key={i} value={type} sx={{textTransform: "capitalize"}}>{type}</MenuItem>
                )
                }
                </Select>
            </FormControl>
        </Box>
    )
}