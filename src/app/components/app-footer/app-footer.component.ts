import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})

export class AppFooterComponent implements OnInit {

  public activeCompany;

  constructor(public api: CompanyService) { }

  //signals to load update page
  public updateActiveCompany () {
    this.api.editCompany( this.activeCompany );
  }

  //signals deletion page
  public deleteActiveCompany () {
    const r = confirm( 'Delete Active Company?' );
    if( r ) this.api.deleteCompany( this.activeCompany );
  }

  ngOnInit() {
    this.api.getActiveCompanyID().subscribe(
      a => {
        this.activeCompany = a
      }
    );
  }

}
