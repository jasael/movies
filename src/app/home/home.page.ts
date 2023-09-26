import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  moviesUrl = 'http://api.tvmaze.com/schedule/full';
  movies: any[] = [];

  searchForm = this.formBuilder.group({
    search: '',
  });

  fetchTimeout: any;

  constructor(private formBuilder: FormBuilder) {}

  async ngOnInit() {
    const data = await fetch(this.moviesUrl);
    const movies = await data.json()

    console.log(movies);
  }

  async onChange(value: any) {
    
    clearTimeout(this.fetchTimeout);

    this.fetchTimeout = setTimeout(async () => {
      const data = await fetch(this.moviesUrl);
      console.log(data)
    }, 2000);
  }
}
