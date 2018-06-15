import { Component, Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { COMPANY } from '../data/models/company';

const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable()
export class CompanyService {

  private app_ready = false;
  public company_count: number = 0;
  public active: BehaviorSubject<number> = new BehaviorSubject(0); //only one company can be active at one time
  public update_number: BehaviorSubject<number> = new BehaviorSubject(0);
  public company_list: BehaviorSubject<Observable<COMPANY[]>>;

  private APIURL = 'api/';  // URL to web api

  /*
   * @method api
   * easy access to APIURL
   * @param path {string} optional /{path_to_destination}
   */

  private api(path?: string){
    return this.APIURL + 'company' + ( path ? '/'+path : '' );
  }

  /*
   * @method listCompanies
   * @private
   * fetches all companies (intercepted http request to in-memory db)
   * @note only called when a fetch to API is required
   */

  private listCompanies(): Observable<COMPANY[]> {
    //console.log( 'listCompanies called' );
    const r = this.http.get<COMPANY[]>( this.api() );
    if( !this.app_ready ) {
      this.company_list = new BehaviorSubject(r);
      this.app_ready = true;
    } else this.company_list.next(r);
    return this.company_list.getValue();
  }

  /*
   * @method getCompanies
   * gets and returns company_list
   */

  public getCompanies(){
    return this.app_ready
      ? this.company_list.getValue()
      : this.listCompanies();
  }

  /*
   * @method refreshCompanies
   * automatically refreshes company_list
   */

  public refreshCompanies(){
    const t = this.listCompanies();
    this.company_list.next(t);
    t.subscribe(
      x => this.updated()
    );
    return this.getCompanies();
  }

  /*
   * @method getCompaniesSubject
   * gets and returns the actual BehaviorSubject housing company_list
   */

  public getCompaniesSubject(){
    return this.company_list;
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
   * @private
   * updates a company by ID
   */

  private updateCompany(id: any, data: COMPANY){
    console.log( 'Updating company', id, data );
    const url = this.api(id);
    return this.http.put<COMPANY>( url, data, options );
  }

  private updated() {
    console.log('Updated Service');
    this.update_number.next( this.update_number.getValue() + 1 );
  }

  /*
   * @method deleteCompany
   * deletes a company by ID
   */

  public deleteCompany(id: any) {
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

  /*
   * @method editCompany
   * edit a company object for database
   */

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


  //updates a status
  public updateStatus(id:number,code:number){
    this.getCompany(id).subscribe(
      data => {
        this.updateCompany( id, { ...data, status: code } ).subscribe();
        this.refreshCompanies();
      }
    );
  }

  //extra functions

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
    this.listCompanies(); //pre-fetch
  }

}
