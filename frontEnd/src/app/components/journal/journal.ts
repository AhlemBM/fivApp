import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JournalService } from '../../services/journal-service';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, Footer],
  templateUrl: './journal.html',
  styleUrls: ['./journal.scss']
})
export class Journal implements OnInit {

  form: any = {
    thought: '',
    stress: '',
    comfort: '',
    selfNeed: '',
    selfAdvice: '',
    anxiety: '',
    control: '',
    strength: '',
    support: '',
    freeText: ''
  };

  loading = false;
  message = '';
  showSupportPopup = false;
  supportMessage = '';
  constructor(private journalService: JournalService) {}

  ngOnInit(): void {
    this.loadToday();
  }

  loadToday(): void {

    this.journalService.getToday()
      .subscribe({
        next: (res) => {
          if (res) {
            this.form = { ...this.form, ...res };
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  save(): void {

    this.loading = true;

    this.journalService.save(this.form)
      .pipe(
        finalize(() => {
          // 🔥 toujours exécuté (success + error)
          this.loading = false;
        })
      )
      .subscribe({

        next: () => {

          this.loading = false;

          this.message = 'تم حفظ يومك بنجاح ❤️';

          // 🔥 SUPPORT POPUP
          this.supportMessage =
            "🤍 نحن فخورون بكِ. ما كتبتيه مهم، وخذي وقتك للعناية بنفسك اليوم.";

          this.showSupportPopup = true;

          // auto close after 5 sec (optional)
          setTimeout(() => {
            this.showSupportPopup = false;
          }, 5000);
        },

        error: (err) => {

          this.loading = false;
          console.log(err);
        }
      });
  }
}
