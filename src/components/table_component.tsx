import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import type {
    BattingStatResponse,
    BattingStatRow,
} from "../interfaces/batting_stats";
import { useEffect, useState, useMemo } from "react";
import { battingColumns } from "./batting_table";
import { pitchingColumns } from "./pitching_table";
import {
    type PitchingStatRow,
    type PitchingStatResponse,
} from "../interfaces/pitching_stats";
import "./table.css";
import Skeleton from "@mui/material/Skeleton";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export function StatsTable(props: {
    data: BattingStatResponse | PitchingStatResponse;
    [key: string]: any;
}) {
    const columns = useMemo(() => Object.values(
            props.type == "batting" ? battingColumns : pitchingColumns
    ), [props.type]);
    const tableData = useMemo(
        () => (props.data.loading || props.data.queryChanged || props.data.error ? Array(props.pagination.pageSize).fill({}) : props.data.results),
        [props.data.loading, props.data.queryChanged, props.data.error, props.data.results]
    );
    const tableColumns = useMemo(
        () =>
        props.data.loading || props.data.queryChanged || props.data.error
            ? columns.map((column) => ({
                ...column,
                cell: () => <Skeleton animation={props.data.queryChanged || props.data.error ? false : "wave"} variant="text" sx={{ fontSize: '10pt' }} />,
            }))
            : columns,
        [props.data.loading, props.data.queryChanged, props.data.error]
    );
    // Set up react table
    const table = useReactTable<BattingStatRow | PitchingStatRow>({
        data: tableData,
        columns: tableColumns,
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
        defaultColumn: {
            size: 60, //starting column size
            minSize: 50, //enforced during column resizing
            maxSize: 100, //enforced during column resizing
        },
    });

    useEffect(() => {
        if (!props.data.results || props.data.results.length === 0) return;
        let hide_start_and_end = (props.data.results ?? []).every(it => it.start_year == it.end_year);
        table.setColumnVisibility({
            year: props.data.results[0]?.year == "N/A" ? false : true,
            player_id: props.data.results[0]?.player_id == "N/A" ? false : true,
            month: props.data.results[0]?.month == "N/A" ? false : true,
            win: props.data.results[0]?.win == "N/A" ? false : true,
            loss: props.data.results[0]?.loss == "N/A" ? false : true,
            day: props.data.results[0]?.day == "N/A" ? false : true,
            game_id: props.data.results[0]?.game_id == "N/A" ? false : true,
            start_year: !hide_start_and_end,
            end_year: !hide_start_and_end,
        })
    }, [props.data.results]);

    // Proxy state to allow input for page to update before page rerenders
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
            {props.data.queryChanged && !(props.data.loading) ? (
                // Show button to update data if table is disabled
                <>
                    <div className="table-data-update-button">
                        <button
                            className="border rounded p-1"
                            onClick={() => props.updateData()}
                        >
                            Update Data
                        </button>
                    </div>
                </>
            ) : null}
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer className="h-2">
                    <Table className="stats-table" size="small">
                        <TableHead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableCell
                                                key={header.id}
                                                colSpan={header.colSpan}
                                                style={{ minWidth: `${header.getSize()}px` }}
                                                sortDirection={header.column.getIsSorted() ? header.column.getIsSorted() : false}
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <TableSortLabel
                                                        active={header.column.getIsSorted() !== false}
                                                        // @ts-ignore
                                                        direction={
                                                            header.column.getIsSorted() === "asc" || header.column.getIsSorted() === "desc"
                                                                ? header.column.getIsSorted()
                                                                : "asc"
                                                        }
                                                        onClick={header.column.getToggleSortingHandler()}
                                                        hideSortIcon={true}
                                                    >
                                                        {flexRender(
                                                            header.column.columnDef
                                                                .header,
                                                            header.getContext()
                                                        )}
                                                    </TableSortLabel>
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => {
                                return (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                        <TableFooter>
                            {table.getFooterGroups().map(footer => (
                                <TableRow key={footer.id}>
                                    {footer.headers.map(header => (
                                        <TableCell key={header.id} colSpan={header.colSpan}>
                                            {flexRender(
                                                header.column.columnDef.footer,
                                                header.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableFooter>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100, 200, { label: 'All', value: -1 }]}
                    component="div"
                    colSpan={3}
                    count={props.data?.count ?? 0}
                    rowsPerPage={props.pagination.pageSize}
                    page={props.pagination.pageIndex}
                    slotProps={{
                        select: {
                        inputProps: {
                            'aria-label': 'rows per page',
                        },
                        native: true,
                        },
                    }}
                    onPageChange={(_, newPage) => {
                        props.setPagination({
                            pageIndex: newPage,
                            pageSize: props.pagination.pageSize
                        })
                    }}
                    onRowsPerPageChange={(event) => {
                        props.setPagination({
                            pageIndex: props.pagination.pageIndex,
                            pageSize: +event.target.value === -1 ? props.data.count : parseInt(event.target.value, 10)
                        })
                    }}
                    ActionsComponent={TablePaginationActions}
                />
            </Paper>
        </div>
    );
}
