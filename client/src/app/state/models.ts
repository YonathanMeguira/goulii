export type Log = {
    id: string;
    log: string;
    userId: string;
    invokedTimes: number;
    lastInvoked?: number;
    createTime: number;
    user?: Contact;
}

export type Contact = {
    name: string;
    id: string;
    phone: string;
}

export const CONTACTS = {
    JONATHAN: {
        name: 'jonathan',
        id: '5iNSvvsXLxrlm7vt7l1c',
        phone: '+972586288454'
    }
}


export type ContactMap = {
    [key: string]: Contact
}

export type AppState = {
    logs: Log[];
    users: ContactMap;
}