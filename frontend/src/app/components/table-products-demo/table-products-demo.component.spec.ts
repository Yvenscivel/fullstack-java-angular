import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProductsDemoComponent } from './table-products-demo.component';

describe('TableProductsDemoComponent', () => {
  let component: TableProductsDemoComponent;
  let fixture: ComponentFixture<TableProductsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableProductsDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableProductsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
