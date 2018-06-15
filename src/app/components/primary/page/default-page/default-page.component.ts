import { Component, OnInit } from '@angular/core';
import { COMPANY } from '../../../../data/models/company';
import { CompanyService } from '../../../../services/company.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.scss']
})

export class DefaultPageComponent implements OnInit {

  public version: String;
  public company_count: number = 0;

  constructor(public api: CompanyService) {
    this.version = environment.app_version;
  }

  ngOnInit() {
    this.api.getCompanies().subscribe(
      data => this.company_count = data.length
    )
  }

}
