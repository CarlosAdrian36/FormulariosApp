import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from '../../../shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {



  miFormulario : FormGroup = this.fb.group({
    nombre: [ '', [ Validators.required, Validators.pattern(this.vs.nombreApellidoPattern) ]],
    email: [ '', [ Validators.required, Validators.pattern(this.vs.emailPattern) ]],
    username: [ '', [ Validators.required, this.vs.noPuedeSerStrider ] ],
    password: [ '', [ Validators.required, Validators.minLength(6) ] ],
    confirmacion: [ '', [ Validators.required, ] ],

  },{
    validators : [this.vs.camposiguales('password', 'confirmacion')]
  })

  constructor( private fb: FormBuilder,
                private vs : ValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Carlos Arroyo',
      email: 'test@test.com',
      username: 'CRLLArroyo'

    })
  }

  campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
