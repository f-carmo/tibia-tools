export interface CharacterResponse {
    character: {
      character: CharacterDetails;
      achievements: Achievement[];
      deaths_truncated: boolean;
      account_information: AccountInformation;
      other_characters: OtherCharacter[];
    };
  }
  
  export interface CharacterDetails {
    name: string;
    sex: string;
    title: string;
    unlocked_titles: number;
    vocation: string;
    level: number;
    achievement_points: number;
    world: string;
    residence: string;
    married_to: string;
    houses: House[];
    guild?: Guild;
    last_login: string;
    account_status: string;
  }
  
  export interface House {
    name: string;
    town: string;
    paid: string;
    houseid: number;
  }
  
  export interface Guild {
    name: string;
    rank: string;
  }
  
  export interface Achievement {
    name: string;
    grade: number;
    secret: boolean;
  }
  
  export interface AccountInformation {
    created: string;
    loyalty_title: string;
  }
  
  export interface OtherCharacter {
    name: string;
    world: string;
    status: string;
    deleted: boolean;
    main: boolean;
    traded: boolean;
  }