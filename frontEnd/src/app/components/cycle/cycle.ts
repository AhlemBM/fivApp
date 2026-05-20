// cycle.component.ts

import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CycleService } from '../../services/cycle-service';
import {AuthService} from '../../services/auth-service';
import {Appointment} from '../appointment/appointment';

@Component({
  selector: 'app-cycle',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Appointment
  ],
  templateUrl: './cycle.html',
  styleUrls: ['./cycle.scss']
})
export class Cycle implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cycleService: CycleService,
  private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.form = this.fb.group({
        userId: [user.id],

      startDate: ['', Validators.required],

      cycleLength: [28],

      isRegular: [true],

      stage: ['الفحوصات الأوّلية'],

      nextAppointment: [''],

      hormones: [''],

      medications: this.fb.array([])
    });

    this.addMed();
  }

  get meds(): FormArray {
    return this.form.get('medications') as FormArray;
  }

  addMed(): void {

    const medForm = this.fb.group({
      name: [''],
      time: ['']
    });

    this.meds.push(medForm);
  }

  removeMed(index: number): void {
    this.meds.removeAt(index);
  }

  setRegular(value: boolean): void {
    this.form.patchValue({
      isRegular: value
    });
  }

  submit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;

    const cyclePayload = {
      userId: formData.userId,
      startDate: formData.startDate,
      cycleLength: formData.cycleLength,
      isRegular: formData.isRegular,
      currentPhase: formData.stage,
      nextAppointment: formData.nextAppointment,
      hormones: formData.hormones,
      remindersEnabled: true
    };

    this.cycleService.createCycle(cyclePayload)
      .subscribe({
        next: (cycle: any) => {

          const cycleId = cycle.data.id;

          formData.medications.forEach((med: any) => {

            const medPayload = {
              cycleId: cycleId,
              name: med.name,
              time: med.time,
              reminder: true
            };

            this.cycleService.createMedication(medPayload)
              .subscribe();
          });

          alert('Cycle enregistré avec succès');

          this.form.reset();

          this.meds.clear();

          this.addMed();
        },

        error: (err) => {
          console.log(err);
        }
      });
  }
}
