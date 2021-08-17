import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })

export class AppService {

    constructor(private http: HttpClient, private state: StateService) { }


    getLogs() {
        if (!this.state.hasData('logs')) {
            const path = this.getEndpoint('get-logs');
            this.http
                .get(path)
                .pipe(tap(logs => this.state.update('logs', logs)))
                .subscribe();
        }
    }

    getUsers() {
        if (!this.state.hasData('users')) {
            const path = this.getEndpoint('get-users');
            this.http
                .get(path)
                .pipe(tap(users => this.state.update('users', users)))
                .subscribe();
        }
    }


    private getEndpoint(path: string): string {
        const host = window.location.href.includes('local') ?
            'http://localhost:3001' : '';

        return `${host}/${path}`;
    }

}