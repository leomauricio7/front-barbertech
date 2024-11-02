import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-auth',
  templateUrl: './modal-auth.component.html',
  styleUrls: ['./modal-auth.component.scss'],
})
export class ModalAuthComponent {
  public signup: boolean = false;
  public recovery: boolean = false;

  public form = {
    name: '',
    email: '',
    senha: '',
  };

  public email: string = '';
  public senha: string = '';

  isMessage: boolean = false;
  message: string = '';
  color: string = 'danger';

  constructor() {}

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
    console.log(this.email, this.senha);
    if (!this.email || !this.senha) {
      this.isMessage = true;
      this.color = 'danger';
      this.message = 'ATENÇÃO: Preencha todos os campos.';
      return;
    }

    let user: any = localStorage.getItem('user_save');
    if (!user) {
      this.isMessage = true;
      this.color = 'danger';
      this.message = 'ATENÇÃO: Usúario ou senha incorretos.';
      return;
    }

    user = JSON.parse(user);
    if (user.email === this.email && user.senha === this.senha) {
      console.log('Usário logado com sucesso');
      this.isMessage = true;
      this.message = 'Usário logado com sucesso.';
      this.color = 'success';
    } else {
      this.isMessage = true;
      this.color = 'danger';
      this.message = 'ATENÇÃO: Usúario ou senha incorretos.';
      return;
    }
  }

  register(): void {
    if (!this.form.name || !this.form.email || !this.form.senha) {
      this.isMessage = true;
      this.color = 'danger';
      this.message = 'ATENÇÃO: Preencha todos os campos.';
      return;
    }

    localStorage.setItem('user_save', JSON.stringify(this.form));
    this.isMessage = true;
    this.message = 'Cadastro realizado com sucesso.';
    this.color = 'success';
    this.resetForm();
  }

  recoveryPassword() {}

  resetForm() {
    this.form = {
      name: '',
      email: '',
      senha: '',
    };
  }
}
