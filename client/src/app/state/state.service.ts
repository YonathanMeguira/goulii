import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { AppState, Log } from './models';

@Injectable({ providedIn: 'root' })
export class StateService {

    state = new BehaviorSubject<AppState>(null as any);

    constructor() { }

    update(key: keyof AppState, value: any) {
        const newValue = { ...this.state.getValue(), [key]: value };
        this.state.next(newValue);
    }

    select(prop: keyof AppState) {
        return this.state.pipe(pluck(prop));
    }

    hasData(prop: keyof AppState) {
        return !!this.state.getValue() && !!this.state.getValue()[prop];
    }

    getUsersMap() {
        const map: any = {};
        const { users } = this.state.getValue();
        users.forEach(user => map[user.id] = user);

        return map;
    }

    // todo: fix this method returns the list along with associated users
    getList() {
        return this.select('logs').pipe(
            map((logs) => logs && logs.map(log => {
                return { ...log, user: this.getUsersMap()[(log as Log).userId] }
            }))
        )
    }
}


