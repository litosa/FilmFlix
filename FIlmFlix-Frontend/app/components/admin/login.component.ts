import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';



@Component({
    templateUrl: 'app/components/admin/login.component.html',
    styles: [`
        em { float:right; color:#E05C65; padding-left:10px;}
    `]
})

export class LoginComponent {

    constructor(private authService: AuthService, private router: Router) { }

    login(formValues) {
        this.authService.loginAdmin(formValues.userName, formValues.password);
        this.router.navigate(['/']);
    }

    cancel() {
        this.router.navigate(['/']);
    }

}