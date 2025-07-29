
import { filter_home_form, innings_form, valid_operators } from "../data/select_forms";
import { valid_filter_cols } from "../data/database_columns";
import { useState } from "react";
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Chip from "@mui/material/Chip"
import ListItemText from "@mui/material/ListItemText"
import Checkbox from "@mui/material/Checkbox"

export function SelectInput(props: {
    disabled: boolean;
    options: any[];
    state: any;
    setState: (value: any) => void;
    label: string;
    onChange?: (selected: any) => void;
}) {
    return (
        <>
        <InputLabel>{props.label}</InputLabel>
        <Select
            disabled={props.disabled}
            onChange={props.onChange || ((event) => props.setState(event.target.value))}
            value={props.state}
        >
        {props.options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
            {option.label}
            </MenuItem>
        ))}
        </Select>
        </>
    );
}

export function CreatableMulti(props: {
    disabled: boolean;
    options: any[];
    state: any;
    setState: (value: any) => void;
    label: string;
    onChange?: (selected: any) => void;
    forceUpperCase?: boolean;
    length?: number;
    forceInteger?: boolean;
    minNumber?: number;
    maxNumber?: number;
    placeholder?: string;
}) {
    return (
        <Autocomplete
            multiple
            id="tags-filled"
            options={props.options.map((option) => option.value)}
            value={props.state}
            onChange={((_, selected) => {
                console.log(selected)
                if (selected) {
                    props.setState(selected.filter(it => {
                        if (props.length && it.length !== props.length) return false;
                        if (props.forceInteger && isNaN(Number(it.value))) return false;
                        if (props.forceInteger) {
                            if (props.minNumber && Number(it.value) < props.minNumber) return false;
                            if (props.maxNumber && Number(it.value) > props.maxNumber) return false;
                        }
                        return true;
                    }).map(it => {
                        if (props.forceUpperCase) {
                            return it.toUpperCase();
                        }
                        if (props.forceInteger) {
                            return Number(it)
                        }
                        return it.value;
                    }));
                } else {
                    props.setState([]);
                }
            })}
            freeSolo
            renderValue={(value: readonly string[], getItemProps) =>
                value.map((option: string, index: number) => {
                const { key, ...itemProps } = getItemProps({ index });
                return (
                    <Chip variant="outlined" label={option} key={key} {...itemProps} />
                );
                })
            }
            renderInput={(params) => (
                <TextField
                {...params}
                variant="filled"
                label={props.label}
                placeholder={props.placeholder}
                />
            )}
            disableCloseOnSelect
        />
    );
}

export function MultiInput(props: {
    disabled: boolean;
    options: any[];
    state: any;
    setState: (value: any) => void;
    label: string;
    onChange?: (selected: any) => void;
}) {
    return (
        <>
            <InputLabel>{props.label}</InputLabel>
            <Select
                multiple
                disabled={props.disabled}
                onChange={props.onChange || ((event) => props.setState(event.target.value))}
                value={props.state}
                renderValue={(value: string[]) =>
                    value.map((option: string, index: number) => {
                    return (
                        <Chip variant="outlined" label={props.options.find((o) => o.value === option)?.label} key={index} />
                    );
                    })
                }
            >
            {props.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    <Checkbox checked={props.state.includes(option.value)} />
                    <ListItemText primary={option.label} />
                </MenuItem>
            ))}
            </Select>
        </>
    )
    // return (
    //     <div className="select-container">
    //         <label>{props.label}</label>
    //         <Select
    //             isClearable
    //             isMulti
    //             isDisabled={props.disabled}
    //             options={props.options}
    //             closeMenuOnSelect={false}
    //             onChange={props.onChange || ((selected) => {
    //                 if (selected) {
    //                     props.setState(selected.map((s: any) => s.value));
    //                 } else {
    //                     props.setState([]);
    //                 }
    //             })}
    //             value={props.state.map((elem: any) => {
    //                 const found = props.options.find(
    //                     (t: any) => t.value === elem
    //                 );
    //                 return found;
    //             })}
    //         />
    //     </div>
    // );
}

export function InningFilter(props: {
    disabled: boolean;
    filterHome: string;
    setFilterHome: (value: string) => void;
    filterOpposing: boolean;
    setFilterOpposing: (value: boolean) => void;
    filterInnings: number[];
    setFilterInnings: (value: number[]) => void;
    filterTop: boolean[];
    setFilterTop: (value: boolean[]) => void;
    filterStats: string[];
    setFilterStats: (value: string[]) => void;
    filterValues: string[];
    setFilterValues: (value: string[]) => void;
    filterOperators: string[];
    setFilterOperators: (value: string[]) => void;
}) {
    const [numFilters, setNumFilters] = useState(0);
    const addFilter = () => {
        setNumFilters(numFilters + 1);
        props.setFilterInnings([...props.filterInnings, 1]);
        props.setFilterTop([...props.filterTop, false]);
        props.setFilterStats([...props.filterStats, ""]);
        props.setFilterValues([...props.filterValues, ""]);
        props.setFilterOperators([...props.filterOperators, ""]);
    };
    const removeFilter = (index: number) => {
        setNumFilters(numFilters - 1);
        props.setFilterInnings(props.filterInnings.filter((_, i) => i !== index));
        props.setFilterTop(props.filterTop.filter((_, i) => i !== index));
        props.setFilterStats(props.filterStats.filter((_, i) => i !== index));
        props.setFilterValues(props.filterValues.filter((_, i) => i !== index));
        props.setFilterOperators(props.filterOperators.filter((_, i) => i !== index));
    };
    return (
        <div className="inning-filter">
            { numFilters > 0 && <>
                <SelectInput
                    disabled={props.disabled}
                    options={filter_home_form}
                    state={props.filterHome}
                    setState={props.setFilterHome}
                    label="Team for filter to apply to (home/away/either)"

                />
                <label>Return stats from opposing team (e.g. if the away team achieved the filters, return the home team stats)</label>
                <input
                    type="checkbox"
                    checked={props.filterOpposing}
                    onChange={(e) => props.setFilterOpposing(e.target.checked)}
                />
            </>
            }
            {/* Now we want to create duplicatable inputs (using a button) for the rest of the parameters */}
            <div className="filter-controls">
                <button
                    type="button"
                    onClick={addFilter}
                    disabled={props.disabled}
                >
                    Add Filter
                </button>
                {Array.from({ length: numFilters }, (_, index) => (
                    <div key={index} className="filter-item">
                        {(numFilters >= 1) && (
                            <button
                                type="button"
                                onClick={() => removeFilter(index)}
                                disabled={props.disabled}
                            >
                                Remove Filter {index + 1}
                            </button>
                    )}
                    <SingleFilter
                        key={index}
                        disabled={props.disabled}
                        index={index}
                        filterInnings={props.filterInnings}
                        setFilterInnings={props.setFilterInnings}
                        filterTop={props.filterTop}
                        setFilterTop={props.setFilterTop}
                        filterStats={props.filterStats}
                        setFilterStats={props.setFilterStats}
                        filterValues={props.filterValues}
                        setFilterValues={props.setFilterValues}
                        filterOperators={props.filterOperators}
                        setFilterOperators={props.setFilterOperators}
                    />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function SingleFilter(props: {
    disabled: boolean;
    index: number;
    filterInnings: number[];
    setFilterInnings: (value: number[]) => void;
    filterTop: boolean[];
    setFilterTop: (value: boolean[]) => void;
    filterStats: string[];
    setFilterStats: (value: string[]) => void;
    filterValues: string[];
    setFilterValues: (value: string[]) => void;
    filterOperators: string[];
    setFilterOperators: (value: string[]) => void;
}) {
    // This function will render a single filter input, only for the index provided
    return (
        <div className="single-filter">
            <label>Inning</label>
            <SelectInput
                disabled={props.disabled}
                options={innings_form}
                state={props.filterInnings[props.index]}
                setState={(value) => {
                    const newInnings = [...props.filterInnings];
                    newInnings[props.index] = value;
                    props.setFilterInnings(newInnings);
                }}
                label="Select Innings"
            />
            <SelectInput
                disabled={props.disabled}
                options={[{ value: true, label: "Top" }, { value: false, label: "Bottom" }]}
                state={props.filterTop[props.index]}
                setState={(value) => {
                    const newTop = [...props.filterTop];
                    newTop[props.index] = value;
                    props.setFilterTop(newTop);
                }}
                label="Top/Bottom"
            />
            <SelectInput
                disabled={props.disabled}
                options={valid_filter_cols.map((stat) => ({ value: stat, label: stat }))}
                state={props.filterStats[props.index]}
                setState={(value) => {
                    const newStats = [...props.filterStats];
                    newStats[props.index] = value;
                    props.setFilterStats(newStats);
                }}
                label="Stat"
            />
            <SelectInput
                disabled={props.disabled}
                options={valid_operators.map((op) => ({ value: op.value, label: op.label }))}
                state={props.filterOperators[props.index]}
                setState={(value) => {
                    const newOperators = [...props.filterOperators];
                    newOperators[props.index] = value;
                    props.setFilterOperators(newOperators);
                }}
                label="Operator"
            />
            <label>Value</label>
            <input
                type="number"
                value={props.filterValues[props.index] || ""}
                onChange={(e) => {
                    const newValues = [...props.filterValues];
                    newValues[props.index] = e.target.value;
                    props.setFilterValues(newValues);
                }}
                placeholder="Enter value"
            />
            </div>
    );
}