import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {
  private hashedPassword = "fcab0453879a2b2281bc5073e3f5fe54"

  constructor() { }

  // Prompts user for the admin password
  authenticate(): boolean {
    let pass = prompt("Please enter the admin password: ") as string
    if (Md5.hashStr(pass) !== this.hashedPassword) {
      alert("Password is incorrect. Try again.")
      return false
    }
    return true
  }
}
