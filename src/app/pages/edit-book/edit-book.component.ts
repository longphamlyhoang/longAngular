import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { Category } from 'src/app/models/category.model';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  form!: FormGroup;
  id!: number | null;
  categories: Category[] = []

  control(controlName: string): AbstractControl {
    return this.form.controls[controlName];
  }

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void { // Lifecycle Hooks
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]], // Tuple: [initialValue, [...Validators]]
      author: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      categoryId: [null]
    })

    this.fetchDataIntoForm();

    this.categories = this.categoryService.categories;
  }

  fetchDataIntoForm(): void {
    const paramIdStr = this.activatedRoute.snapshot.paramMap.get('id');
    const paramId: number | null = typeof paramIdStr === 'string' ? +paramIdStr : null;
    this.id = paramId;

    // Lấy book và đổ giá trị vào form
    const book = this.bookService.getOne(paramId);

    this.form.patchValue({
      title: book?.title,
      author: book?.author,
      description: book?.description,
      categoryId: book?.category?.id
    })
  }

  submit(): void {
    if (this.form.invalid)
      alert('Form is not valid')

    const { title, author, description, categoryId } = this.form.value;

    const category = this.categories.find(cat => cat.id == categoryId)

    const book: Book = {
      id: this.id || 0,
      title: title,
      author: author,
      description: description,
      category
    }

    this.bookService.update(book);

    // Điều hướng về trang gốc
    this.router.navigateByUrl('/');
  }
}
