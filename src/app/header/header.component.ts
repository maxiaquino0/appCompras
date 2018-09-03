import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AutenticacionService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  isAuth(){
    return this.authService.isAuthenticated();
  }

  onLogOut(){
    this.authService.logOut();
    this.router.navigate(['/inicio']);
  }

}
