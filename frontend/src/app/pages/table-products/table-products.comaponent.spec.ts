import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableProductsDemo } from './table-products.component';

describe('TableProductsDemo', () => {
  let component: TableProductsDemo;
  let fixture: ComponentFixture<TableProductsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableProductsDemo] // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(TableProductsDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
