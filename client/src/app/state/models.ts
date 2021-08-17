export type Log = {
    id: string;
    log: string;
    userId: string;
    invokedTimes: number;
    lastInvoked?: number;
    createTime: number;
}

export type Contact = {
    name: string;
    phone: string;
}


export const mockContact: Contact = {
    name: 'jonathan',
    phone: '+972586288454'
}

export type AppState = {
    logs: Log[];
    users: Contact[];
}