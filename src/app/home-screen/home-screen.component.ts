import { Component, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {

  formg: FormGroup
  option_count: number = 4;
  options: FormArray


  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formg = this.formBuilder.group({
      title: ['', Validators.required],
    })

    this.options = new FormArray([
      new FormControl('', [Validators.required]),
      new FormControl('', [Validators.required]),
      new FormControl('', [Validators.required]),
      new FormControl('', [Validators.required]),
    ])
  }

  ngOnInit(): void {
  }


  addoption() {
    this.option_count++;
    this.options.controls.push(new FormControl('', [Validators.required]))
  }


  removeoption(id: number) {
    this.options.removeAt(id)
  }

}
