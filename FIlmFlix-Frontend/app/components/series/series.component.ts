import { SerieService } from '../services/serie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class SeriesComponent implements OnInit {

  constructor(private serieService:SerieService) { }

  ngOnInit() {
  }

}
