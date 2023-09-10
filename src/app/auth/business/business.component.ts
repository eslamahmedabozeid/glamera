import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent {
  myForm: FormGroup;

  formData: {
    businessType:any;
    governorate: any;
    district: any;
    howDidYouKnow: any;
    usingSystem: any;
  } = {
    businessType: null,
    governorate: null,
    district: null,
    howDidYouKnow: null,
    usingSystem: null
  };
  businessTypeInput: any;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      businessType: ['', Validators.required],
      governorate: ['', Validators.required],
      district: ['', Validators.required],
      howDidYouKnow: ['', Validators.required],
      usingSystem: ['', Validators.required],
    });
  }



  createAccount() {
    this.myForm.markAllAsTouched();
    if (this.isInputValid(this.formData.businessType)) {
      this.router.navigate(['/successfully']);
    }

    // console.log(this.myForm.valid);
    if (this.myForm.valid) {
    }

  }
  isInputValid(inputValue: string): boolean {
    if (inputValue && inputValue.trim() !== '') {
      return true;
    }
    return false;
  }

}
