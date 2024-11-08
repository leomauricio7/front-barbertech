import { Component, OnInit } from '@angular/core';
import { IListScheduling } from 'src/app/interfaces/scheduling.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'page-scheduling',
  templateUrl: './scheduling.page.html',
  styleUrls: ['./scheduling.page.scss'],
})
export class SchedulingPage implements OnInit {
  public schedulings!: IListScheduling[];
  public isLoad: boolean = false;
  public auth: any;
  collapsedStates: { [key: string]: boolean } = {};

  constructor(private readonly http: ApiService) {}

  ngOnInit(): void {
    const auth = localStorage.getItem('user_log_barber');
    if (auth) {
      this.auth = JSON.parse(auth);
      this.getScheduling(this.auth.id);
      console.log(this.auth)
    }

  }

  toggleCollapse(id: number) {
    this.collapsedStates[id] = !this.collapsedStates[id];
  }

  private getScheduling(idClient: string) {
    this.isLoad = true;
    this.http.getScheduling(idClient).subscribe({
      next: (response: IListScheduling[]) => {
        this.schedulings = response;
        this.schedulings.forEach((scheduling) => {
          this.collapsedStates[scheduling.id] = false;
        });
      },
      error: (er) => console.error(er),
      complete: () => (this.isLoad = false),
    });
  }
}
