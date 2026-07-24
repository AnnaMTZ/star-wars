import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { landingService } from '../../services/landing.service/landing.service';

@Component({
  selector: 'app-people',
  imports: [CommonModule],
  templateUrl: './people.html',
  styleUrl: './people.scss',
})
export class People implements OnInit {
  private route = inject(ActivatedRoute);
  private landingService = inject(landingService);
  private cdr = inject(ChangeDetectorRef);

  person: any = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.landingService.getPerson(id).subscribe({
          next: (data: any) => {
            this.person = data;
            this.cdr.detectChanges();
          },
          error: err => console.error(err)
        });
      }
    });
  }
}