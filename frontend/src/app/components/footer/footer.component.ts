import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year!: number;
  github = 'https://github.com/Vitaliistf';
  linkedin = 'https://www.linkedin.com/in/vitalii-stefaniv-60b878251';
  telegram = 'https://t.me/vitaliistf';
  instagram = 'https://www.instagram.com/vitaliistf/';
  email = 'mailto:deosplayt@gmail.com';
  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

}
