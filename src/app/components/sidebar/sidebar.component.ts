import { Component, OnInit } from '@angular/core';
//import { COMPANY_LIST } from '../../data/mocks/company-list';
import { COMPANY } from '../../data/models/company';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  public company_list: COMPANY[];

  constructor(private api: CompanyService) {}

  public activateCompany(company:COMPANY){
    this.api.activateCompany(company);
  }

  ngOnInit() {
    //fetch company_list via shared service
    this.api.listCompanies().subscribe(
      data => {
        console.log( 'SidebarComponent fetched company list as', data );
        this.company_list = data;
      }
    );
  }

}
