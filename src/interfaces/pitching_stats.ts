import type { nullable } from "./batting_stats";

export interface PitchingStatResponse {
    count:    number;
    next:     string | null;
    previous: null | null;
    results:  PitchingStatRow[];
    loading:  boolean;
    error:    boolean;
    errorMessage: string | null;
}

export interface PitchingStatRow {
    year:       nullable<number>;
    player_id:  nullable<string>;
    team:       string;
    month:      nullable<number>;
    day:        nullable<number>;
    game_id:    nullable<string>;
    start_year: number;
    end_year:   number;
    G:          number;
    GS:         number;
    IP:         number;
    TBF:        number;
    AB:         number;
    H:          number;
    "1B":       number;
    "2B":       number;
    "3B":       number;
    HR:         number;
    UBB:        number;
    IBB:        number;
    HBP:        number;
    DP:         number;
    TP:         number;
    WP:         number;
    BK:         number;
    K:          number;
    P:          number;
    GB:         number;
    LD:         number;
    FB:         number;
    PU:         number;
    SH:         number;
    SF:         number;
    R:          number;
    ER:         number;
    UER:        number;
    ERA:        nullable<number>;
    FIP:        nullable<number>;
    xFIP:       nullable<number>;
    WHIP:       nullable<number>;
    "ERA-":     nullable<number>;
    "FIP-":     nullable<number>;
    "xFIP-":    nullable<number>;
    BABIP:      nullable<number>;
    "BB%":      nullable<number>;
    "K%":       nullable<number>;
    "K-BB%":    nullable<number>;
    "K/BB":     nullable<number>;
    "BB/9":     nullable<number>;
    "K/9":      nullable<number>;
    "LOB%":     nullable<number>;
    wOBA:       nullable<number>;
    "HR/FB%":   nullable<number>;
}