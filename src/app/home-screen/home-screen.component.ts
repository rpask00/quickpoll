import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pool } from '../../interfaces';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {

  formg: FormGroup
  options: FormArray

  constructor(
    private formBuilder: FormBuilder,
    private databaseSv: DatabaseService,
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

  ngOnInit(): void { }


  addoption() {
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
      if (op.value) {
        pool.options.push({
          name: op.value,
          votes: 0
        })
      }
    })

    this.databaseSv.submitPool(pool)
  }

}
