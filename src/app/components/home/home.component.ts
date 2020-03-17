import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        if (localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'));
        }
    }

}
