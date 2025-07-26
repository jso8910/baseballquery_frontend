import { createColumnHelper } from "@tanstack/react-table";
import type { BattingStatRow } from "../interfaces/batting_stats";

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

export const columnHelperPropertiesBase = {
    header: (info: any) => info.column.id.replace(/_/g, " "),
    footer: (info: any) => info.column.id.replace(/_/g, " "),
    cell: (info: any) => info.getValue(),
};

export const columnHelperPropertiesCapitalize = {
    header: (info: any) => toTitleCase(info.column.id.replace(/_/g, " ")),
    footer: (info: any) => toTitleCase(info.column.id.replace(/_/g, " ")),
    cell: (info: any) => info.getValue(),
};

export const columnHelperPropertiesFloatThree = {
    header: (info: any) => info.column.id.replace(/_/g, " "),
    footer: (info: any) => info.column.id.replace(/_/g, " "),
    cell: (info: any) => {
        const value = info.getValue();
        if (value === "N/A") return value;
        return parseFloat(value).toFixed(3);
    },
};

export const columnHelperPropertiesFloatTwo = {
    header: (info: any) => info.column.id.replace(/_/g, " "),
    footer: (info: any) => info.column.id.replace(/_/g, " "),
    cell: (info: any) => {
        const value = info.getValue();
        if (value === "N/A") return value;
        return parseFloat(value).toFixed(2);
    },
};

export const columnHelperPropertiesFloatTwoPercent = {
    header: (info: any) => info.column.id.replace(/_/g, " "),
    footer: (info: any) => info.column.id.replace(/_/g, " "),
    cell: (info: any) => {
        const value = info.getValue();
        if (value === "N/A") return value;
        return (parseFloat(value) * 100).toFixed(2);
    },
};

export const columnHelperPropertiesFloatOne = {
    header: (info: any) => info.column.id.replace(/_/g, " "),
    footer: (info: any) => info.column.id.replace(/_/g, " "),
    cell: (info: any) => {
        const value = info.getValue();
        if (value === "N/A") return value;
        return parseFloat(value).toFixed(1);
    }
}

export const columnHelperPropertiesFloatRound = {
    header: (info: any) => info.column.id.replace(/_/g, " "),
    footer: (info: any) => info.column.id.replace(/_/g, " "),
    cell: (info: any) => {
        const value = info.getValue();
        if (value === "N/A") return value;
        return parseFloat(value).toFixed(0);
    }
}

const columnHelper = createColumnHelper<BattingStatRow>();

export const battingColumns = {
    year: columnHelper.accessor("year", columnHelperPropertiesCapitalize),
    player_id: columnHelper.accessor("player_id", columnHelperPropertiesCapitalize),
    team: columnHelper.accessor("team", columnHelperPropertiesCapitalize),
    month: columnHelper.accessor("month", columnHelperPropertiesCapitalize),
    day: columnHelper.accessor("day", columnHelperPropertiesCapitalize),
    game_id: columnHelper.accessor("game_id", columnHelperPropertiesCapitalize),
    start_year: columnHelper.accessor("start_year", columnHelperPropertiesCapitalize),
    end_year: columnHelper.accessor("end_year", columnHelperPropertiesCapitalize),
    win: columnHelper.accessor("win", {
        header: (_: any) => "W",
        footer: (_: any) => "W",
        cell: (info: any) => {
            const value = info.getValue();
            if (value === "N/A") return value;
            return value;
        },
    }),
    loss: columnHelper.accessor("loss", {
        header: (_: any) => "L",
        footer: (_: any) => "L",
        cell: (info: any) => {
            const value = info.getValue();
            if (value === "N/A") return value;
            return value;
        },
    }),
    G: columnHelper.accessor("G", columnHelperPropertiesBase),
    PA: columnHelper.accessor("PA", columnHelperPropertiesBase),
    AB: columnHelper.accessor("AB", columnHelperPropertiesBase),
    "wRC+": columnHelper.accessor("wRC+", columnHelperPropertiesFloatRound),
    wOBA: columnHelper.accessor("wOBA", columnHelperPropertiesFloatThree),
    OBP: columnHelper.accessor("OBP", columnHelperPropertiesFloatThree),
    SLG: columnHelper.accessor("SLG", columnHelperPropertiesFloatThree),
    OPS: columnHelper.accessor("OPS", columnHelperPropertiesFloatThree),
    ISO: columnHelper.accessor("ISO", columnHelperPropertiesFloatThree),
    BABIP: columnHelper.accessor("BABIP", columnHelperPropertiesFloatThree),
    "BB%": columnHelper.accessor("BB%", columnHelperPropertiesFloatTwoPercent),
    "K%": columnHelper.accessor("K%", columnHelperPropertiesFloatTwoPercent),
    "K/BB": columnHelper.accessor("K/BB", columnHelperPropertiesFloatTwo),
    wRAA: columnHelper.accessor("wRAA", columnHelperPropertiesFloatOne),
    wRC: columnHelper.accessor("wRC", columnHelperPropertiesFloatOne),
    "GB%": columnHelper.accessor("GB%", columnHelperPropertiesFloatTwoPercent),
    "LD%": columnHelper.accessor("LD%", columnHelperPropertiesFloatTwoPercent),
    "FB%": columnHelper.accessor("FB%", columnHelperPropertiesFloatTwoPercent),
    "PU%": columnHelper.accessor("PU%", columnHelperPropertiesFloatTwoPercent),
    H: columnHelper.accessor("H", columnHelperPropertiesBase),
    HR: columnHelper.accessor("HR", columnHelperPropertiesBase),
    "1B": columnHelper.accessor("1B", columnHelperPropertiesBase),
    "2B": columnHelper.accessor("2B", columnHelperPropertiesBase),
    "3B": columnHelper.accessor("3B", columnHelperPropertiesBase),
    UBB: columnHelper.accessor("UBB", columnHelperPropertiesBase),
    IBB: columnHelper.accessor("IBB", columnHelperPropertiesBase),
    HBP: columnHelper.accessor("HBP", columnHelperPropertiesBase),
    SF: columnHelper.accessor("SF", columnHelperPropertiesBase),
    SH: columnHelper.accessor("SH", columnHelperPropertiesBase),
    K: columnHelper.accessor("K", columnHelperPropertiesBase),
    DP: columnHelper.accessor("DP", columnHelperPropertiesBase),
    TP: columnHelper.accessor("TP", columnHelperPropertiesBase),
    ROE: columnHelper.accessor("ROE", columnHelperPropertiesBase),
    FC: columnHelper.accessor("FC", columnHelperPropertiesBase),
    R: columnHelper.accessor("R", columnHelperPropertiesBase),
    RBI: columnHelper.accessor("RBI", columnHelperPropertiesBase),
    GB: columnHelper.accessor("GB", columnHelperPropertiesBase),
    LD: columnHelper.accessor("LD", columnHelperPropertiesBase),
    FB: columnHelper.accessor("FB", columnHelperPropertiesBase),
    PU: columnHelper.accessor("PU", columnHelperPropertiesBase),
    SB: columnHelper.accessor("SB", columnHelperPropertiesBase),
    CS: columnHelper.accessor("CS", columnHelperPropertiesBase),
    AVG: columnHelper.accessor("AVG", columnHelperPropertiesFloatThree),
};
