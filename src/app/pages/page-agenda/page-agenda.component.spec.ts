import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAgendaComponent } from './page-agenda.component';

describe('PageAgendaComponent', () => {
  let component: PageAgendaComponent;
  let fixture: ComponentFixture<PageAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageAgendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
