import { Injectable } from '@angular/core';

import Menu from "../models/Menu.model";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _menus: Menu[] = [
    {
      name: "Início",
      path: "/",
      icon: "home"
    },
    {
      name: "Livros",
      path: "/books",
      icon: "book"
    },
    {
      name: "Autores",
      path: "/authors",
      icon: "person"
    },
    {
      name: "Anos",
      path: "/years",
      icon: "calendar_today"
    },
  ]

  constructor() { }

  getMenus(){
    return this._menus;
  }
}
