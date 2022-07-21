import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from '../../../shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {



  miFormulario : FormGroup = this.fb.group({
    nombre: [ '', [ Validators.required, Validators.pattern(this.vs.nombreApellidoPattern) ]],
    email: [ '', [ Validators.required, Validators.pattern(this.vs.emailPattern) ],[this.emailvalidator ]],
    username: [ '', [ Validators.required, this.vs.noPuedeSerStrider ] ],
    password: [ '', [ Validators.required, Validators.minLength(6) ] ],
    confirmacion: [ '', [ Validators.required, ] ],

  },{
    validators : [this.vs.camposiguales('password', 'confirmacion')]
  })

  
  get emailErrorMsg(): string{
    
    const errors = this.miFormulario.get('email')?.errors;
    if( errors?.['required'] ) {
      return 'El email es obligatorio';
    }else if( errors?.['pattern'] ) {
      return 'El correo no es valido'
    }else if( errors?.['emailTomado'] ){
      return 'El correo ya esta registrado'
    }
    return '';
  }

  constructor( private fb: FormBuilder,
                private vs : ValidatorService,
                private emailvalidator : EmailValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Carlos Arroyo',
      email: 'test@test.com',
      username: 'CRLLArroyo',
      password: '123456',
      confirmacion: '123456'

    })
  }
  
  campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid 
    && this.miFormulario.get(campo)?.touched;
  }




  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
