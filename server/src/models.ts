export type LogAlert = {
    phones: string[];
    logId: string;
}

export type Alert = {
    phones: string[];
    log: string;
    invokedTimes: number;
    lastInvoked: number;
}