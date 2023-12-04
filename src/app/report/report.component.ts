import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportStatus } from '../../shared/enums/report-status';
import { Witness } from '../../shared/interfaces/witness';
import { Location } from '../../shared/interfaces/location';
import { Router } from '@angular/router';
import * as uuid from 'uuid';

export class Report {
  id: string
  dateTime: string
  status: ReportStatus
  constructor(public witness: Witness, public villain: string, public location: Location,
              public image: string, public description: string) {
    this.id = uuid.v4()
    this.dateTime = new Date().toLocaleString()
    this.status = ReportStatus.open
  }
}

@Component({
  selector: 'tr[app-report]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.component.html'
})
export class ReportComponent {
  @Input() report!: Report;
  @Output() delete: EventEmitter<Report> = new EventEmitter()
  @Output() changeStatus: EventEmitter<Report> = new EventEmitter()

  constructor(private router: Router) {}

  onDelete(e: any, id: string) {
    e['delete_report_id'] = id
    this.delete.emit(e)
  }

  onStatusChange(e: any, id: string) {
    e['change_status_report_id'] = id
    this.changeStatus.emit(e)
  }

  onView() {
    this.router.navigate(['/report', this.report.id])
  }
}
