import { Injectable } from '@angular/core';
import { Report } from './report/report.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReportListService {
  private apiUrl = 'https://272.selfip.net/apps/SUUyCz89o0/collections/Reports/documents/'

  constructor(private http: HttpClient) {}

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.apiUrl)
  }

  deleteReport(id: string): Observable<Report> {
    console.log("Deleting report: " + id)
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<Report>(url)
  }

  addReport(report: Report): Observable<Report> {
    console.log("Adding report: " + report.id)
    return this.http.post<Report>(this.apiUrl, {
      "key": report.id,
      "data": report
    })
  }

  getReport(id: string): Observable<Report> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Report>(url) 
  }

  updateReport(report: Report): Observable<Report> {
    const url = `${this.apiUrl}/${report.id}`
    return this.http.put<Report>(url, {
      "key": report.id,
      "data": report
    })
  }
}
