import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortDirection } from '../../shared/enums/sort-direction';
import { Report } from '../report/report.component';

@Component({
  selector: 'th[app-table-header-toggle]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-header-toggle.component.html'
})
export class TableHeaderToggleComponent {
  @Input() reports: Report[]
  @Input() type: string 
  sorted: SortDirection

  constructor() {
    this.reports = []
    this.type = ""
    this.sorted = SortDirection.none
  }

  compareType(a: Report, b: Report) {
    let s1 = "", s2 = ""

    if (this.type == "Location") {
      s1 = a.location.name
      s2 = b.location.name
    } else if (this.type == "Villain") {
      s1 = a.villain
      s2 = b.villain
    } else if (this.type == "Time Reported") {
      s1 = a.dateTime
      s2 = b.dateTime
    }
    return {a: s1, b: s2}
  }

  toggleSort() {
    this.sorted = SortDirection.rotateDirection(this.sorted)

    this.reports = this.reports.sort((a: Report, b: Report) => {
      let pair = this.compareType(a, b)
      // reverse order
      if (this.sorted == SortDirection.desc) {
        let temp = pair.a
        pair.a = pair.b
        pair.b = temp
      }
      return (pair.a > pair.b) ? 1 : ((pair.b > pair.a) ? -1 : 0)
    }) 
  }
}