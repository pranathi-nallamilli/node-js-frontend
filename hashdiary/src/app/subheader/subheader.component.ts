import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css']
})
export class SubheaderComponent implements OnInit {
  @Input() title:string="DASHBOARD";
  constructor() { }

  ngOnInit(): void {
  }

}
