// checkin.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { CheckinService } from '../../services/checkin-service';

@Component({
  selector: 'app-checkin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './checkin.html',
  styleUrls: ['./checkin.scss']
})
export class Checkin implements OnInit {

  form!: FormGroup;

  // =========================
  // OPTIONS
  // =========================

  moods = [
    '😊 بخير',
    '🌸 هادئة',
    '😟 قلقة',
    '😢 حزينة',
    '😴 متعبة',
    '💪 متفائلة'
  ];

  thinking = [
    'نعم',
    'أحيانًا',
    'لا'
  ];

  stress = [
    'قليلًا',
    'متوسط',
    'كثيرًا'
  ];

  sleep = [
    'جيد',
    'متقطع',
    'سيّئ'
  ];

  support = [
    'الزوج',
    'العائلة',
    'صديقات',
    'لا أحد'
  ];

  needs = [
    'كلمة طمأنينة',
    'معلومة طبية',
    'تأمّل قصير',
    'دعاء',
    'صمت',
    'حديث مع شخص'
  ];

  // =========================
  // SELECTED VALUES
  // =========================

  selected: any = {
    mood: null,
    thinking: null,
    stress: null,
    sleep: null,
    support: null
  };

  selectedNeeds: string[] = [];

  // emotional content
  selectedNeedMessage: any = null;

  constructor(
    private fb: FormBuilder,
    private checkinService: CheckinService
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      tension: [3]
    });
  }

  // =========================
  // SIMPLE SELECT
  // =========================

  select(key: string, value: string): void {
    this.selected[key] = value;
  }

  isActive(key: string, value: string): boolean {
    return this.selected[key] === value;
  }

  // =========================
  // NEEDS
  // =========================

  toggleNeed(n: string): void {

    // remove
    if (this.selectedNeeds.includes(n)) {

      this.selectedNeeds = this.selectedNeeds.filter(x => x !== n);

      this.selectedNeedMessage = null;

      return;
    }

    // single select UX
    this.selectedNeeds = [n];

    // mapping front -> backend
    const typeMap: any = {

      'كلمة طمأنينة': 'comfort',

      'معلومة طبية': 'medical_info',

      'تأمّل قصير': 'meditation',

      'دعاء': 'dua',

      'صمت': 'silence',

      'حديث مع شخص': 'talk'
    };

    const type = typeMap[n];

    // API CALL
    this.checkinService.getContentByType(type)
      .subscribe({

        next: (res: any) => {

          this.selectedNeedMessage = res.data;
        },

        error: (err) => {
          console.log(err);
        }
      });
  }

  isNeedActive(n: string): boolean {
    return this.selectedNeeds.includes(n);
  }

  // =========================
  // SUBMIT
  // =========================

  submit(): void {

    const payload = {

      userId: 1, // replace with auth user later

      checkinDate: new Date(),

      mood: this.selected.mood,

      stressLevel: this.form.value.tension,

      thinkingAboutResult: this.selected.thinking,

      pressureLevel: this.selected.stress,

      sleepQuality: this.selected.sleep,

      supportSource: this.selected.support,

      need: this.selectedNeeds.join(', ')
    };

    this.checkinService.create(payload)
      .subscribe({

        next: (res) => {

          console.log(res);

          alert('تم حفظ مشاعر اليوم 💛');
        },

        error: (err) => {
          console.log(err);
        }
      });
  }
}
