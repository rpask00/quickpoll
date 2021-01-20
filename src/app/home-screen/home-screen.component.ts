import { Component, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Option, Pool } from '../../interfaces';
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
      new FormControl('', []),
      new FormControl('', []),
      new FormControl('', []),
      new FormControl('', []),
    ])
  }

  ngOnInit(): void {
    console.log(this.formg.valid);

  }


  addoption() {
    this.option_count++;
    this.options.controls.push(new FormControl('', []))
  }


  removeoption(id: number) {
    this.options.removeAt(id)
  }

  submit() {
    let pool: Pool = {
      title: this.formg.controls.title.value,
      options: []
    }

    this.options.controls.forEach((op, i) => {
      pool.options.push({
        name: op.value,
        votes: 0
      })
    })

  }

}
