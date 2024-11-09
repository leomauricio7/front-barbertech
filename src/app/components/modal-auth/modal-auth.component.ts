import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-auth',
  templateUrl: './modal-auth.component.html',
  styleUrls: ['./modal-auth.component.scss'],
})
export class ModalAuthComponent implements OnInit {
  public signup: boolean = false;
  public recovery: boolean = false;
  public isLoad: boolean = false;

  public form = {
    name: '',
    email: '',
    phone: '',
    gender: 'O',
  };

  public formRecovery = {
    username: '',
    newPassword: '',
  };

  public email: string = '';
  public senha: string = '';

  isMessage: boolean = false;
  message: string = '';
  color: string = 'danger';
  public authLogin: any;

  constructor(
    private readonly apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // subject de ficar ouvindos eventos
    this.authService.loggedInUser$.subscribe((isLogged) => {
      if (isLogged) {
        const auth = localStorage.getItem('user_log_barber');
        if (auth) this.authLogin = JSON.parse(auth);
      } else {
        // pega do local storage caso exista
        const auth = localStorage.getItem('user_log_barber');
        if (auth) {
          this.authLogin = JSON.parse(auth);
        } else {
          this.authLogin = null;
        }
      }
    });
  }

  isSignup(): void {
    this.isMessage = false;
    this.signup = true;
    this.recovery = false;
  }

  isSignin(): void {
    this.isMessage = false;
    this.signup = false;
    this.recovery = false;
  }

  isRecovery() {
    this.recovery = !this.recovery;
    this.signup = false;
  }

  auth(): void {
    if (!this.email || !this.senha) {
      this.isMessage = true;
      this.color = 'danger';
      this.message = 'ATENÇÃO: Preencha todos os campos.';
      return;
    }

    this.isLoad = true;
    this.apiService.login(this.email, this.senha).subscribe({
      next: (auth) => {
        console.log('Usário logado com sucesso');
        this.isMessage = true;
        this.message = 'Usário logado com sucesso.';
        this.color = 'success';
        localStorage.setItem('user_log_barber', JSON.stringify(auth));

        this.authService.setLoggedInUser(true);
        this.isLoad = false;
      },
      error: (er) => {
        this.isLoad = false;
        this.isMessage = true;
        this.color = 'danger';
        this.message = 'ATENÇÃO: Usúario ou senha incorretos.';
      },
      complete: () => (this.isLoad = false),
    });
  }

  register(): void {
    if (!this.form.name || !this.form.email || !this.form.phone) {
      this.isMessage = true;
      this.color = 'danger';
      this.message = 'ATENÇÃO: Preencha todos os campos.';
      return;
    }

    this.isLoad = true;
    this.form.phone = this.formatPhone(this.form.phone);

    this.apiService.register(this.form).subscribe({
      next: (auth) => {
        this.isMessage = true;
        this.message = 'Cadastro realizado com sucesso.';
        this.color = 'success';
        this.resetForm();
        this.isLoad = false;
      },
      error: (er) => {
        this.isLoad = false;
        this.isMessage = true;
        this.color = 'danger';
        this.message = 'ATENÇÃO: Error no cadastro.';
      },
      complete: () => (this.isLoad = false),
    });
  }

  recoveryPassword(): void {
    if (!this.formRecovery.username || !this.formRecovery.newPassword) {
      this.isMessage = true;
      this.color = 'danger';
      this.message = 'ATENÇÃO: Preencha todos os campos.';
      return;
    }

    this.isLoad = true;

    this.apiService
      .recoverPassword(
        this.formRecovery.username,
        this.formRecovery.newPassword
      )
      .subscribe({
        next: (auth) => {
          this.isMessage = true;
          this.message = 'Senha recuperada com sucesso.';
          this.color = 'success';
          this.isLoad = false;
          this.signup = false;
          this.recovery = false;
        },
        error: (er) => {
          this.isMessage = true;
          this.message = 'Senha recuperada com sucesso.';
          this.color = 'success';
          this.isLoad = false;
          this.signup = false;
          this.recovery = false;
        },
        complete: () => (this.isLoad = false),
      });
  }

  resetForm() {
    this.form = {
      name: '',
      email: '',
      phone: '',
      gender: 'O',
    };
  }

  public close() {
    this.isLoad = false;
    this.isMessage = false;
  }

  private formatPhone(phone: string): string {
    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone.length === 11) {
      return cleanedPhone.replace(/(\d{2})(\d{5})(\d{4})/, '$1 $2-$3');
    } else if (cleanedPhone.length === 10) {
      return cleanedPhone.replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2-$3');
    } else {
      return 'O phone deve estar no formato 84 99234-5678 ou 84 3234-5678';
    }
  }

  logout() {
    localStorage.removeItem('user_log_barber');
    this.authService.setLoggedInUser(false);
  }
}
