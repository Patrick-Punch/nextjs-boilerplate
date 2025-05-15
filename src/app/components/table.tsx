import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

type TableProps<T> = {
    headers: string[];
    data: T[];
    renderRow: (row: T) => React.ReactNode;
};

export default function GenericTable<T>({ headers, data, renderRow }: TableProps<T>) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header, i) => (
                            <TableCell key={i}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={i}>{renderRow(row)}</TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
