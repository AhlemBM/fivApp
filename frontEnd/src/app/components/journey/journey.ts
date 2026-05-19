import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

interface Stage {
  id: number;
  title: string;
  description?: string;
  body?: string;
  goal: string;
  current?: boolean;
}
@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './journey.html',
  styleUrl: './journey.scss',
})
export class Journey {
  currentStage = "سحب البويضات";
  mood = "🌸 هادئة";
  message = "أنتِ أقوى مما تتخيلين 💜";
  progress = 40;

  stages: Stage[] = [
    {
      id: 1,
      title: 'الفحوصات الأوّلية',
      description: 'تحاليل هرمونية وفحوصات أساسية.',
      body: 'قد تشعرين بالقلق فقط.',
      goal: 'فهم وضعكِ الصحي'
    },
    {
      id: 2,
      title: 'تحفيز المبايض',
      description: 'حقن يومية لتحفيز إنتاج البويضات.',
      body: 'انتفاخ خفيف، تقلّبات مزاجية.',
      goal: 'الحصول على عدد جيد من البويضات'
    },
    {
      id: 3,
      title: 'متابعة نموّ البويضات',
      description: 'إيكوغرافيا وتحاليل دم.',
      body: 'حساسية في البطن.',
      goal: 'تحديد موعد السحب'
    },
    {
      id: 4,
      title: 'سحب البويضات',
      description: 'عملية قصيرة تحت تخدير خفيف.',
      body: 'راحة 24 ساعة بعد العملية.',
      goal: 'جمع البويضات الناضجة',
      current: true
    },
    {
      id: 5,
      title: 'تجميع الحيوانات المنوية',
      goal: 'تحضير العيّنة للإخصاب'
    },
    {
      id: 6,
      title: 'الإخصاب في المختبر',
      goal: 'تكوين الأجنّة'
    },
    {
      id: 7,
      title: 'زراعة الأجنّة',
      goal: 'متابعة نمو الأجنّة'
    },
    {
      id: 8,
      title: 'نقل الجنين',
      goal: 'زرع الجنين في الرحم'
    },
    {
      id: 9,
      title: 'فترة الانتظار',
      goal: 'راحة جسدية ونفسية'
    },
    {
      id: 10,
      title: 'اختبار الحمل',
      goal: 'تحليل دم Beta-hCG'
    }
  ];
}
