import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from './models';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({providedIn: 'root'})

export class AppService {

    constructor(private http: HttpClient) {}


    getLogs(): Observable<any> {
        const path = this.getEndpoint('get-logs');
        return this.http.get(path);
    }

    private getEndpoint(path: string): string {
        const host = window.location.href.includes('local') ?
        'http://localhost:3001': '';

        return `${host}/${path}`;
    }
    
}