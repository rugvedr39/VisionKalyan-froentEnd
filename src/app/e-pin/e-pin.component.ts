import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-e-pin',
  templateUrl: './e-pin.component.html',
  styleUrls: ['./e-pin.component.css']
})
export class EPinComponent {
  epinForm: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient) {
    this.epinForm = this.fb.group({
      userId: ['', Validators.required],
      count: [0, [Validators.required, Validators.min(1)]],
    });
  }

  submitForm() {
    if (this.epinForm.valid) {
      this.http.post('https://free.rrinstitute.cloud/generate-epins', this.epinForm.value).subscribe(
        (response: any) => {
          if (response.success) {
            alert(response.epins)
          } else {
            alert(response.data);
          }
        },
        (error) => {
          console.error(error);
          alert(error.error.message);
        }
      );
    }
    else {
      // Handle form validation errors
      alert('Form validation failed');
    }
  }
}
