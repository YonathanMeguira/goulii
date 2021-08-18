import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ContactMap, CONTACTS, Log } from './models';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })

export class AppService {

    constructor(private http: HttpClient, private state: StateService) { }

    init() {
        if (!this.state.hasData('logs')) {
            combineLatest([this.getLogs(), this.getUsers()]).pipe(
                tap(([logs, users]) => {
                    const mappedLogs = logs.map(log => (
                        {
                            ...log,
                            createTime: this.humanizeDate(log.createTime),
                            lastInvoked: this.humanizeDate(log.lastInvoked as number),
                            user: users[log.userId]
                        }
                    ));
                    this.state.update('logs', mappedLogs);
                    this.state.update('users', users);
                })
            ).subscribe();
        }
    }


    getLogs(): Observable<Log[]> {
        const path = this.getEndpoint('get-logs');
        return this.http.get<Log[]>(path)
    }

    getUsers(): Observable<ContactMap> {
        const path = this.getEndpoint('get-users');
        return this.http.get<ContactMap>(path)
    }

    addLog(userId = CONTACTS.JONATHAN.id, log: string) {
        return this.http.post(this.getEndpoint('log'), { userId, log });
    }


    private getEndpoint(path: string): string {
        const host = window.location.href.includes('local') ?
            'http://localhost:3001' : '';

        return `${host}/${path}`;
    }

    private humanizeDate(date: number): string {
        if (date) {
            const dateObj = new Date(date);
            return `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`;
        } else {
            return 'N/A';
        }
    }

}