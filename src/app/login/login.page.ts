import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private storage: Storage,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  async onSubmit() {
    const userIsValid = await this.userIsValid();

    if (!userIsValid) {
      this.pushNotification('Credenciales incorrectas');
      this.loginForm.reset();
      return;
    }

    this.router.navigate(['/home']);
  }

  async pushNotification(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger',
      position: 'top',
    });

    await toast.present();
  }

  async userIsValid() {
    const user = await this.storage
      .get('user')
      .then((user) => JSON.parse(user));

    if (
      user.username !== this.loginForm.value.username ||
      user.password !== this.loginForm.value.password
    )
      return false;

    return true;
  }
}
