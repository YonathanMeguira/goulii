import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { AppState } from './models';

@Injectable({ providedIn: 'root' })
export class StateService {

    state = new BehaviorSubject<AppState>(null as any);

    constructor() { }

    update(key: keyof AppState, value: any) {
        const newValue = { ...this.state.getValue(), [key]: value };
        this.state.next(newValue);
    }

    select<T>(prop: keyof AppState): Observable<T> {
        return this.state.pipe(pluck(prop)) as any;
    }

    hasData(prop: keyof AppState) {
        return !!this.state.getValue() && !!this.state.getValue()[prop];
    }
}


