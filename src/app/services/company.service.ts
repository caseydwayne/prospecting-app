import { Component, Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { COMPANY } from '../data/models/company';

const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable()
export class CompanyService {

  public companies$: Observable<COMPANY[]>;
  public company_count: number = 0;
  public active: BehaviorSubject<number> = new BehaviorSubject(0); //only one company can be active at one time
  private APIURL = 'api/';  // URL to web api

  private api(path?: string){
    return this.APIURL + 'company' + ( path ? '/'+path : '' );
  }

  /*
   * @method listCompanies
   * fetches all companies (intercepted http request to in-memory db)
   */

  public listCompanies(): Observable<COMPANY[]> {
    //console.log( 'listCompanies called' );
    return this.companies$ = this.http.get<COMPANY[]>( this.api() );
  }

  public getActiveCompanyID(){
    return this.active;
  }

  public setActiveCompanyID(n:any){
    return this.active.next(n);
  }

  public resetActiveCompany(){
    this.setActiveCompanyID(0);
  }

  /*
   * @method activateCompany
   * triggers upon clicking a company tab
   */

  public activateCompany(company: COMPANY) {
    //console.log('activating company', company.id);
    return this.setActiveCompanyID(company.id);
    //ng route set in sidebar.component
  }

  /*
   * @method getCompany
   * fetches a company by ID
   */

  public getCompany(id: any, deep?: boolean) {//: Observable<COMPANY>
    //console.log( 'fetching company', id );
    const url = this.api(id);
    return this.http.get<COMPANY>(url);
  }

  /*
   * @method updateCompany
   * updates a company by ID
   */

  public updateCompany(id: any, data: COMPANY){
    console.log( 'Updating company', id, data );
    const url = this.api(id);
    return this.http.put<COMPANY>( url, data, options );
  }

  /*
   * @method deleteCompany
   * deletes a company by ID
   */

  public deleteCompany(id: any){
    //console.log( 'Add deleteCompany functionality.');
    console.log( 'Deleting Company', id );
    const url = this.api(id);
    return this.http.delete<COMPANY>( url, {} );
  }

  /*
   * @method createCompany
   * creates a company object for database
   */

  public createCompany(data: COMPANY): Observable<COMPANY> {
    console.log( 'Add createCompany functionality.');
    return this.http.post<COMPANY>( this.api(), data, {} );
  }

  public editCompany(id: any){
    console.log( 'Editing Company', id );
    console.log( 'Would re-use add-company form for update prepopulating based on existing values.' );
    //transfer existing data to 'add-company' page for edit/update
    /*
      this.updateCompany( id, newData ).subscribe(
        res => console.log('Company updated!'),
        err => console.log('Company did not update...')
      );
    */
  }

  private refreshCompanies(){
    return this.listCompanies();
  }

  //updates a status
  public updateStatus(id:number,code:number){
    this.getCompany(id).subscribe(
      data => {
        this.updateCompany( id, { ...data, status: code } );
        this.refreshCompanies();
      }
    );
  }

  private testListCompanies(){
    const self = this;
    console.log('Creating CompanyService');
    this.listCompanies().subscribe(
      data => console.log( 'listCompanies returned', data ),
      err => console.log( 'CompanyService: Error;', err )
    )
  }

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    const DEBUG = 0;
    if( DEBUG ) this.testListCompanies();
  }

}
