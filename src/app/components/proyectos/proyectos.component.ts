import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyecto } from 'src/app/model/proyecto.model';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
 proyectos:Proyecto[] = [];
  public editProyecto:Proyecto | undefined;
  public deleteProyecto:Proyecto | undefined;
  
  constructor(private proyectoService: ProyectoService) { }

  ngOnInit(): void {
    this.getProyectos();
  }


  public getProyectos():void{ 
    this.proyectoService.getProyecto().subscribe({
    next:(Response:Proyecto[])=> {
      this.proyectos = Response;
    },
    error:(error: HttpErrorResponse)=> {
      alert(error.message);
    }
   })
   }
 


   public onOpenModal(mode:String, proyecto?:Proyecto):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-bs-target', '#addProyectoModal');
    }else if(mode==='delete'){
       this.deleteProyecto=proyecto;  
       button.setAttribute('data-bs-target', '#deleteProyectoModal');
    }else if(mode==='edit'){
      this.editProyecto=proyecto;  
      button.setAttribute('data-bs-target', '#editProyectoModal');
   }

   container?.appendChild(button);
   button.click();
  }
 
  public onAddProyecto(addForm:NgForm):void{
document.getElementById('add-proyecto-form')?.click();
this.proyectoService.addProyecto(addForm.value)
.subscribe({
next:(response:Proyecto) =>{
console.log(response);
this.getProyectos();
addForm.reset();
},
error:(error:HttpErrorResponse)=> {
alert(error.message);
addForm.reset();
}
})
}

public onUpdateProyecto(proyecto:Proyecto){
this.editProyecto=proyecto;
document.getElementById('update-proyecto-form')?.click();
this.proyectoService.updateProyecto(proyecto)
.subscribe({
next:(response:Proyecto) =>{
  console.log(response);
  this.getProyectos(); 
},
error:(error:HttpErrorResponse)=> {
  alert(error.message);
}
})
}



public onDeleteProyecto(idP:number):void{
this.proyectoService.deleteProyecto(idP)
.subscribe({
  next:(response:void) =>{
    console.log(response);
    this.getProyectos(); 
  },
  error:(error:HttpErrorResponse)=> {
    alert(error.message);
  }
})
}










}
