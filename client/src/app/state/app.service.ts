import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState, Covid19Stats } from './models';
import { StateService } from './state.service';

@Injectable({providedIn: 'root'})

export class AppService {

    constructor(private http: HttpClient, private stateService: StateService) {}

    getTodaySummary(): void {
        this.http
        .get<Covid19Stats[]>(this.getEndpoint('covid'))
        .pipe(tap(stats => this.stateService.update('covidStats', stats))).subscribe();
    }

    private getEndpoint(path: string): string {
        const host = window.location.href.includes('local') ?
        'http://localhost:3001': '';

        return `${host}/${path}`;
    }
    
}