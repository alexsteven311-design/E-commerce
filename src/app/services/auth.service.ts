import { Injectable, signal } from '@angular/core';
import { User } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<User | null>(null);

  constructor() {
    const saved = localStorage.getItem('currentUser');
    if (saved) this.currentUser.set(JSON.parse(saved));
  }

  signup(user: User): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === user.email)) return false;
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    this.currentUser.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }

  login(email: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return false;
    this.currentUser.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
  }
}
