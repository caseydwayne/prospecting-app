import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
//import { COMPANY_LIST } from '../../data/mocks/company-list';
import { COMPANY } from '../../data/models/company';
import { CompanyService } from '../../services/company.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit, OnChanges, AfterViewInit {

  public company_list;//: COMPANY[];

  constructor(private api: CompanyService) {}
  
  public activateCompany(company:COMPANY){
    this.api.activateCompany(company);
  }

  public refreshList(){
    this.api.refreshCompanies();
  }

  private report( data ){
    console.log( 'SidebarComponent fetched company list as', data );
  }

  public getCompanies(){
    this.api.company_list.subscribe(
      x => {
        this.company_list =  this.api.getCompanies();
      }
    );
  }

  public xgetCompanies(){
    //doing it this way to update the bar when the company_list changes
    this.api.getCompaniesSubject().getValue().subscribe(
      data => {
        this.company_list = data;
        //this.api.getCompanies();
      }
    );
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  ngAfterViewInit() {

      this.getCompanies();
  }

}
