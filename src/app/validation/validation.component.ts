import { Component, Input } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent {
  @Input() control!: FormControl
  @Input() inputType!: string;
  @Input() label!: string;
  constructor() { }

  errorMassages() {
    const dirty = this.control.dirty;
    const touched = this.control.touched;
    const errors  = this.control.errors;
    return dirty && touched && errors;
  }

}
