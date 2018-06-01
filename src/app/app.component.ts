import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {

  title = 'Prospecting App';

  constructor() {}

  public loading: (boolean) = true;

  ngAfterViewInit() {
    setTimeout( () => { this.loading = false; } );
  }

}
