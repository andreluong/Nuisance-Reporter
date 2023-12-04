import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ReportListService } from '../report-list.service';
import { Report } from '../report/report.component';
import { Router, RouterLink } from '@angular/router';
import { Location } from '../../shared/interfaces/location';

@Component({
  selector: 'app-report-add-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './report-add-form.component.html',
  styleUrl: './report-add-form.component.css'
})
export class ReportAddFormComponent {
  @Output() onAddReport: EventEmitter<Report> = new EventEmitter()
  form: FormGroup
  locations: Location[]

  constructor(private reportListService: ReportListService, private router: Router) {
    let formControls = {
      witnessName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9 -.a-zA-Z]+$'),
        this.noSpaceOnFirstIndex as ValidatorFn
      ]),
      witnessPhone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{10}')
      ]),
      villain: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9 -.a-zA-Z]+$'),
        this.noSpaceOnFirstIndex as ValidatorFn
      ]),
      locName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9 -.a-zA-Z]+$'),
        this.noSpaceOnFirstIndex as ValidatorFn
      ]),
      locLat: new FormControl('', [
        Validators.required,
        Validators.min(-90),
        Validators.max(90),
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{0,6})?$')
      ]),
      locLong: new FormControl('', [
        Validators.required,
        Validators.min(-180),
        Validators.max(180),
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{0,6})?$')
      ]),
      imageUrl: new FormControl(),
      description: new FormControl('', Validators.maxLength(120))
    }
    this.form = new FormGroup(formControls)
    this.locations = []
    this.getLocations()
  }

  getLocations() {
    this.reportListService.getReports()
    .subscribe(result => {
      result.forEach((pair: any) => {
        this.locations.push(pair.data.location)
      })
    })
  }

  noSpaceOnFirstIndex(control: FormControl) {
    if (control.value != null && control.value[0] == ' ') {
      return {noSpaceOnFirstIndex: true}
    }
    return null
  }

  onSubmit() {
    const val = this.form.value
    let witness = {
      name: val.witnessName,
      phone: val.witnessPhone
    }
    let location = {
      name: val.locName,
      longitude: val.locLong,
      latitude: val.locLat
    }
    let newReport = new Report(
      witness,
      val.villain,
      location,
      val.imageUrl,
      val.description
    )
    this.onAddReport.emit(newReport)
    this.router.navigate(['/reports'])
    this.clearForm()
  }

  clearForm() {
    this.form.reset({
      'witnessName': '',
      'witnessPhone': '',
      'villain': '',
      'locName': '',
      'locLong': '',
      'locLat': '',
      'imageUrl': '',
      'description': ''
    })
  }
}
