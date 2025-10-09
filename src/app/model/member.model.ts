export interface GuildMember {
    joined: string;
    level: number;
    name: string;
    rank: string;
    status: string;
    title: string;
    vocation: string;
    daysOffline?: number;
    flaggedFor?: "Inactivity" | "Low Level" | "Account Status";
}