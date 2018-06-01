import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../../services/company.service';

@Component({
  selector: 'add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  constructor(private api: CompanyService) { }

  public createCompany (){
    console.log('I would create a company from FormControls.');
    //this.api.createCompany(data).etc
  }

  ngOnInit() {
    //reset CID to 0 to prevent accidental update/delete ops
    this.api.setActiveCompanyID(0);
  }

}
