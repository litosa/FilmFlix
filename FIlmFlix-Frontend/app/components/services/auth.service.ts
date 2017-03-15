import { Admin } from '../models/admin';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthService{

    admin: Admin

    loginAdmin(userName: string, password: string){
        this.admin = {
            id: 1,
            userName: userName,
            firstName: 'Alex',
            lastName: 'Litos'
        }
    }

    isAuthenticated(){
        return !!this.admin;
    }

    updateAdmin(firstName:string, lastName:string){
        this.admin.firstName =  firstName;
        this.admin.lastName = lastName;      
    }
}