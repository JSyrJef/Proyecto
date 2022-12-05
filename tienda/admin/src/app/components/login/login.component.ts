import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

declare let jQuery: any;
declare let $: any;
declare let iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : any = {};
  public usuario : any = {};
  public token : any = '';

  constructor(
    private _adminService:AdminService,
    private _router: Router
  ) { 
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    
    if(this.token){
      this._router.navigate(['/']);
    }else{
      //MANTENER EN EL COMPONENTE
    }
  }

  login(loginForm: { valid: any; }){
    if(loginForm.valid){
      console.log(this.user)

      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._adminService.login_admin(data).subscribe(
        response=>{
          if(response.data === undefined ){
            iziToast.show({
              title: 'ERROR',
              titleColor: 'red',
              class: 'text-danger',
              position: 'topRight',
              message: response.message
            });
          }else{
            this.usuario = response.data;

            localStorage.setItem('token',response.token);
            localStorage.setItem('_id',response.data._id);

            this._router.navigate(['/']);
          }
          console.log(response);
        },
        error=>{
          console.log(error);
        }
      );

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos no son validos'
      });
    }
  }

}
