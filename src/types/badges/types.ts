export interface IBadges {
    name: string;
    description: string;
    success: boolean;
}

export type BadgeIcons = Record<string, JSX.Element>;