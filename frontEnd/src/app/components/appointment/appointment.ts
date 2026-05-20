import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AppointmentService } from '../../services/appointement';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment.html',
  styleUrls: ['./appointment.scss']
})
export class Appointment implements OnInit {

  appointmentForm!: FormGroup;

  loading = false;
  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  // ------------------------
  // INIT FORM
  // ------------------------
  initForm(): void {

    this.appointmentForm = this.fb.group({

      nextAppointment: ['', Validators.required],
      doctorName: ['', Validators.required],
      notes: ['']
    });
  }

  // ------------------------
  // SUBMIT APPOINTMENT
  // ------------------------
  saveAppointment(): void {
    if (this.appointmentForm.invalid) {
      this.error = 'Veuillez remplir les champs obligatoires';
      return;
    }

    this.loading = true;
    this.message = '';
    this.error = '';

    const formValue = this.appointmentForm.value;

    // Récupère le cycle actif puis crée le rendez-vous
    this.appointmentService.getMyCycle().subscribe({
      next: (cycleRes) => {
        const payload = {
          appointmentDate: formValue.nextAppointment,
          doctorName: formValue.doctorName,
          notes: formValue.notes,
          cycleId: cycleRes.id  ?? null  // ← ajout
        };

        this.appointmentService.create(payload).subscribe({
          next: (res) => {
            console.log('Appointment saved:', res);
            this.loading = false;
            this.message = 'تم حفظ الموعد بنجاح ❤️';
            this.appointmentForm.reset();
          },
          error: (err) => {
            this.loading = false;
            this.error = err.error?.message || 'Erreur serveur';
          }
        });
      },
      error: () => {
        // Pas de cycle actif — on sauvegarde quand même sans cycleId
        const payload = {
          appointmentDate: formValue.nextAppointment,
          doctorName: formValue.doctorName,
          notes: formValue.notes,
          cycleId: null
        };

        this.appointmentService.create(payload).subscribe({
          next: (res) => {
            this.loading = false;
            this.message = 'تم حفظ الموعد بنجاح ❤️';
            this.appointmentForm.reset();
          },
          error: (err) => {
            this.loading = false;
            this.error = err.error?.message || 'Erreur serveur';
          }
        });
      }
    });
  }
  // ------------------------
  // RESET FORM
  // ------------------------
  resetForm(): void {
    this.appointmentForm.reset();
    this.message = '';
    this.error = '';
  }
}
