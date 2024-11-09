import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { ICompany } from 'src/app/interfaces/company.interface';
import { ApiService } from 'src/app/services/api.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'page-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public isLoad: boolean = false;
  public barbers: ICompany[] = [];
  public selectedBarber: ICompany | null = null;
  public searchQuery: string = '';
  private searchSubject: Subject<string> = new Subject<string>();

  constructor(
    private readonly http: ApiService,
    private readonly locationService: LocationService
  ) {}

  async ngOnInit() {
    this.getCompanys();

    this.searchSubject
      .pipe(
        debounceTime(500),
        switchMap((query) => this.http.getCompanysByname(query))
      )
      .subscribe((results) => {
        this.barbers = results;
        this.isLoad = false;
      });

    const position: any = await this.locationService.getCurrentLocation();
    console.log(position);
  }

  openModal(barber: any) {
    this.selectedBarber = barber;
  }

  closeModal() {
    const modalElement = document.querySelector('.modal') as HTMLElement;
    if (modalElement) {
      modalElement.classList.remove('show'); // Inicia a animação de saída
      setTimeout(() => {
        this.selectedBarber = null; // Remove o modal do DOM após a animação
      }, 300); // O tempo deve ser igual ao tempo de transição
    }
  }

  onSearchInput() {
    this.isLoad = true;
    this.searchSubject.next(this.searchQuery); // Emite a consulta para ser tratada
  }

  private getCompanys() {
    this.isLoad = true;
    this.http.getCompanys().subscribe({
      next: (response) => {
        this.barbers = response;
      },
      error: (er) => console.error(er),
      complete: () => (this.isLoad = false),
    });
  }

  private getCompanyByName(name: string): void {
    this.isLoad = true;
    this.http.getCompanysByname(name).subscribe({
      next: (response) => {
        this.barbers = response;
      },
      error: (er) => console.error(er),
      complete: () => (this.isLoad = false),
    });
  }
}
