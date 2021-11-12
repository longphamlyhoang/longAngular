import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: Category[] = []

  constructor(private httpClient: HttpClient) {
    this.loadCategory();
  }

  loadCategory(): void {
    this.httpClient.get<Category[]>('categories')
      .subscribe(res => {
        this.categories.push(...res)
        console.log(this.categories)
      });
  }
}
