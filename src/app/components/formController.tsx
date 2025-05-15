import { Box, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import React from "react";

interface FormField {
    id: string;
    label: string;
    type: "text" | "number" | "select";
    value: string | number;
    options?: string[]; // For select fields
    onChange: (value: string | number) => void;
}

interface FormControllerProps {
    fields: FormField[];
}

export default function FormController({ fields }: FormControllerProps) {
    return (
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", m: 2 }}>
            {fields.map((field) => {
                if (field.type === "select" && field.options) {
                    return (
                        <FormControl key={field.id} fullWidth sx={{ m: 2 }}>
                            <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
                            <Select
                                sx={{ textTransform: "capitalize" }}
                                labelId={`${field.id}-label`}
                                id={field.id}
                                value={field.value}
                                label={field.label}
                                onChange={(e) => field.onChange(e.target.value)}
                            >
                                {field.options.map((option, i) => (
                                    <MenuItem key={i} value={option} sx={{ textTransform: "capitalize" }}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    );
                }

                return (
                    <TextField
                        key={field.id}
                        id={field.id}
                        label={field.label}
                        type={field.type}
                        variant="outlined"
                        value={field.value}
                        onChange={(e) => field.onChange(field.type === "number" ? parseInt(e.target.value || "0") : e.target.value)}
                        sx={{ width: "100%", m: 2 }}
                    />
                );
            })}
        </Box>
    );
}