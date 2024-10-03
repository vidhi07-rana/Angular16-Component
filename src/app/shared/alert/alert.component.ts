import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  constructor(private router : Router, private route : ActivatedRoute){}

  onClose() {
    // this.router.navigate(['../'],{relativeTo:this.route} )

    this.close.emit();

  }
}
