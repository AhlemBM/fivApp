import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class Education {
  activeIndex = 0;

  items = [
    {
      title: 'ما هو طفل الأنابيب؟',
      icon: 'bi-info-circle',
      content: 'طفل الأنابيب هو تقنية مساعدة على الإنجاب يتم فيها تلقيح البويضة بالحيوان المنوي خارج الجسم، ثم نقل الجنين إلى الرحم.'
    },
    {
      title: 'الاسم الطبي (FIV)',
      icon: 'bi-translate',
      content: 'FIV اختصار لـ Fécondation In Vitro، وهو ما يُعرف بـ IVF.'
    },
    {
      title: 'مراحل طفل الأنابيب',
      icon: 'bi-list-check',
      list: [
        'الفحوصات الأوّلية',
        'تحفيز المبايض',
        'متابعة نمو البويضات',
        'سحب البويضات',
        'الإخصاب في المختبر',
        'نقل الجنين'
      ]
    },
    {
      title: 'الأسباب',
      icon: 'bi-search-heart',
      content: 'قد تكون الأسباب من المرأة أو الرجل أو الاثنين معًا.'
    }
  ];

  toggle(index: number) {
    this.activeIndex = this.activeIndex === index ? -1 : index;
  }
}
