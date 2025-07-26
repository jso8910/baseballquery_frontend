import { useEffect, useState } from "react";
import "./App.css";
import {
    balls_form,
    base_situation_form,
    batter_lineup_form,
    batting_pitching_form,
    count_form,
    days_of_week_form,
    find_form,
    innings_form,
    mlb_teams_retrosheet,
    outs_form,
    player_field_pos_form,
    player_hand,
    player_home_form,
    player_starter_form,
    split_form,
    strikes_form,
    year_values,
} from "./data/select_forms";
import type { BattingStatResponse } from "./interfaces/batting_stats";
import { StatsTable } from "./components/table_component";
import { type PaginationState, type SortingState } from "@tanstack/react-table";
import { Link, useParams } from "react-router";
import { CreatableMulti, InningFilter, MultiInput, SelectInput } from "./components/form_components";

function App() {
    let [battingPitching, setBattingPitching] = useState<
        "batting" | "pitching"
    >("batting");
    let [batterTeams, setBatterTeams] = useState<Array<string>>([]);
    let [pitcherTeams, setPitcherTeams] = useState<Array<string>>([]);
    let [startYear, setStartYear] = useState<number>(2025);
    let [endYear, setEndYear] = useState<number>(2025);
    let [split, setSplit] = useState<"year" | "career" | "month" | "game">(
        "year"
    );
    let [find, setFind] = useState<"player" | "team">("player");
    let [daysOfWeek, setDaysOfWeek] = useState<Array<string>>([]);
    let [batterHand, setBatterHand] = useState<"L" | "R" | null>(null);
    let [pitcherHand, setPitcherHand] = useState<"L" | "R" | null>(null);
    let [batterStarter, setBatterStarter] = useState<boolean | null>(null);
    let [pitcherStarter, setPitcherStarter] = useState<boolean | null>(null);
    let [batterLineup, setBatterLineup] = useState<Array<number>>([]);
    let [playerFieldPos, setPlayerFieldPos] = useState<Array<number>>([]);
    let [batterHome, setBatterHome] = useState<boolean | null>(null);
    let [pitcherHome, setPitcherHome] = useState<boolean | null>(null);
    let [innings, setInnings] = useState<Array<number>>([]);
    let [outs, setOuts] = useState<Array<number>>([]);
    let [count, setCount] = useState<Array<string>>([]);
    let [strikes, setStrikes] = useState<Array<number>>([]);
    let [balls, setBalls] = useState<Array<number>>([]);
    let [scoreDiff, setScoreDiff] = useState<Array<number>>([]);
    let [homeScore, setHomeScore] = useState<Array<number>>([]);
    let [awayScore, setAwayScore] = useState<Array<number>>([]);
    let [baseSituation, setBaseSituation] = useState<Array<number>>([]);

    let [inputDisabled, setInputDisabled] = useState<boolean>(true);

    // Load saved query from URL if inputted
    let { uuid } = useParams();
    useEffect(() => {
        if (!uuid) return;
        fetch(`http://localhost:8000/api/saved_query?uuid=${uuid}`)
            .then((response) => response.json())
            .then((data) => {
                let { params } = data;
                console.log("Loaded saved query:", data);
                setBattingPitching(params.type);
                setBatterTeams(params.batter_teams);
                setPitcherTeams(params.pitcher_teams);
                setStartYear(params.start_year);
                setEndYear(params.end_year);
                setSplit(params.split);
                setFind(params.find);
                setDaysOfWeek(params.days_of_week);
                setBatterHand(params.batter_handedness_pa);
                setPitcherHand(params.pitcher_handedness_pa);
                setBatterStarter(params.batter_starter);
                setPitcherStarter(params.pitcher_starter);
                setBatterLineup(params.batter_lineup_pos);
                setPlayerFieldPos(params.player_field_position);
                setBatterHome(params.batter_home);
                setPitcherHome(params.pitcher_home);
                setInnings(params.innings);
                setOuts(params.outs);
                setCount(params.count);
                setStrikes(params.strikes);
                setBalls(params.balls);
                setScoreDiff(params.score_diff);
                setHomeScore(params.home_score);
                setAwayScore(params.away_score);
                setBaseSituation(params.base_situation);
                setSorting(params.sort);

                setInputDisabled(true);
            });
    }, [uuid]);

    let [savedQuery, setSavedQuery] = useState<string | null>(null);

    let [data, setData] = useState<BattingStatResponse>({
        count: 0,
        next: null,
        previous: null,
        results: [],
        loading: true,
        queryChanged: false,
        error: false,
        errorMessage: null,
    });
    let [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    let [sorting, setSorting] = useState<SortingState>([]);

    // Inning filter component states
    const [filterHome, setFilterHome] = useState<string>("either");
    const [filterOpposing, setFilterOpposing] = useState<boolean>(false);
    const [filterInnings, setFilterInnings] = useState<number[]>([]);
    const [filterTop, setFilterTop] = useState<boolean[]>([]);
    const [filterStats, setFilterStats] = useState<string[]>([]);
    const [filterValues, setFilterValues] = useState<string[]>([]);
    const [filterOperators, setFilterOperators] = useState<string[]>([]);

    // Disable table after query is changed
    useEffect(() => {
        setData({...data, queryChanged: true})
    }, [
        battingPitching,
        startYear,
        endYear,
        split,
        find,
        batterHand,
        pitcherHand,
        batterStarter,
        pitcherStarter,
        batterLineup,
        playerFieldPos,
        batterHome,
        pitcherHome,
        innings,
        outs,
        count,
        strikes,
        balls,
        scoreDiff,
        homeScore,
        awayScore,
        baseSituation,
        batterTeams,
        pitcherTeams,
        daysOfWeek,
        filterHome,
        filterOpposing,
        filterInnings,
        filterTop,
        filterStats,
        filterValues,
        filterOperators
    ]);

    const updateData = () => {
        setInputDisabled(true);
        const controller = new AbortController();
        const signal = controller.signal;
        if (data["count"] !== 0) {
            setData({
                ...data,
                loading: true,
                error: false,
                errorMessage: null,
                queryChanged: false
            });
        } else {
            setData({
                count: 0,
                next: null,
                previous: null,
                results: [],
                loading: true,
                queryChanged: false,
                error: false,
                errorMessage: null,
            });
        }
        let paramsObject: { [key: string]: string } = {
            start_year: startYear.toString(),
            end_year: endYear.toString(),
            split: split,
            find: find,
            batter_handedness_pa: batterHand === null ? "" : batterHand,
            pitcher_handedness_pa: pitcherHand === null ? "" : pitcherHand,
            batter_starter:
                batterStarter === null ? "" : batterStarter ? "Y" : "N",
            pitcher_starter:
                pitcherStarter === null ? "" : pitcherStarter ? "Y" : "N",
            batter_lineup_pos: batterLineup
                .map((num) => num.toString())
                .join(","),
            player_field_position: playerFieldPos
                .map((num) => num.toString())
                .join(","),
            batter_home: batterHome === null ? "" : batterHome ? "Y" : "N",
            pitcher_home: pitcherHome === null ? "" : pitcherHome ? "Y" : "N",
            innings: innings.map((num) => num.toString()).join(","),
            outs: outs.map((num) => num.toString()).join(","),
            count: count.join(","),
            strikes: strikes.map((num) => num.toString()).join(","),
            balls: balls.map((num) => num.toString()).join(","),
            score_diff: scoreDiff.map((num) => num.toString()).join(","),
            home_score: homeScore.map((num) => num.toString()).join(","),
            away_score: awayScore.map((num) => num.toString()).join(","),
            base_situation: baseSituation
                .map((num) => num.toString())
                .join(","),
            batting_team: batterTeams.join(","),
            pitching_team: pitcherTeams.join(","),
            days_of_week: daysOfWeek.join(","),
            page: (pagination.pageIndex + 1).toString(),
            page_size: pagination.pageSize.toString(),
            sort: sorting.map((s) => `${s.desc ? "-" : ""}${s.id}`).join(","),
            filter_home: filterInnings.length > 0 ? filterHome : "",
            filter_opposing: filterInnings.length > 0 ? (filterOpposing ? "Y" : "N") : "",
            filter_innings: filterInnings.map((num) => num.toString()).join(","),
            filter_top: filterTop.map((num) => num ? "Y" : "N").join(","),
            filter_stats: filterStats.join(","),
            filter_values: filterValues.map((value) => value.toString()).join(","),
            filter_operators: filterOperators.join(","),
        };
        let params = new URLSearchParams(paramsObject);
        let keysForDel: Array<string> = [];
        params.forEach((value, key) => {
            if (value == "") {
                keysForDel.push(key);
            }
        });

        keysForDel.forEach((key) => {
            params.delete(key);
        });
        let fetchUrl;
        if (battingPitching === "batting") {
            console.log(
                "Fetch URL:",
                "http://localhost:8000/api/batting_stats?" + params.toString()
            );
            fetchUrl =
                "http://localhost:8000/api/batting_stats?" + params.toString();
        } else {
            console.log(
                "Fetch URL:",
                "http://localhost:8000/api/pitching_stats?" + params.toString()
            );
            fetchUrl =
                "http://localhost:8000/api/pitching_stats?" + params.toString();
        }
        fetch(fetchUrl, { signal })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(error => {
                        throw new Error(error[0] || `HTTP Error ${response.status}`)
                    })
                }
                return response.json();
            })
            .then((d) => {
                setData({
                    ...d,
                    loading: false,
                    error: false,
                    errorMessage: null,
                    queryChanged: false,
                });
                setInputDisabled(false);
            })
            .catch((error) => {
                if (error.name === "AbortError") {
                    return;
                }
                setData({
                    count: 0,
                    next: null,
                    previous: null,
                    results: [],
                    loading: false,
                    queryChanged: false,
                    error: true,
                    errorMessage: error.message || "Error fetching data",
                });
                console.log(data);
                setInputDisabled(false);
                // console.error("Error fetching data:", error);
            });
        return () => {
            controller.abort(); // Clean up the fetch request on component unmount or when dependencies change
        };
    };

    function save_query() {
        const paramsObject: { [key: string]: any } = {
            type: battingPitching,
            batter_teams: batterTeams,
            pitcher_teams: pitcherTeams,
            start_year: startYear,
            end_year: endYear,
            split: split,
            find: find,
            days_of_week: daysOfWeek,
            batter_handedness_pa: batterHand,
            pitcher_handedness_pa: pitcherHand,
            batter_starter: batterStarter,
            pitcher_starter: pitcherStarter,
            batter_lineup_pos: batterLineup,
            player_field_position: playerFieldPos,
            batter_home: batterHome,
            pitcher_home: pitcherHome,
            innings: innings,
            outs: outs,
            count: count,
            strikes: strikes,
            balls: balls,
            score_diff: scoreDiff,
            home_score: homeScore,
            away_score: awayScore,
            base_situation: baseSituation,
            sort: sorting,
        };
        fetch("http://localhost:8000/api/saved_query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ params: paramsObject }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Saved query:", data);
                setSavedQuery(data.uuid);
            })
            .catch((error) => {
                console.error("Error saving query:", error);
            });
    }

    useEffect(updateData, [pagination, sorting]);
    useEffect(updateData, []);
    return (
        <>
            <p>
                Sort by multiple columns by pressing Meta (command on MacOS),
                Shift, or Control while clicking in order of the columns you
                want to sort (the first column clicked will be the first column
                sorted by, and so on)
            </p>
            <StatsTable
                data={data}
                pagination={pagination}
                setPagination={setPagination}
                sorting={sorting}
                setSorting={setSorting}
                type={battingPitching}
                updateData={updateData}
            />

            <button onClick={save_query}>Save query</button>
            {savedQuery && (
                <p>
                    Saved query URL: <Link to={`/${savedQuery}`}>URL</Link>{" "}
                </p>
            )}
            <h2>Filters</h2>
            <InningFilter
                disabled={inputDisabled}
                filterHome={filterHome}
                setFilterHome={setFilterHome}
                filterOpposing={filterOpposing}
                setFilterOpposing={setFilterOpposing}
                filterInnings={filterInnings}
                setFilterInnings={setFilterInnings}
                filterTop={filterTop}
                setFilterTop={setFilterTop}
                filterStats={filterStats}
                setFilterStats={setFilterStats}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                filterOperators={filterOperators}
                setFilterOperators={setFilterOperators}
            />
            <hr/>
            <SelectInput
                label="Batting/Pitching:"
                options={batting_pitching_form}
                state={battingPitching}
                setState={setBattingPitching}
                disabled={inputDisabled}
            />
            <CreatableMulti
                label="Batter Teams:"
                options={mlb_teams_retrosheet}
                state={batterTeams}
                setState={setBatterTeams}
                forceUpperCase={true}
                formatCreateLabel={(inputValue: string) =>
                    `Add "${inputValue}" (must be a valid Retrosheet 3 letter code)`
                }
                length={3}
                forceInteger={false}
                disabled={inputDisabled}
            />
            <CreatableMulti
                label="Pitcher Teams:"
                options={mlb_teams_retrosheet}
                state={pitcherTeams}
                setState={setPitcherTeams}
                forceUpperCase={true}
                formatCreateLabel={(inputValue: string) =>
                    `Add "${inputValue}" (must be a valid Retrosheet 3 letter code)`
                }
                length={3}
                forceInteger={false}
                disabled={inputDisabled}
            />
            <SelectInput
                label="Start Year:"
                options={year_values}
                state={startYear}
                setState={setStartYear}
                disabled={inputDisabled}
            />
            <SelectInput
                label="End Year:"
                options={year_values}
                state={endYear}
                setState={setEndYear}
                disabled={inputDisabled}
            />
            <SelectInput
                label="Split By:"
                options={split_form}
                state={split}
                setState={setSplit}
                disabled={inputDisabled}
            />
            <SelectInput
                label="Find:"
                options={find_form}
                state={find}
                setState={setFind}
                disabled={inputDisabled}
            />
            <MultiInput
                label="Days of Week:"
                options={days_of_week_form}
                state={daysOfWeek}
                setState={setDaysOfWeek}
                disabled={inputDisabled}
            />
            <SelectInput
                label="Batter Hand:"
                options={player_hand}
                state={batterHand}
                setState={setBatterHand}
                disabled={inputDisabled}
            />
            <SelectInput
                label="Pitcher Hand:"
                options={player_hand}
                state={pitcherHand}
                setState={setPitcherHand}
                disabled={inputDisabled}
            />
            <SelectInput
                label="Batter Lineup Role:"
                options={player_starter_form}
                state={batterStarter}
                setState={setBatterStarter}
                disabled={inputDisabled}
            />
            <SelectInput
                label="Pitcher Lineup Role:"
                options={player_starter_form}
                state={pitcherStarter}
                setState={setPitcherStarter}
                disabled={inputDisabled}
            />
            <MultiInput
                label="Batter Lineup Positions:"
                options={batter_lineup_form}
                state={batterLineup}
                setState={setBatterLineup}
                disabled={inputDisabled}
            />
            <MultiInput
                label="Player Field Position:"
                options={player_field_pos_form}
                state={playerFieldPos}
                setState={setPlayerFieldPos}
                disabled={inputDisabled}
            />
            <SelectInput
                label="Batter Team As:"
                options={player_home_form}
                state={batterHome}
                setState={setBatterHome}
                disabled={inputDisabled}
            />
            <SelectInput
                label="Pitcher Team As:"
                options={player_home_form}
                state={pitcherHome}
                setState={setPitcherHome}
                disabled={inputDisabled}
            />
            <CreatableMulti
                label="Innings:"
                options={innings_form}
                state={innings}
                setState={setInnings}
                formatCreateLabel={(inputValue: string) =>
                    `Add "${inputValue}" (must be a number greater than or equal to 1)`
                }
                forceInteger={true}
                minNumber={1}
                disabled={inputDisabled}
            />
            <MultiInput
                label="Count:"
                options={count_form}
                state={count}
                setState={setCount}
                disabled={inputDisabled}
            />
            <MultiInput
                label="Outs:"
                options={outs_form}
                state={outs}
                setState={setOuts}
                disabled={inputDisabled}
            />
            <MultiInput
                label="Strikes (after end of PA):"
                options={strikes_form}
                state={strikes}
                setState={setStrikes}
                disabled={inputDisabled}
            />
            <MultiInput
                label="Balls (after end of PA):"
                options={balls_form}
                state={balls}
                setState={setBalls}
                disabled={inputDisabled}
            />
            <CreatableMulti
                label="Score Difference (lead by batting team):"
                options={[]}
                state={scoreDiff}
                setState={setScoreDiff}
                formatCreateLabel={(inputValue: string) =>
                    `Add "${inputValue}" (must be a number)`
                }
                forceInteger={true}
                placeholder="Enter multiple score differences (e.g., 1, -2)"
                disabled={inputDisabled}
            />
            <CreatableMulti
                label="Home Score (before last pitch of PA):"
                options={[]}
                state={homeScore}
                setState={setHomeScore}
                formatCreateLabel={(inputValue: string) =>
                    `Add "${inputValue}" (must be a number ≥ 0)`
                }
                forceInteger={true}
                minNumber={0}
                placeholder="Enter multiple home scores (e.g., 0, 5)"
                disabled={inputDisabled}
            />
            <CreatableMulti
                label="Away Score (before last pitch of PA):"
                options={[{ label: "0", value: 0 }]}
                state={awayScore}
                setState={setAwayScore}
                formatCreateLabel={(inputValue: string) =>
                    `Add "${inputValue}" (must be a number ≥ 0)`
                }
                forceInteger={true}
                minNumber={0}
                placeholder="Enter multiple away scores (e.g., 0, 3)"
                disabled={inputDisabled}
            />
            <MultiInput
                label="Base Situation (1st, 2nd, 3rd base occupied):"
                options={base_situation_form}
                state={baseSituation}
                setState={setBaseSituation}
                disabled={inputDisabled}
            />
        </>
    );
}

export default App;
