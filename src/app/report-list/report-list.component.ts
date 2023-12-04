import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent, Report } from '../report/report.component';
import { FormsModule } from '@angular/forms';
import { ReportListService } from '../report-list.service';
import { RouterLink } from '@angular/router';
import { ReportAddFormComponent } from "../report-add-form/report-add-form.component";
import { TableHeaderToggleComponent } from '../table-header-toggle/table-header-toggle.component';
import { Md5 } from 'ts-md5';
import { ReportStatus } from '../../shared/enums/report-status';
import { AuthenticatorService } from '../authenticator.service';

@Component({
    selector: 'app-report-list',
    standalone: true,
    templateUrl: './report-list.component.html',
    imports: [CommonModule, ReportComponent, FormsModule, RouterLink, ReportAddFormComponent, TableHeaderToggleComponent]
})
export class ReportListComponent implements OnInit {
  reports: Report[]
  query: string

  constructor(private reportListService: ReportListService,
              private authenticatorService: AuthenticatorService) {
    this.reports = []
    this.query = ''
  }

  ngOnInit(): void {
    this.reloadReports()
  }

  reloadReports() {
    this.reports = []
    this.reportListService
      .getReports()
      .subscribe(result => {
        result.forEach((pair: any) => {
          this.reports.push(pair.data);
        })
      })
  }

  onReportDelete(e: any) {
    if (!this.authenticatorService.authenticate()) {
      return
    }

    let deleteReportId = e['delete_report_id'];
    this.reportListService
      .deleteReport(deleteReportId)
      .subscribe(
        () => {
          this.reports = this.reports.filter(r => {
          if (r.id != deleteReportId) {
            return true
          } else {
            return false
          }
        })
        window.location.reload() // For map component
      })
  }

  addReport(report: Report) {
    let oldCount = this.reports.length
    this.reportListService
      .addReport(report)
      .subscribe((res: any) => {
        this.reports.push(res.data)
        if (this.reports.length == oldCount) {
          alert("Error! Report submission failed. Please try again")
        } else {
          alert("Successfully addded report!")
        }
        window.location.reload() // For map component
      })
  }

  onReportChangeStatus(e: any) {
    if (!this.authenticatorService.authenticate()) {
      return
    }
    this.reportListService
      .getReport(e['change_status_report_id'])
      .subscribe((result: any) => {
        let report = result.data as Report
        let oldStatus = report.status
        report.status = ReportStatus.rotate(report.status)
        console.log("Changed report " + report.id + "'s status from " + oldStatus + " to " + report.status)
        this.reportListService.updateReport(report)
          .subscribe(() => this.reloadReports())
      })
  }
}
