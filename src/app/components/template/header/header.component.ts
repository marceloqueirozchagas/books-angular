import { Component, OnInit } from '@angular/core';
import Menu from 'src/app/models/Menu.model';
import { MenuService } from 'src/app/services/menu.service';

import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menus: Menu[];
  actualPath: string = '/'

  constructor(private menuService: MenuService, private router: Router) { }

  ngOnInit(): void {
    this.menus = this.menuService.getMenus();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      this.actualPath = event.url;
    });
  }
}