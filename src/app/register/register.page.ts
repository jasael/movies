import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userInformationUrl: string =
    'https://randomuser.me/api/?inc=name,login,registered&results=1';
  registerForm = this.formBuilder.group({
    fullName: '',
    username: '',
    password: '',
    registerDate: new Date().toUTCString(),
  });

  constructor(
    private formBuilder: FormBuilder,
    private storage: Storage,
    private toastController: ToastController,
    private router: Router
  ) {}

  async ngOnInit() {
    const data = await this.getUserInformation();

    this.registerForm.patchValue({
      fullName: `${data.name.first} ${data.name.last}`,
      username: data.login.username,
      password: data.login.password,
      registerDate: data.registered.date,
    });
  }

  async getUserInformation() {
    const data = await fetch(this.userInformationUrl);

    if (!data.ok) {
      return {};
    }

    const dataJson = await data.json();
    const user = dataJson.results[0];

    return user;
  }

  async onSubmit() {
    this.storage.set('user', JSON.stringify(this.registerForm.value));

    await this.pushNotification();

    this.registerForm.reset();
    this.router.navigate(['/login']);
  }

  async pushNotification() {
    const toast = await this.toastController.create({
      message: 'User registered successfully',
      duration: 2000,
      color: 'success',
      position: 'top',
    });

    await toast.present();
  }
}
