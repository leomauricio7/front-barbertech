import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICompany } from '../interfaces/company.interface';
import { IService } from '../interfaces/service.interface';
import { IBarber } from '../interfaces/barber.interface';
import {
  IListScheduling,
  IScheduling,
} from '../interfaces/scheduling.interface';
import { IRegister } from '../interfaces/auth.interface';

@Injectable()
export class ApiService {
  private uri: string = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  getCompanys(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>(`${this.uri}/company`);
  }

  getServices(idCompany: string): Observable<IService[]> {
    return this.http.get<IService[]>(
      `${this.uri}/service/company/${idCompany}`
    );
  }

  getBarbers(idCompany: string, idService: string): Observable<IBarber[]> {
    return this.http.get<IBarber[]>(
      `${this.uri}/barber/service/${idService}/company/${idCompany}`
    );
  }

  getBarbersTimesAvailability(
    barberId: string,
    dateSelected: string
  ): Observable<[string]> {
    return this.http.get<[string]>(
      `${this.uri}/barber/${barberId}/availability?selectedDate=${dateSelected}`
    );
  }

  scheduling(data: IScheduling): Observable<IScheduling> {
    return this.http.post<IScheduling>(`${this.uri}/scheduling`, data);
  }

  getCompanysByname(name: string): Observable<ICompany[]> {
    return this.http.get<ICompany[]>(`${this.uri}/company/search?name=${name}`);
  }

  getScheduling(
    idClient: string,
    sort: string,
    direction: string
  ): Observable<IListScheduling[]> {
    return this.http.get<IListScheduling[]>(
      `${this.uri}/scheduling/client/${idClient}`,
      {
        params: {
          sort,
          direction,
        },
      }
    );
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(
      `${this.uri}/auth/login?username=${username}&password=${password}`,
      {}
    );
  }

  register(data: IRegister): Observable<IRegister> {
    return this.http.post<IRegister>(`${this.uri}/client`, data);
  }

  recoverPassword(username: string, newPassword: string): Observable<any> {
    return this.http.post<any>(
      `${this.uri}/auth/reset-password?username=${username}&newPassword=${newPassword}`,
      {}
    );
  }
}
