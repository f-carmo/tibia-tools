import { Guildhall } from "./guildhall.model";
import { GuildMember } from "./member.model";

export interface Guild {    
    active: boolean;
    description: string;
    disband_condition: string;
    disband_date: string;
    founded: string;
    guildhalls: Guildhall[];
    homepage: string;
    in_war: boolean;
    invites: any[]
    logo_url: string;
    members: GuildMember[];
    members_invited: number;
    members_total: number;
    name: string;
    open_applications: boolean;
    players_offline: number;
    players_online: number;
    world: string;
}