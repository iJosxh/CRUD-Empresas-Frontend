import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Empresa } from '../../models/empresa';
import { EmpresaService } from '../../services/empresa';

@Component({
  selector: 'app-detalle-empresa',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-empresa.html',
  styleUrl: './detalle-empresa.css'
})
export class DetalleEmpresa implements OnInit {

  private ruta = inject(ActivatedRoute);
  private router = inject(Router);
  private empresaService = inject(EmpresaService);

  empresa: Empresa | null = null;
  cargando = true;
  mensajeError = '';

  ngOnInit(): void {
    const id = Number(this.ruta.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id <= 0) {
      this.mensajeError = 'El identificador de la empresa no es válido.';
      this.cargando = false;
      return;
    }

    this.empresaService.obtenerEmpresa(id).subscribe({
      next: (datos) => {
        this.empresa = datos;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al obtener la empresa:', error);
        this.mensajeError =
          error.status === 404
            ? 'No se encontró la empresa solicitada.'
            : 'No fue posible cargar los detalles de la empresa.';

        this.cargando = false;
      }
    });
  }

  regresar(): void {
    this.router.navigate(['/listado-empresas']);
  }
}