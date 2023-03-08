import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA,ENTER } from '@angular/cdk/keycodes';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'crtvs-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.settingsForm = new FormGroup({
      supplierName: new FormControl('', Validators.required),
    });
  }

  tags = ['Tag 1', 'Tag 2', 'Tag 3'];
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagControl = new FormControl();

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.tagControl.setValue(null);
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  ngOnInit(): void {
    //
  }
  onSubmit() {
    //
  }
}
