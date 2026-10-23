import { Component, OnInit, inject } from '@angular/core';
import { Empresa } from '../../models/empresa';
import { EmpresaService } from '../../services/empresa';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listado-empresas',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './listado-empresas.html',
  styleUrl: './listado-empresas.css',
})
export class ListadoEmpresas implements OnInit {

  mostrarFormulario = false;
  mensajeExito = '';
  private empresaService = inject(EmpresaService);

  empresas: Empresa[] = [];

  formularioEmpresa = new FormGroup({
    nombreComercial: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    razonSocial: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    telefono: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{8}$/)] }),
    correoElectronico: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    nit: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{9}$/)] }),
    estado: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    direccion: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  ngOnInit(): void {
    this.cargarEmpresas();
  }

  cargarEmpresas(): void {
    this.empresaService.listarEmpresas().subscribe({
      next: (datos) => {
        this.empresas = datos;
        console.log('Empresas recibidas:', datos);
        console.log('Cantidad de empresas:', this.empresas.length);
      },
      error: (error) => {
        console.error('Error al cargar las empresas:', error);
      }
    });
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
  }

  guardarEmpresa() : void {
    if (this.formularioEmpresa.invalid) {
      this.formularioEmpresa.markAllAsTouched();
      return;
    }
    const datos = this.formularioEmpresa.getRawValue();
    this.empresaService.guardarEmpresa(datos).subscribe({
      next: (empresaGuardada) => {
        console.log('Empresa guardada:', empresaGuardada);
        this.cargarEmpresas(); // Recargar la lista de empresas después de guardar
        this.cerrarFormulario(); // Cerrar el formulario después de guardar
        this.mensajeExito = '¡Empresa creada correctamente!';
      },
      error: (error) => {
        console.error('Error al guardar la empresa:', error);
      }
    });
  }
}