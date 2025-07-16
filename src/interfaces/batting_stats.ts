export interface BattingStatResponse {
    count:    number;
    next:     string | null;
    previous: null | null;
    results:  BattingStatRow[];
    loading:  boolean;
    error:    boolean;
    errorMessage: string | null;
}

export interface BattingStatRow {
    year:       nullable<number>;
    player_id:  nullable<string>;
    team:       string;
    month:      nullable<number>;
    day:        nullable<number>;
    game_id:    nullable<string>;
    start_year: number;
    end_year:   number;
    G:          number;
    PA:         number;
    AB:         number;
    H:          number;
    "1B":       number;
    "2B":       number;
    "3B":       number;
    HR:         number;
    UBB:        number;
    IBB:        number;
    HBP:        number;
    SF:         number;
    SH:         number;
    K:          number;
    DP:         number;
    TP:         number;
    ROE:        number;
    FC:         number;
    R:          number;
    RBI:        number;
    GB:         number;
    LD:         number;
    FB:         number;
    PU:         number;
    SB:         number;
    CS:         number;
    AVG:        nullable<number>;
    OBP:        nullable<number>;
    SLG:        nullable<number>;
    OPS:        nullable<number>;
    ISO:        nullable<number>;
    BABIP:      nullable<number>;
    "BB%":      nullable<number>;
    "K%":       nullable<number>;
    "K/BB":     nullable<number>;
    wOBA:       nullable<number>;
    wRAA:       nullable<number>;
    wRC:        nullable<number>;
    "wRC+":     nullable<number>;
    "GB%":      nullable<number>;
    "LD%":      nullable<number>;
    "FB%":      nullable<number>;
    "PU%":      nullable<number>;
}

export type nullable<T> = T | "N/A";