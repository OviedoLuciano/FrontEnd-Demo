import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
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
}
