import { Toastr, TOASTR_TOKEN } from '../common/toastr.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  templateUrl: 'app/components/admin/admin.component.html',
  styles: [`
     em {float:right; color:#E05C65; padding-left: 10px;}
    .error input {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder {color:#999;}
    .error ::-moz-placeholder {color:#999;}
    .error :-moz-placeholder {color:#999;}
    .error :-ms-input-placeholder {color:#999;}
  `]
})


export class AdminComponent implements OnInit {

  profileForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;

  constructor(private authService: AuthService, 
              private router: Router,
              @Inject(TOASTR_TOKEN) private toastr: Toastr) { }


  ngOnInit() {
    this.firstName = new FormControl(this.authService.admin.firstName, 
                                     [Validators.required,
                                      Validators.pattern('[a-zA-Z].*')]);
    this.lastName = new FormControl(this.authService.admin.lastName, 
                                    [Validators.required,
                                     Validators.pattern('[a-zA-Z].*')]);

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  saveProfile(formValues) {
    if (this.profileForm.valid) {
      this.authService.updateAdmin(formValues.firstName, formValues.lastName);
      this.toastr.success('Profile Saved');      
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched
  }

  validateLastName() {
    return this.lastName.valid || this.lastName.untouched
  }


}