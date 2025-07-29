export const batting_pitching_form: Array<{label: string, value: "batting" | "pitching"}> = [
    {label: "Batting", value: "batting"},
    {label: "Pitching", value: "pitching"},
];

export const mlb_teams_retrosheet: Array<{label: string, value: string}> = [
    {label: "Anaheim Angels", value: "ANA"},
    {label: "Baltimore Orioles", value: "BAL"},
    {label: "Boston Red Sox", value: "BOS"},
    {label: "Chicago White Sox", value: "CHA"},
    {label: "Cleveland Indians", value: "CLE"},
    {label: "Detroit Tigers", value: "DET"},
    {label: "Houston Astros", value: "HOU"},
    {label: "Kansas City Royals", value: "KCA"},
    {label: "Minnesota Twins", value: "MIN"},
    {label: "New York Yankees", value: "NYA"},
    {label: "Oakland Athletics", value: "OAK"},
    {label: "Seattle Mariners", value: "SEA"},
    {label: "Tampa Bay Devil Rays", value: "TBA"},
    {label: "Texas Rangers", value: "TEX"},
    {label: "Toronto Blue Jays", value: "TOR"},
    {label: "Arizona Diamondbacks", value: "ARI"},
    {label: "Atlanta Braves", value: "ATL"},
    {label: "Chicago Cubs", value: "CHN"},
    {label: "Cincinnati Reds", value: "CIN"},
    {label: "Colorado Rockies", value: "COL"},
    {label: "Los Angeles Dodgers", value: "LAN"},
    {label: "San Diego Padres", value: "SDN"},
    {label: "Miami Marlins", value: "MIA"},
    {label: "Milwaukee Brewers", value: "MIL"},
    {label: "New York Mets", value: "NYN"},
    {label: "Philadelphia Phillies", value: "PHI"},
    {label: "Pittsburgh Pirates", value: "PIT"},
    {label: "San Francisco Giants", value: "SFN"},
    {label: "St. Louis Cardinals", value: "SLN"},
    {label: "Washington Nationals", value: "WAS"},
];

export const year_values: Array<{label: string, value: number}> = Array.from({length: 2025 - 1912 + 1}, (_, i) => ({
    label: (i + 1912).toString(),
    value: i + 1912
})).reverse();

export const split_form: Array<{label: string, value: "year" | "career" | "month" | "game"}> = [
    {label: "Year", value: "year"},
    {label: "Career", value: "career"},
    {label: "Month", value: "month"},
    {label: "Game", value: "game"},
];

export const find_form: Array<{label: string, value: "player" | "team"}> = [
    {label: "Player", value: "player"},
    {label: "Team", value: "team"},
];

export const days_of_week_form: Array<{label: string, value: string}> = [
    {label: "Sun", value: "Sunday"},
    {label: "Mon", value: "Monday"},
    {label: "Tue", value: "Tuesday"},
    {label: "Wed", value: "Wednesday"},
    {label: "Thu", value: "Thursday"},
    {label: "Fri", value: "Friday"},
    {label: "Sat", value: "Saturday"}
];

export const player_hand: Array<{label: string, value: string}> = [
    {label: "Left", value: "L"},
    {label: "Right", value: "R"},
    {label: "Any", value: "A"}
];

export const player_starter_form: Array<{label: string, value: boolean | "A"}> = [
    {label: "Starter", value: true},
    {label: "Non-Starter", value: false},
    {label: "Any", value: "A"}
];

export const batter_lineup_form: Array<{label: string, value: number}> = [
    {label: "1st", value: 1},
    {label: "2nd", value: 2},
    {label: "3rd", value: 3},
    {label: "4th", value: 4},
    {label: "5th", value: 5},
    {label: "6th", value: 6},
    {label: "7th", value: 7},
    {label: "8th", value: 8},
    {label: "9th", value: 9},
];

export const player_field_pos_form: Array<{label: string, value: number}> = [
    {label: "Pitcher", value: 1},
    {label: "Catcher", value: 2},
    {label: "First Base", value: 3},
    {label: "Second Base", value: 4},
    {label: "Third Base", value: 5},
    {label: "Shortstop", value: 6},
    {label: "Left Field", value: 7},
    {label: "Center Field", value: 8},
    {label: "Right Field", value: 9},
    {label: "Designated Hitter", value: 10},
    {label: "Pinch Hitter", value: 11},
];

export const player_home_form: Array<{label: string, value: boolean | "A"}> = [
    {label: "Home", value: true},
    {label: "Away", value: false},
    {label: "Any", value: "A"}
];

export const innings_form: Array<{label: string, value: number}> = [
    {label: "1", value: 1},
    {label: "2", value: 2},
    {label: "3", value: 3},
    {label: "4", value: 4},
    {label: "5", value: 5},
    {label: "6", value: 6},
    {label: "7", value: 7},
    {label: "8", value: 8},
    {label: "9", value: 9},
    {label: "10", value: 10},
];

export const outs_form: Array<{label: string, value: number}> = [
    {label: "0", value: 0},
    {label: "1", value: 1},
    {label: "2", value: 2},
];

export const count_form: Array<{label: string, value: string}> = [
    {label: "After 0-0", value: "0-0"},
    {label: "After 0-1", value: "0-1"},
    {label: "After 0-2", value: "0-2"},
    {label: "After 1-0", value: "1-0"},
    {label: "After 1-1", value: "1-1"},
    {label: "After 1-2", value: "1-2"},
    {label: "After 2-0", value: "2-0"},
    {label: "After 2-1", value: "2-1"},
    {label: "After 2-2", value: "2-2"},
    {label: "After 3-0", value: "3-0"},
    {label: "After 3-1", value: "3-1"},
    {label: "After 3-2", value: "3-2"},
];

export const strikes_form: Array<{label: string, value: number}> = [
    {label: "0", value: 0},
    {label: "1", value: 1},
    {label: "2", value: 2},
    {label: "3", value: 3},
];

export const balls_form: Array<{label: string, value: number}> = [
    {label: "0", value: 0},
    {label: "1", value: 1},
    {label: "2", value: 2},
    {label: "3", value: 3},
    {label: "4", value: 4},
];

export const base_situation_form: Array<{label: string, value: number}> = [
    {label: "No Runners", value: 0b000},
    {label: "Runner on 1st", value: 0b001},
    {label: "Runner on 2nd", value: 0b010},
    {label: "Runner on 3rd", value: 0b100},
    {label: "Runners on 1st and 2nd", value: 0b011},
    {label: "Runners on 1st and 3rd", value: 0b101},
    {label: "Runners on 2nd and 3rd", value: 0b110},
    {label: "Bases Loaded", value: 0b111},
];

export const valid_operators: Array<{label: string, value: string}> = [
    {label: "=", value: "="},
    {label: "≠", value: "!="},
    {label: ">", value: ">"},
    {label: "<", value: "<"},
    {label: "≥", value: ">="},
    {label: "≤", value: "<="},
];

export const filter_home_form: Array<{label: string, value: string}> = [
    {label: "Either", value: "either"},
    {label: "Home", value: "home"},
    {label: "Away", value: "away"}
];