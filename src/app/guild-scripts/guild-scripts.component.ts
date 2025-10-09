import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { catchError, concatMap, delay, filter, from, map, Observable, of } from 'rxjs';
import { GuildMember } from '../model/member.model';
import { CharacterResponse } from '../model/character.model';

@Component({
  selector: 'app-guild-scripts',
  standalone: true,
  templateUrl: './guild-scripts.component.html',
  styleUrls: ['./guild-scripts.component.scss'],
  imports: [FormsModule, HttpClientModule]
})
export class GuildScriptsComponent {
  guildName: string = '';
  minLevel: string = '';
  daysOffline: string = '';
  cookies: string = '';
  isFreeAccount: boolean = false;
  isMock: boolean = false;
  logs: string[] = [];

  constructor(private http: HttpClient) {}

  execMockRun(): void {
    this.isMock = true;
    console.log('Mock run executed with the following data:');
    console.log('Guild Name:', this.guildName);
    console.log('Min Level:', this.minLevel);
    console.log('Join Date:', this.daysOffline);
    console.log('Is Free Account:', this.isFreeAccount);

    this.fetchGuildData().subscribe({
      next: (data) => {
        const filteredMembers = this.applyMemberFilter(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  execRun(): void {
    this.isMock = false;
    console.log('Run executed with the following data:');
    console.log('Guild Name:', this.guildName);
    console.log('Min Level:', this.minLevel);
    console.log('Join Date:', this.daysOffline);
    console.log('Is Free Account:', this.isFreeAccount);

    this.fetchGuildData().subscribe({
      next: (data) => {
        const filteredMembers = this.applyMemberFilter(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  fetchGuildData(): Observable<any> {
    if (this.guildName.trim()) {
      const url = `https://api.tibiadata.com/v4/guild/${encodeURIComponent(this.guildName)}`;
      return this.http.get(url);
    } else {
      console.warn('Guild name is empty.');
      throw new Error('Guild name is empty.');
    }
  }
  
  applyMemberFilter(data: any): void {
    if (data.guild) {
      const members = data.guild.members;
      const checkDaysOffline: GuildMember[] = [];

      const filteredMembers = members.filter((member: GuildMember) => {
        if (member.rank === 'Vice Leader' || member.rank === 'Leader') return false;
        if (this.minLevel && member.level < parseInt(this.minLevel)) {
          member.flaggedFor = 'Low Level';
          return true;
        }
        if (this.isFreeAccount && this.checkAccountStatus(member) === 'Free') {
          member.flaggedFor = 'Account Status';
          return true;
        }
        if (this.daysOffline) checkDaysOffline.push(member);
        return false;
      });

    // Processa as requisições em fila
    this.processRequestsInQueue(checkDaysOffline).subscribe({
      next: (response: CharacterResponse) => {
        const diasOffline = this.calculateDaysDifference(response.character.character.last_login);
        if (diasOffline > parseInt(this.daysOffline)) {
          const guildMember = this.toGuildMember(response);
          guildMember.daysOffline = diasOffline;
          guildMember.flaggedFor = 'Inactivity';
          filteredMembers.push(guildMember);
        }
      },
      error: (error) => {
        console.error('Erro na requisição:', error);
      },
      complete: () => {
        this.excludeMember(filteredMembers);
      }
    });

      return filteredMembers;
    } else {
      console.warn('Guild data is empty.');
      throw new Error('Guild data is empty.');
    }
  }

  processRequestsInQueue(members: GuildMember[]): Observable<any> {
    return from(members).pipe(
      concatMap((member) => this.fetchMemberData(member).pipe(
        catchError((error) => {
          console.error(`Erro ao processar membro ${member.name}:`, error);
          return of(null); // Continua mesmo em caso de erro
        })
      ))
    );
  }

  fetchMemberData(member: GuildMember): Observable<any> {
    const url = `https://api.tibiadata.com/v4/character/${encodeURIComponent(member.name)}`;
    return this.http.get(url).pipe(
      map((response) => {
        return response;
      })
    );
  }

  checkAccountStatus(member: GuildMember) {
    const premiumVocations = ['Elite Knight', 'Royal Paladin', 'Master Sorcerer', 'Elder Druid'];

    if (premiumVocations.includes(member.vocation)){
      return 'Premium';
    } else {
      return 'Free';
    }
  }

  calculateDaysDifference(dateString: string): number {
    const givenDate = new Date(dateString); // Converte a string para um objeto Date
    const currentDate = new Date(); // Data atual
  
    // Calcula a diferença em milissegundos
    const differenceInTime = currentDate.getTime() - givenDate.getTime();
  
    // Converte a diferença para dias
    const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
  
    return differenceInDays;
  }

  toGuildMember(characterResponse: CharacterResponse): GuildMember {
    const character = characterResponse.character.character;
    return {
      name: character.name,
      level: character.level,
      rank: "",
      status: character.account_status,
      title: character.title,
      vocation: character.vocation,
      joined: ""
    };
  }

  excludeMember(filteredMembers: GuildMember[]): void {
    const url = 'http://localhost:3000/api/guild-action';
  
    let kicked = 0;
    let errors = 0;

    from(filteredMembers)
      .pipe(
        concatMap((member) => {
          const body = {
            character: member.name,
            newrank: 3,
            action: 'exclude', // Ajuste conforme necessário
            page: 'promote',
            GuildName: this.guildName,
            cookies: this.cookies,
            flaggedFor: member.flaggedFor,
            isMock: this.isMock,
            level: member.level,
            daysOffline: member.daysOffline
          };
  
          return this.http.post(url, body).pipe(
            delay(1000),
            catchError((error) => {
              console.error(`Erro ao processar membro ${member.name}:`, error);
              return of(null); // Continua mesmo em caso de erro
            })
          );
        })
      )
      .subscribe({
        next: (response: any) => {
          kicked++;
          console.log(response.message);
          this.logs.push(response.message);
        },
        error: (error) => {
          errors++;
          console.error('Erro na requisição:', error);
          this.logs.push('Erro na requisição:', error);
        },
        complete: () => {
          console.log(`Total de membros expulsos: ${kicked}`);
          console.log(`Total de erros: ${errors}`);
          console.log('Todas as requisições foram concluídas.');
        }
      });
  }
}