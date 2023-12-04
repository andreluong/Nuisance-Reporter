export enum ReportStatus {
    open = "OPEN",
    resolved = "RESOLVED"
}

export namespace ReportStatus {
    export function rotate(status: ReportStatus) {
        if (status == ReportStatus.open) {
            return ReportStatus.resolved
        } else {
            return ReportStatus.open
        }
    }
}