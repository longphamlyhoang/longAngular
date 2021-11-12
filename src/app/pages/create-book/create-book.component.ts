import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { Category } from 'src/app/models/category.model';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
  form!: FormGroup;
  categories: Category[] = [];

  control(controlName: string): AbstractControl {
    return this.form.controls[controlName];
  }

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void { // Lifecycle Hooks
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]], // Tuple: [initialValue, [...Validators]]
      author: ['', [Validators.required]],
      description : ['',[Validators.required,Validators.maxLength(500)]],
      categoryId: [null]
    })

    this.categories = this.categoryService.categories;
  }

  submit(): void {
    if (this.form.invalid){
      alert('Form is not valid')
    }
      else {
const { title, author, description, categoryId } = this.form.value;

    const category = this.categories.find(cat => cat.id == categoryId)

    const book: Book = {
      title: title,
      author: author,
      description: description,
      category
    }

    this.bookService.create(book);

    // Điều hướng về trang gốc
    this.router.navigateByUrl('/');
      }
  }
}
