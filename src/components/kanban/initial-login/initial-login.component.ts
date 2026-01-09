import { Component, ViewChild, ViewEncapsulation, NgZone, OnInit, PLATFORM_ID, Inject, EventEmitter, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


export interface UserData {
  email: string;
}

declare const google: any;

@Component({
  selector: 'initial-login',
  templateUrl: './initial-login.component.html',
  styleUrls: ['./initial-login.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule]
})
export class InitialLoginComponent implements OnInit {
  public userEmail = '';
  private isBrowser = false;
  
  @Output() loginSuccess = new EventEmitter<UserData>();

  constructor(
    private ngZone: NgZone, 
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initGoogleLogin();
    this.loadUserFromSession();
  }

  private initGoogleLogin() {
    if (!this.isBrowser || typeof google === 'undefined') return;
    
    google.accounts.id.initialize({
      client_id: '947413339284-tvocei2vmocb3ek286osp0gll3jug4hc.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleResponse(response)
    });

    const button = document.getElementById('googleSignInButton');
    if (button) {
      google.accounts.id.renderButton(button, { theme: 'outline', size: 'large' });
    }
  }

  private handleGoogleResponse(response: any) {
    const token = response.credential;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const email = payload.email;

    sessionStorage.setItem('userEmail', email);
    this.userEmail = email;
    
    this.loginSuccess.emit({ email });
  }

  private loadUserFromSession() {
    const email = sessionStorage.getItem('userEmail');
    if (email) this.userEmail = email;
  }

}
