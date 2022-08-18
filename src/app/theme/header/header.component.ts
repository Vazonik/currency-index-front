import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

interface NavItem {
  label: string;
  url: string;
}

@Component({
  selector: 'ci-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public navigation: NavItem[] = [
    { label: 'Explore', url: '/explore' },
    { label: 'Compare', url: '/compare' },
  ];

  public url = '';

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.url = '/' + val.urlAfterRedirects.split('/')[1];
      }
    });
  }
}
