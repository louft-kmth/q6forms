import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'search-movie',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css']
})
export class SearchMovieComponent {
  searchForm: FormGroup;
  currentYear: number = new Date().getFullYear();

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      identifiant: [''],
      titre: [''],
      type: ['', Validators.required],
      anneeSortie: ['', [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]],
      fiche: ['', Validators.required]
    }, { validators: this.identifiantOrTitreValidator });
  }

  identifiantOrTitreValidator(form: FormGroup) {
    const identifiant = form.get('identifiant').value;
    const titre = form.get('titre').value;
    return identifiant || titre ? null : { identifiantOrTitre: true };
  }

  onSubmit() {
    console.log('Form submitted: ', this.searchForm.value);
  }

  ngOnInit() {
    this.searchForm.valueChanges.subscribe(value => {
      console.log('Form value changes: ', value);
    });
  }
}

