import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Directive({
  selector: '[appDebounceInput]',
})
export class DebounceInputDirective implements OnInit, OnDestroy {
  @Input() debounceTime = 300;
  @Output() debouncedInput = new EventEmitter<string>();

  private readonly el = inject(ElementRef<HTMLInputElement>);
  private subscription = new Subscription();

  ngOnInit(): void {
    this.subscription = fromEvent<InputEvent>(this.el.nativeElement, 'input')
      .pipe(
        debounceTime(this.debounceTime),
        map(() => this.el.nativeElement.value),
      )
      .subscribe((value) => this.debouncedInput.emit(value));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
