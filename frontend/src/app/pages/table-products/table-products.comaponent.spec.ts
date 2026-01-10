import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableProducts } from './table-products.component';

describe('TableProductsDemo', () => {
  let component: TableProducts;
  let fixture: ComponentFixture<TableProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableProducts] // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(TableProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
