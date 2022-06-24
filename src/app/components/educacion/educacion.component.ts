import { Educacion } from './../../model/educacion.model';
import { Component, OnInit } from '@angular/core';
import { EducacionService } from 'src/app/service/educacion.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educaciones:Educacion[] = [];
public editEducacion:Educacion | undefined;
public deleteEducacion:Educacion | undefined;

  constructor(private educacionService: EducacionService) { }

  ngOnInit(): void {
   this.getEducaciones();
  }

 public getEducaciones():void{ 
   this.educacionService.getEducacion().subscribe({
   next:(Response:Educacion[])=> {
     this.educaciones = Response;
   },
   error:(error: HttpErrorResponse)=> {
     alert(error.message);
   }
  })
  }

      public onOpenModal(mode:String, educacion?:Educacion):void{
        const container=document.getElementById('main-container');
        const button=document.createElement('button');
        button.style.display='none';
        button.setAttribute('data-bs-toggle', 'modal');
        if(mode==='add'){
          button.setAttribute('data-bs-target', '#addEducacionModal');
        }else if(mode==='delete'){
           this.deleteEducacion=educacion;  
           button.setAttribute('data-bs-target', '#deleteEducacionModal');
        }else if(mode==='edit'){
          this.editEducacion=educacion;  
          button.setAttribute('data-bs-target', '#editEducacionModal');
       }

       container?.appendChild(button);
       button.click();
      }
     
      public onAddEducacion(addForm:NgForm):void{
document.getElementById('add-educacion-form')?.click();
this.educacionService.addEducacion(addForm.value)
.subscribe({
  next:(response:Educacion) =>{
    console.log(response);
    this.getEducaciones();
    addForm.reset();
  },
  error:(error:HttpErrorResponse)=> {
    alert(error.message);
    addForm.reset();
  }
})
}

public onUpdateEducacion(educacion:Educacion){
  this.editEducacion=educacion;
  document.getElementById('update-educacion-form')?.click();
  this.educacionService.updateEducacion(educacion)
  .subscribe({
    next:(response:Educacion) =>{
      console.log(response);
      this.getEducaciones(); 
    },
    error:(error:HttpErrorResponse)=> {
      alert(error.message);
    }
  })
  }



  public onDeleteEducacion(idEdu:number):void{
    this.educacionService.deleteEducacion(idEdu)
    .subscribe({
      next:(response:void) =>{
        console.log(response);
        this.getEducaciones(); 
      },
      error:(error:HttpErrorResponse)=> {
        alert(error.message);
      }
    })
    }
  


}


