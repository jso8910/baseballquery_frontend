import Select from "react-select";
import Creatable from "react-select/creatable";
import { filter_home_form, innings_form, valid_operators } from "../data/select_forms";
import { valid_filter_cols } from "../data/database_columns";
import { useState } from "react";

export function SelectInput(props: {
    disabled: boolean;
    options: any[];
    state: any;
    setState: (value: any) => void;
    label: string;
    onChange?: (selected: any) => void;
}) {
    return (
        <div className="select-container">
            <label>{props.label}</label>
            <Select
                isClearable={false}
                closeMenuOnSelect={true}
                isDisabled={props.disabled}
                options={props.options}
                onChange={props.onChange || ((selected) => props.setState(selected.value))}
                value={props.options.find(
                    (option: { value: any }) => props.state === option.value
                )}
            />
        </div>
    );
}

export function CreatableMulti(props: {
    disabled: boolean;
    options: any[];
    state: any;
    setState: (value: any) => void;
    label: string;
    onChange?: (selected: any) => void;
    formatCreateLabel?: (inputValue: string) => string;
    forceUpperCase?: boolean;
    length?: number;
    forceInteger?: boolean;
    minNumber?: number;
    maxNumber?: number;
    placeholder?: string;
}) {
    return (
        <div className="select-container">
            <label>{props.label}</label>
            <Creatable
                isClearable
                isMulti
                isDisabled={props.disabled}
                options={props.options}
                closeMenuOnSelect={false}
                formatCreateLabel={
                    props.formatCreateLabel ||
                    ((inputValue: string) => `Add "${inputValue}"`)
                }
                onChange={props.onChange || ((selected) => {
                    if (selected) {
                        props.setState(selected.map((s) => s.value));
                    } else {
                        props.setState([]);
                    }
                })}
                value={props.state.map((elem: any) => {
                    const found = props.options.find(
                        (t: any) => t.value === elem
                    );
                    return found ? found : { label: elem, value: elem };
                })}
                onCreateOption={(inputValue) => {
                    if (props.forceUpperCase) {
                        inputValue = inputValue.toUpperCase();
                    }
                    if (props.length && inputValue.length !== props.length) {
                        return;
                    }
                    if (props.forceInteger && isNaN(Number(inputValue))) {
                        return;
                    } else if (props.forceInteger) {
                        if (
                            props.minNumber &&
                            Number(inputValue) < props.minNumber
                        ) {
                            return;
                        }
                        if (
                            props.maxNumber &&
                            Number(inputValue) > props.maxNumber
                        ) {
                            return;
                        }
                        props.setState([...props.state, Number(inputValue)]);
                        return;
                    }
                    props.setState([...props.state, inputValue]);
                }}
                components={
                    props.options.length === 0
                        ? { DropdownIndicator: null }
                        : {}
                }
                noOptionsMessage={
                    props.options.length > 0 ? () => "No options" : () => null
                }
                placeholder={props.placeholder || "Select..."}
            />
        </div>
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
        <div className="select-container">
            <label>{props.label}</label>
            <Select
                isClearable
                isMulti
                isDisabled={props.disabled}
                options={props.options}
                closeMenuOnSelect={false}
                onChange={props.onChange || ((selected) => {
                    if (selected) {
                        props.setState(selected.map((s: any) => s.value));
                    } else {
                        props.setState([]);
                    }
                })}
                value={props.state.map((elem: any) => {
                    const found = props.options.find(
                        (t: any) => t.value === elem
                    );
                    return found;
                })}
            />
        </div>
    );
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
                    onChange={(selected) =>
                        props.setFilterHome(selected ? selected.value : "either")
                    }
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
                state={props.filterInnings}
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