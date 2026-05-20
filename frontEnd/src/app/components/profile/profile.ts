import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ProfileService } from '../../services/profile-service';
import {Navbar} from '../navbar/navbar';

import {Footer} from '../footer/footer';
import {Checkin} from '../checkin/checkin';
import {Cycle} from '../cycle/cycle';
import {Appointment} from '../appointment/appointment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Navbar,
    Checkin,
    Cycle,
    Footer,
    Appointment
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {

  profileForm!: FormGroup;

  loading = false;

  message = '';

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {

    this.initForm();

    this.getProfile();
  }

  initForm(): void {

    this.profileForm = this.fb.group({

      firstName: ['', Validators.required],

      lastName: ['', Validators.required],

      age: [null],

      pregnancyTryDuration: [''],

      isFirstIvf: [''],

      previousAttempts: [0],

      followDoctor: ['']
    });
  }

  getProfile(): void {

    this.loading = true;

    this.profileService.getProfile().subscribe({

      next: (res: any) => {

        console.log('PROFILE:', res);

        this.loading = false;

        const user = res.user || res;

        this.profileForm.patchValue({

          firstName: user.firstName || '',

          lastName: user.lastName || '',

          age: user.age || null,

          pregnancyTryDuration:
            user.pregnancyTryDuration || '',

          isFirstIvf:
            user.isFirstIvf ? 'yes' : 'no',

          previousAttempts:
            user.previousAttempts || 0,

          followDoctor:
            user.followDoctor ? 'yes' : 'no'
        });
      },

      error: (err) => {

        console.log(err);

        this.loading = false;

        this.message =
          err.error?.message ||
          'Erreur chargement profil';
      }
    });
  }

  submit(): void {

    if (this.profileForm.invalid) {

      this.message =
        'Veuillez remplir les champs requis';

      return;
    }

    this.loading = true;

    const formData = {

      firstName:
      this.profileForm.value.firstName,

      lastName:
      this.profileForm.value.lastName,

      age:
      this.profileForm.value.age,

      pregnancyTryDuration:
      this.profileForm.value.pregnancyTryDuration,

      isFirstIvf:
        this.profileForm.value.isFirstIvf === 'yes',

      previousAttempts:
      this.profileForm.value.previousAttempts,

      followDoctor:
        this.profileForm.value.followDoctor === 'yes'
    };

    console.log('SEND DATA:', formData);

    this.profileService
      .updateProfile(formData)
      .subscribe({

        next: (res) => {

          console.log(res);

          this.loading = false;

          this.message =
            'Profil mis à jour avec succès';
        },

        error: (err) => {

          console.log(err);

          this.loading = false;

          this.message =
            err.error?.message ||
            'Erreur update profil';
        }
      });
  }
}
