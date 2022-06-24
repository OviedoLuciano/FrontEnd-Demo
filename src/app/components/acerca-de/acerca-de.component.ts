import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
public usuario: Usuario | undefined;
public editUsuario: Usuario | undefined;
 

constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.getUser();
  }

public getUser(): void {
  this.personaService.getUser().subscribe({
    next: (response: Usuario)=> {
      this.usuario=response;
    },
    error:(error:HttpErrorResponse)=>{
     alert(error.message);
    }
  })
}


public onOpenModal(mode:String, usuario?:Usuario):void{
  const container=document.getElementById('main-container');
  const button=document.createElement('button');
  button.style.display='none';
  button.setAttribute('data-bs-toggle', 'modal');
 if(mode==='edit'){
    this.editUsuario=usuario;  
    button.setAttribute('data-bs-target', '#editUsuarioModal');
 }

 container?.appendChild(button);
 button.click();
}


public onUpdateUsuario(usuario:Usuario){
  this.editUsuario=usuario;
  document.getElementById('update-usuario-form')?.click();
  this.personaService.updateUsuario(usuario)
  .subscribe({
    next:(response:Usuario) =>{
      console.log(response);
      this.getUser(); 
    },
    error:(error:HttpErrorResponse)=> {
      alert(error.message);
    }
  })
  }



  


 
}

