export const apiKey = "D299AAAE1A294A458D3846FE33A48AC0";
export const ip = "http://192.168.43.60/api/"

export function getLink(endpoint: string): string {
    return `${ip}${endpoint}?apikey=${apiKey}`;
}

export function convertBytes(bytes: string | null): string {
    if (bytes == null) {
        bytes = "0";
    }
    const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    let l = 0,
        n = parseInt(bytes, 10) || 0;

    while (n >= 1024 && ++l) {
        n = n / 1024;
    }

    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
}

export function formatTime(duration: number | null): string {
    if (duration == null) {
        duration = 0;
    }
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    let ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
}

export function formatDate(value: number | null): string {
    if (value == null) {
        value = 0;
    }
    const date = new Date(value * 1000);
    const day = date.toLocaleString("default", { day: "2-digit" });
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.toLocaleString("default", { year: "numeric" });

    return day + "-" + month + "-" + year;
}

export function formatProgress(progress: number): number {
    return progress === 100
        ? progress
        : Math.round(progress * 100) / 100;
}

/* eslint @typescript-eslint/no-var-requires: "off" */
export const xlsx = require("json-as-xlsx");
