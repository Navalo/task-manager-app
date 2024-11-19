import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTaskModelComponent } from './delete-task-model.component';

describe('DeleteTaskModelComponent', () => {
  let component: DeleteTaskModelComponent;
  let fixture: ComponentFixture<DeleteTaskModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTaskModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTaskModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
