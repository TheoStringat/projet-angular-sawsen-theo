import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import {FormsModule} from "@angular/forms";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { RouterModule, Routes } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LogginComponent } from './loggin/loggin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


const routes: Routes = [
  // home page, ce qui sera affiché avec http://localhost:4200
  // ou http://localhost:4200/
  { path: '', component:AssignmentsComponent }, // path vide = page d'accueil
  // http://localhost:4200/home
  { path: 'home', component: AssignmentsComponent },
  { path: 'add', component: AddAssignmentComponent },
  { path: 'assignment/:id', component: AssignmentDetailComponent },
  { path:'assignment/:id/edit', component: EditAssignmentComponent, canActivate: [authGuard] },
  { path: 'login', component: LogginComponent },
  { path: 'logout', component: AssignmentsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LogginComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    RouterModule.forRoot(routes),
    MatSlideToggleModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
