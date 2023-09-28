export type Interval = {
    value: string;
    name: string;
}

export interface ICardHeader {
    title: string;
    tooltip?: string;
    description?: string;
    selectedInterval?: Interval;
    setSelectedInterval?: (interval: Interval) => void;
    intervals?: Interval[];
    route?: string; // <-- Add this for route prop
}

export interface IUser {
    address: string | null;
    publicKey: string | null;
}
