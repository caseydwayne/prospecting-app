import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { COMPANY } from '../../../../data/models/company';
import { CompanyService } from '../../../../services/company.service';

@Component({
  selector: 'company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})

export class CompanyPageComponent implements OnInit {

  public active: boolean;
  public company: COMPANY;
  public cid: number;
  public error: boolean = false;
  public status: String[] = 'research pending accepted declined'.split(' ');
  public statusKey: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: CompanyService
  ) {}

  private getCID (current?:number) {
    //extract Company ID from route (for manual routing)
    this.route.params.subscribe(
      p => {
        try {
          //check for id param
          if( p.id !== current ){
            this.api.setActiveCompanyID( p.id );
            this.cid = p.id;
          }
        } catch(e){ }
      }
    )
  }

  private getCompany (){
    if( this.cid > 0 ){
      //fetch company from API
      this.api.getCompany( this.cid ).subscribe(
        company => {
          this.company = company;
          //console.log('COMPANY::',company);
          this.active = true;
          this.statusKey = company.status;
        },
        (err) => this.error = true
      )
    }
  }

  public updateStatus ( s ){
    this.statusKey = this.status.indexOf(s);
    //console.log('status key--',this.statusKey)
    this.api.updateStatus( this.cid, this.statusKey );
  }

  ngOnInit() {
    //check for manual route (/company/:id)
    this.getCID();
    //bind CID to service value
    this.api.getActiveCompanyID().subscribe(
      r => {
        if( this.cid !== r ){
          this.cid = r;
          //console.log('CompanyPageComponent: fetching company (id)',this.cid);
          return this.getCompany();
        }
        if( !this.active ) this.getCompany();
      }
    )
    //get company data based on CID (self-contained within method)
  }

  ngOnDestroy(){
    this.api.resetActiveCompany();
  }


}
