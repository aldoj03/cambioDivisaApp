import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-set-cambios',
  templateUrl: './set-cambios.page.html',
  styleUrls: ['./set-cambios.page.scss'],
})
export class SetCambiosPage implements OnInit {

  public divisasForm;

  constructor() { }

  ngOnInit() {
    this.divisasForm = new FormGroup({
      BS: new FormControl(''),
      COP: new FormControl(''),
      USD: new FormControl('')
    })
  }

}
