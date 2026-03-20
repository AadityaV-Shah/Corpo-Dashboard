import { Table, Text } from "@chakra-ui/react";
import type { SystemStyleObject } from "@chakra-ui/react";

export interface Column<T> {
    header: string;
    accessor: keyof T | string;
    render?: (data: T) => React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    // I am dding an optional styles prop
    styles?: {
        cell?: SystemStyleObject;
        headerText?: SystemStyleObject;
        root?: SystemStyleObject;
    };

    showHeader?: boolean;

}

export function DataTable<T>({ columns, data, styles, showHeader = true }: DataTableProps<T>) {
    return (
        <Table.Root
            width="100%"
            // Merge custom root styles
            css={{ ...styles?.root }}
        >
            {showHeader && (
                <Table.Header>
                    <Table.Row>
                        {columns.map((col, index) => (
                            <Table.ColumnHeader
                                key={index}
                                // Apply cell overrides here
                                css={{
                                    background: "rgb(225, 226, 239)",
                                    p: '3',
                                    ...styles?.cell
                                }}
                            >
                                <Text
                                    fontWeight="md"
                                    color="grey"
                                    {...styles?.headerText} // Apply text overrides
                                >
                                    {col.header}
                                </Text>
                            </Table.ColumnHeader>
                        ))}
                    </Table.Row>
                </Table.Header>
            )}

            <Table.Body>
                {data.map((item, rowIndex) => (
                    <Table.Row key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <Table.Cell
                                key={colIndex}
                                css={{
                                    background: "rgb(225, 226, 239)",
                                    p: '3',
                                    ...styles?.cell
                                }}
                            >
                                {col.render
                                    ? col.render(item)
                                    : (item[col.accessor as keyof T] as React.ReactNode)
                                }
                            </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
}