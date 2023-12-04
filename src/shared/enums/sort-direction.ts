export enum SortDirection {
    asc = "↑",
    desc = "↓",
    none = ""
}

export namespace SortDirection {
    export function rotateDirection(dir: SortDirection) {
        if (dir == SortDirection.none || dir == SortDirection.desc) {
          return SortDirection.asc
        } else {
          return SortDirection.desc
        }
      }
}