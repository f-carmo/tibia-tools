import * as moment from 'moment';

export class Timer {
    id: number;
    lap: number;        //time in hours
    name: string;
    active: boolean;
    startTime: Date;
    endTime: Date;
    displayText: string;
    intervalRef: any;

    constructor(name?: string, lap?: number, startTime?: Date, active?: boolean) {
        this.lap = lap;
        this.startTime = startTime;
        this.name = name;
        this.active = active;
        this.id = Math.floor(Math.random() * (10000));
        this.setEndTime();
    }

    calculateTimeLeft() {
        let endTime = moment(this.endTime);
        if (typeof this.endTime === "undefined") {
            throw new Error("endTime not defined");            
        } else {
            let duration = moment.duration(endTime.diff(moment()));
            return duration;
        }
    }

    startTimer() {
        this.setEndTime();
        this.activateTimer();
    }

    restartTimer() {
        this.startTime = new Date();
        this.setEndTime();
        this.activateTimer();
    }

    resumeTimer() {
        if (!this.isEnded()) {
            this.activateTimer();
        }
    }

    formattedDisplay() {
        let duration = this.calculateTimeLeft();

        if (duration.days() * 24 > 1) {
            return duration.days() + " dias, " + duration.hours() + " horas, " + duration.minutes() + " minutos e " + duration.seconds() + " segundos";
        } if (duration.days() * 24 > 0) {
            return duration.days() + " dia, " + duration.hours() + " horas, " + duration.minutes() + " minutos e " + duration.seconds() + " segundos";
        } if (duration.hours() > 0) {
            return duration.hours() + " horas, " + duration.minutes() + " minutos e " + duration.seconds() + " segundos";
        } else {
            return duration.minutes() + " minutos e " + duration.seconds() + " segundos";
        }
    }

    setEndTime() {
        this.endTime = moment(this.startTime).add(this.lap, 'hours').toDate();
    }

    activateTimer() {
        this.active = true;
        this.displayText = this.formattedDisplay();
        this.intervalRef = setInterval(() => {
            this.displayText = this.formattedDisplay();
            this.pauseIfEnded();
        }, 1000);
    }

    pauseIfEnded() {
        if (moment().isAfter(this.endTime) || !this.active) {
            this.pauseTimer();
        }
    }

    isEnded() {
        if (moment().isAfter(this.endTime)) {
            return true;
        } else {
            return false;
        }
    }

    pauseTimer() {
        this.active = false;
        clearInterval(this.intervalRef);
        this.setDefaultDisplayText();
    }

    setDefaultDisplayText() {
        if (this.lap == 1) {
            this.displayText = this.lap + " hora";
        } else if (this.lap <= 24) {
            this.displayText = this.lap + " horas";
        } else if (this.lap < 48){
            this.displayText = this.lap / 24 + " dia";
        } else {
            this.displayText = this.lap / 24 + " dias";
        }
    }

    JSONToObject(json) {
        this.id = json.id;
        this.lap = json.lap;
        this.name = json.name;
        this.active = json.active;
        this.startTime = moment(json.startTime).toDate();
        this.endTime = moment(json.endTime).toDate();

        this.setDefaultDisplayText();
    }
}

export function createEmptyTimer(): Timer {
    return new Timer();
}

export function createFromJSON(jsonObject): Timer {
    let timer = new Timer();
    timer.JSONToObject(jsonObject);
    return timer;
}

export function createInitializedTimer(name: string, lap: number): Timer {
    return new Timer(name, lap, new Date(), true);
}