import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('document:click', ['$event.target'])
  toggleOpen(target: HTMLElement) {
    if (target.closest('.btn-group')) {
      this.isOpen = !this.isOpen;
    } else {
      this.isOpen = false;
    }
  }
}
