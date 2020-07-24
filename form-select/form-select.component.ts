import { Component, forwardRef, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { addRemoveAnimation } from '~/app/animations/add-remove/add-remove.animation';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormSelectComponent),
    multi: true
  }],
  animations: [
    addRemoveAnimation
  ]
})
export class FormSelectComponent implements ControlValueAccessor, OnInit {
  @Output() optionOnChange = new EventEmitter(false);

  @Input() options = [];
  @Input() set currentValue(value: string | number) {
    this.onChange(value);

    this.currentIndex = this.options.findIndex((item: {value: string | number}) => {
      return item.value === value;
    });
  }
  @Input() defaultLabel: string;
  @Input() resetLabel: string;
  @Input() classNames: string[] = [];
  @Input() search = false;
  @Input() fullList = false;
  @Input() onlyBottomDirection = false;

  currentIndex = -1;
  searchQuery = '';
  openToTop: boolean;
  searchQueryTouchedAndNull = false;
  dropdownHeight: string;

  private onTouched = () => {};
  private onChange: (value: string | number) => void = () => {};

  constructor() { }

  ngOnInit() {
    this.dropdownHeight = this.fullList ? 'auto' : '200px';
  }

  writeValue(value: string | number): void {
    this.currentIndex = this.options.findIndex(item => {
      return item.value === value;
    });
  }

  registerOnChange(onChange: (index: number) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  optionSelect(index: number): void {
    const value = this.options[index].value;

    this.onChange(value);
    this.onTouched();

    this.currentIndex = index;
    this.optionOnChange.emit(value);
    this.searchQueryTouchedAndNull = false;
  }

  reset(): void {
    this.currentIndex = -1;
    this.onChange(null);

    this.optionOnChange.emit(null);
    this.searchQueryTouchedAndNull = false;
  }

  searchQueryOnChange(searchQuery: string): void {
    this.searchQueryTouchedAndNull = !searchQuery;
  }

  getOpeningDirection(event: any): void {
    if (this.onlyBottomDirection) {
      this.openToTop = false;

      return;
    }

    const DOMRect = event.target.getBoundingClientRect();

    if (event.target.closest('.drop-down--active')) {
      this.openToTop = window.innerHeight - DOMRect.bottom < 250;
    }
  }
}
