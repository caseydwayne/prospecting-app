import { Component, OnInit, Directive, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { COMPANY } from '../../../data/models/company';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})


export class TabComponent implements OnInit, OnDestroy {

  @Input('company') company: COMPANY;
  @ViewChild('tab') tab: ElementRef;

  constructor(){
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    //this.tab.nativeElement.classList.push('slideOutLeft');
    //console.log('destroying tab', this.company.id)
  }
}
