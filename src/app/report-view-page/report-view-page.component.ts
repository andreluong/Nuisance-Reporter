import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReportListService } from '../report-list.service';
import { Report } from '../report/report.component';
import { MapComponent } from '../map/map.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-report-view-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MapComponent, NavBarComponent],
  templateUrl: './report-view-page.component.html',
  styleUrl: './report-view-page.component.css'
})
export class ReportViewPageComponent implements OnInit {
  rId: string
  report: Report | null

  constructor(private activatedRoute: ActivatedRoute,
              private reportListService: ReportListService) {
    this.rId = this.activatedRoute.snapshot.params['id']
    this.report = null
  }

  ngOnInit(): void {
    this.reportListService
      .getReport(this.rId)
      .subscribe((result: any) => {
        this.report = result.data as Report
      })
  }
}
