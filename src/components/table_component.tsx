import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import type {
    BattingStatResponse,
    BattingStatRow,
} from "../interfaces/batting_stats";
import { useEffect, useState } from "react";
import { battingColumns } from "./batting_table";
import { pitchingColumns } from "./pitching_table";
import {
    type PitchingStatRow,
    type PitchingStatResponse,
} from "../interfaces/pitching_stats";

export function StatsTable(props: {
    data: BattingStatResponse | PitchingStatResponse;
    [key: string]: any;
}) {
    // Set up react table
    const table = useReactTable<BattingStatRow | PitchingStatRow>({
        data: props.data?.results ?? [],
        columns: Object.values(
            props.type == "batting" ? battingColumns : pitchingColumns
        ),
        getCoreRowModel: getCoreRowModel(),
        rowCount: props.data?.count,
        state: {
            pagination: props.pagination,
            sorting: props.sorting,
        },
        onSortingChange: props.setSorting,
        isMultiSortEvent: (e: any) => e.ctrlKey || e.shiftKey || e.metaKey,
        onPaginationChange: props.setPagination,
        manualPagination: true,
    });

    // Proxy to allow input for page to update before page rerenders
    const [pageIndexProxy, setPageIndexProxy] = useState(
        props.pagination.pageIndex
    );
    useEffect(() => {
        props.setPagination({
            pageIndex: pageIndexProxy,
            pageSize: props.pagination.pageSize,
        });
    }, [pageIndexProxy]);
    return (
        <div className="p-2">
            <div className="h-2" />
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: " ⏶",
                                                    desc: " ⏷",
                                                }[
                                                    header.column.getIsSorted() as string
                                                ] ?? null}
                                            </div>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="h-2" />
            <div className="flex items-center gap-2">
                <button
                    className="border rounded p-1"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<<"}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<"}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {">"}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {">>"}
                </button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount().toLocaleString()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    {/* Select page number */}
                    <input
                        type="number"
                        max={table.getPageCount()}
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : props.pagination.pageIndex;
                            if (page < 0 || page >= table.getPageCount()) {
                                // Revert to previous input if out of bounds
                                e.target.value = (
                                    props.pagination.pageIndex + 1
                                ).toString();
                                return;
                            }
                            setPageIndexProxy(page);
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
                {props.data.loading ? "Loading..." : null}
                {props.data.error ? props.data.errorMessage : null}
            </div>
            <div>
                Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
                {table.getRowCount().toLocaleString()} Rows
            </div>
            <div>
                <button onClick={() => null}>Force Rerender</button>
            </div>
            <pre>{JSON.stringify(props.pagination, null, 2)}</pre>
        </div>
    );
}
