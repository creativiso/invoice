import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseFormItemsComponent } from './base-form-items.component';

describe('BaseFormItemsComponent', () => {
  let component: BaseFormItemsComponent;
  let fixture: ComponentFixture<BaseFormItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseFormItemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseFormItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
