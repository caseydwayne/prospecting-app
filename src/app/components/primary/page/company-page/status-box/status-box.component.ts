import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from '../../../../../services/company.service';

@Component({
  selector: 'status-box',
  templateUrl: './status-box.component.html',
  styleUrls: ['./status-box.component.scss']
})

export class StatusBoxComponent implements OnInit {

  @Input() name;

  constructor() { }

  ngOnInit() {
  }

}
