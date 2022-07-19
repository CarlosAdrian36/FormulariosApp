import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // miFormulario: FormGroup = new FormGroup ({
    
  //   nombre:      new FormControl ('RTX 4080ti+'),
  //   precio:      new FormControl (15000),
  //   existencias: new FormControl (5),

  // })
  miFormulario : FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)] ],
    precio:  [  , [Validators.min(0),Validators.required] ],
    existencias: [ , [Validators.min(0),Validators.required] ],

  })


  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.miFormulario.setValue({
      nombre: 'RTX 4080',
      precio: 12,
      existencias: 1,
    })
  }

  campoEsValido( campo: string ){
    return this.miFormulario.controls?.[campo]?.errors &&
    this.miFormulario.controls?.[campo]?.touched
  }

  guardar(){

    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
  }
  

}
