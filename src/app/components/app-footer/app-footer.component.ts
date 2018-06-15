import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})

export class AppFooterComponent implements OnInit {

  public activeCompany;

  constructor(
    public router: Router,
    public api: CompanyService
  ) { }

  //signals to load update page
  public updateActiveCompany () {
    this.api.editCompany( this.activeCompany );
  }

  //signals deletion page
  public deleteActiveCompany () {
    const r = confirm( 'Delete Active Company?' );
    if( r ) this.api.deleteCompany( this.activeCompany )
      .subscribe(
        x => {
          this.api.refreshCompanies();
          this.router.navigate(['/']); //go to home page on delete
        }
      );
  }

  ngOnInit() {
    this.api.getActiveCompanyID().subscribe(
      a => {
        this.activeCompany = a
      }
    );
  }

}
