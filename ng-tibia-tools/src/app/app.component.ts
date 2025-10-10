import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, RouterLink, RouterLinkActive]
})
export class AppComponent {
  title = 'tibia-tools';

  @ViewChild('input') textarea: ElementRef;
}