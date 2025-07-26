import { createColumnHelper } from "@tanstack/react-table";
import type { PitchingStatRow } from "../interfaces/pitching_stats";
import { columnHelperPropertiesBase, columnHelperPropertiesCapitalize, columnHelperPropertiesFloatRound, columnHelperPropertiesFloatThree, columnHelperPropertiesFloatTwo, columnHelperPropertiesFloatTwoPercent } from "./batting_table";

const columnHelperPropertiesInnings = {
    header: (info: any) => info.column.id.replace(/_/g, " "),
    footer: (info: any) => info.column.id.replace(/_/g, " "),
    cell: (info: any) => {
        const value = info.getValue();
        // Turn eg 0.3333 into 0.1
        const innings = Math.floor(value);
        const decimal = Math.round((value - innings) * 3);
        return `${innings}.${decimal}`;
    }
}
const columnHelper = createColumnHelper<PitchingStatRow>();
export const pitchingColumns = {
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
    GS: columnHelper.accessor("GS", columnHelperPropertiesBase),
    IP: columnHelper.accessor("IP", columnHelperPropertiesInnings),
    ERA: columnHelper.accessor("ERA", columnHelperPropertiesFloatTwo),
    FIP: columnHelper.accessor("FIP", columnHelperPropertiesFloatTwo),
    xFIP: columnHelper.accessor("xFIP", columnHelperPropertiesFloatTwo),
    WHIP: columnHelper.accessor("WHIP", columnHelperPropertiesFloatThree),
    "ERA-": columnHelper.accessor("ERA-", columnHelperPropertiesFloatRound),
    "FIP-": columnHelper.accessor("FIP-", columnHelperPropertiesFloatRound),
    "xFIP-": columnHelper.accessor("xFIP-", columnHelperPropertiesFloatRound),
    "BB%": columnHelper.accessor("BB%", columnHelperPropertiesFloatTwoPercent),
    "K%": columnHelper.accessor("K%", columnHelperPropertiesFloatTwoPercent),
    "K-BB%": columnHelper.accessor("K-BB%", columnHelperPropertiesFloatTwoPercent),
    "K/BB": columnHelper.accessor("K/BB", columnHelperPropertiesFloatTwo),
    "BB/9": columnHelper.accessor("BB/9", columnHelperPropertiesFloatTwo),
    "K/9": columnHelper.accessor("K/9", columnHelperPropertiesFloatTwo),
    "LOB%": columnHelper.accessor("LOB%", columnHelperPropertiesFloatTwoPercent),
    BABIP: columnHelper.accessor("BABIP", columnHelperPropertiesFloatThree),
    "HR/FB%": columnHelper.accessor("HR/FB%", columnHelperPropertiesFloatTwoPercent),
    "GB%": columnHelper.accessor("GB%", columnHelperPropertiesFloatTwoPercent),
    "LD%": columnHelper.accessor("LD%", columnHelperPropertiesFloatTwoPercent),
    "FB%": columnHelper.accessor("FB%", columnHelperPropertiesFloatTwoPercent),
    "PU%": columnHelper.accessor("PU%", columnHelperPropertiesFloatTwoPercent),
    TBF: columnHelper.accessor("TBF", columnHelperPropertiesBase),
    AB: columnHelper.accessor("AB", columnHelperPropertiesBase),
    H: columnHelper.accessor("H", columnHelperPropertiesBase),
    "1B": columnHelper.accessor("1B", columnHelperPropertiesBase),
    "2B": columnHelper.accessor("2B", columnHelperPropertiesBase),
    "3B": columnHelper.accessor("3B", columnHelperPropertiesBase),
    HR: columnHelper.accessor("HR", columnHelperPropertiesBase),
    UBB: columnHelper.accessor("UBB", columnHelperPropertiesBase),
    IBB: columnHelper.accessor("IBB", columnHelperPropertiesBase),
    HBP: columnHelper.accessor("HBP", columnHelperPropertiesBase),
    DP: columnHelper.accessor("DP", columnHelperPropertiesBase),
    TP: columnHelper.accessor("TP", columnHelperPropertiesBase),
    WP: columnHelper.accessor("WP", columnHelperPropertiesBase),
    BK: columnHelper.accessor("BK", columnHelperPropertiesBase),
    K: columnHelper.accessor("K", columnHelperPropertiesBase),
    P: columnHelper.accessor("P", columnHelperPropertiesBase),
    GB: columnHelper.accessor("GB", columnHelperPropertiesBase),
    LD: columnHelper.accessor("LD", columnHelperPropertiesBase),
    FB: columnHelper.accessor("FB", columnHelperPropertiesBase),
    PU: columnHelper.accessor("PU", columnHelperPropertiesBase),
    SH: columnHelper.accessor("SH", columnHelperPropertiesBase),
    SF: columnHelper.accessor("SF", columnHelperPropertiesBase),
    R: columnHelper.accessor("R", columnHelperPropertiesBase),
    ER: columnHelper.accessor("ER", columnHelperPropertiesBase),
    UER: columnHelper.accessor("UER", columnHelperPropertiesBase),
    wOBA: columnHelper.accessor("wOBA", columnHelperPropertiesFloatThree),
};