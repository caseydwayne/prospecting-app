import { Component, OnInit, Directive, Input } from '@angular/core';
import { COMPANY } from '../../../data/models/company';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})


export class TabComponent implements OnInit {

  @Input('company') company: COMPANY;

  constructor(){
  }

  ngOnInit() {
  }

}
