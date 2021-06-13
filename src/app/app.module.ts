import { RouterModule, Routes } from '@angular/router';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule, GestureConfig, MatDialogModule, MatSnackBarModule } from '@angular/material';
import 'hammerjs';
import { MatSelectModule } from '@angular/material';
import { CountdownGlobalConfig, CountdownModule } from 'ngx-countdown';
import { AgmCoreModule } from '@agm/core';
import { MenutopComponent } from './components/menutop/menutop.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {ContentDashboardComponent} from './components/content-dashboard/content-dashboard.component';



const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'inicio', component: DashboardComponent }
];



@NgModule({
  declarations: [
    HomeComponent,
    ContentDashboardComponent,
    DashboardComponent,
    AppComponent,
    MenutopComponent,
    SidebarComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    CountdownModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyAaA64BeKwwQmhWRpsvttY-oCesLkbcoSo',
      libraries : ['places']
    }),
  ],
  exports: [],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-EC'},
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
    {provide: CountdownGlobalConfig},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
