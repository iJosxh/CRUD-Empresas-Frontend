import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Empresa } from '../../models/empresa';
import { EmpresaService } from '../../services/empresa';

@Component({
  selector: 'app-listado-empresas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './listado-empresas.html',
  styleUrl: './listado-empresas.css'
})
export class ListadoEmpresas implements OnInit {

  private empresaService = inject(EmpresaService);
  private cdr = inject(ChangeDetectorRef);

  mostrarFormulario = false;
  mensajeExito = '';
  idEmpresaEditar: number | null = null;
  empresas: Empresa[] = [];

  formularioEmpresa = new FormGroup({
    nombreComercial: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    razonSocial: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    telefono: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^\d{8}$/)
      ]
    }),
    correoElectronico: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
    nit: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^\d{9}$/)
      ]
    }),
    estado: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    direccion: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  ngOnInit(): void {
    this.cargarEmpresas();
  }

  cargarEmpresas(): void {
    this.empresaService.listarEmpresas().subscribe({
      next: (datos) => {
        this.empresas = datos;

        console.log('Empresas recibidas:', datos);
        console.log('Cantidad de empresas:', datos.length);

        this.refrescarVista();
      },
      error: (error) => {
        console.error('Error al cargar las empresas:', error);
        this.refrescarVista();
      }
    });
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
    this.refrescarVista();
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.refrescarVista();
  }

  guardarEmpresa(): void {
    if (this.formularioEmpresa.invalid) {
      this.formularioEmpresa.markAllAsTouched();
      this.refrescarVista();
      return;
    }

    const datos = this.formularioEmpresa.getRawValue();

    if (this.idEmpresaEditar !== null) {
      this.empresaService
        .actualizarEmpresa(this.idEmpresaEditar, datos)
        .subscribe({
          next: (empresaActualizada) => {
            console.log('Empresa actualizada:', empresaActualizada);

            this.finalizarOperacion('¡Empresa actualizada correctamente!');
          },
          error: (error) => {
            console.error('Error al actualizar la empresa:', error);
          }
        });

      return;
    }

    this.empresaService.guardarEmpresa(datos).subscribe({
      next: (empresaGuardada) => {
        console.log('Empresa guardada:', empresaGuardada);

        this.finalizarOperacion('¡Empresa creada correctamente!');
      },
      error: (error) => {
        console.error('Error al guardar la empresa:', error);
      }
    });
  }

  editarEmpresa(empresa: Empresa): void {
    this.idEmpresaEditar = empresa.idEmpresa;

    this.formularioEmpresa.patchValue({
      nombreComercial: empresa.nombreComercial,
      razonSocial: empresa.razonSocial,
      telefono: empresa.telefono,
      correoElectronico: empresa.correoElectronico,
      nit: empresa.nit,
      estado: empresa.estado,
      direccion: empresa.direccion
    });

    this.mostrarFormulario = true;
    this.mensajeExito = '';

    this.refrescarVista();
  }

  private refrescarVista(): void {
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  private finalizarOperacion(mensaje: string): void {
    this.formularioEmpresa.reset();

    this.idEmpresaEditar = null;
    this.mostrarFormulario = false;
    this.mensajeExito = mensaje;

    this.cargarEmpresas();
    this.refrescarVista();

    setTimeout(() => {
      this.mensajeExito = '';
      this.refrescarVista();
    }, 4000);
  }
}
