import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
  ) {
    this.formg = this.formBuilder.group({
      title: ['', Validators.required],
      multiple: [false, Validators.required],
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
      labels: [],
      votes: [],
      multipleSelection: this.formg.controls.multiple.value
    }

    this.options.controls.forEach((op, i) => {
      if (op.value) {
        pool.labels.push(op.value)
        pool.votes.push(0)
      }
    })

    let id = this.databaseSv.submitPool(pool)
    setTimeout(() => this.router.navigateByUrl('/v/' + id), 1000)

  }

}
