import { Component ,ElementRef, Renderer2,OnDestroy,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CodeInputModule } from 'angular-code-input';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{
  emailForm: FormGroup;
  passwordVisible: boolean = false;
  remainingTime: number = 60; // Initial time in seconds
  private subscription: Subscription | undefined;


  constructor(private formBuilder: FormBuilder,private renderer: Renderer2) {
    this.emailForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      agree: [false, Validators.requiredTrue],
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    // Check the validity of the form
    if (this.emailForm.valid) {
      // Handle the form submission here
      console.log('Form submitted successfully');

      const formData = this.emailForm.value;
      console.log('Form data:', formData);

      this.openSuccessModal();
       // Create an observable that emits a value every second
    const timer$ = interval(1000);

    // Subscribe to the timer and update the remaining time
    this.subscription = timer$.subscribe(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      }
    });
    } else {
      // Mark all form controls as touched to display error messages
      this.markFormGroupTouched(this.emailForm);
    }
  }

  // Helper function to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement): void {
    this.passwordVisible = !this.passwordVisible;
    passwordInput.type = this.passwordVisible ? 'text' : 'password';
  }

  openSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
      this.renderer.addClass(successModal, 'show'); // Show the modal
      this.renderer.setStyle(successModal, 'display', 'block'); // Set the display style to 'block'
    }
  }
  closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
      this.renderer.removeClass(modal, 'show'); // Remove the 'show' class
      this.renderer.setStyle(modal, 'display', 'none'); // Set display to 'none'
    }
  }

  onCodeChanged(code: string) {
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks when the component is destroyed
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
