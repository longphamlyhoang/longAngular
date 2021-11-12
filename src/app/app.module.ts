import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { CreateBookComponent } from './pages/create-book/create-book.component';
import { DeleteBookComponent } from './pages/delete-book/delete-book.component';
import { EditBookComponent } from './pages/edit-book/edit-book.component';
import { ListBookComponent } from './pages/list-book/list-book.component';
import { DetailBookComponent } from './pages/detail-book/detail-book.component';

const routes: Routes = [
  {
    path: '',
    component: ListBookComponent
  },
  {
    path: 'create',
    component: CreateBookComponent
  },
  {
    path: 'edit/:id',
    component: EditBookComponent
  },
  {
    path: 'detail/:id',
    component: DetailBookComponent
  },
  {
    path: 'delete/:id',
    component: DeleteBookComponent
  }
]


@NgModule({
  declarations: [
    AppComponent,
    CreateBookComponent,
    EditBookComponent,
    ListBookComponent,
    DeleteBookComponent,
    DetailBookComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
