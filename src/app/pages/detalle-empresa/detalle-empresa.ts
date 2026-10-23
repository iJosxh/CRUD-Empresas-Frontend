import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';
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

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private empresaService = inject(EmpresaService);
  private cdr = inject(ChangeDetectorRef);

  empresa: Empresa | null = null;
  cargando = true;
  mensajeError = '';

  ngOnInit(): void {
    this.cargarDetalle();
  }

  cargarDetalle(): void {
    this.cargando = true;
    this.mensajeError = '';
    this.refrescarVista();

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id <= 0) {
      this.mensajeError = 'El identificador de la empresa no es válido.';
      this.cargando = false;
      this.refrescarVista();
      return;
    }

    this.empresaService.obtenerEmpresa(id).subscribe({
      next: (datos) => {
        this.empresa = datos;
        this.cargando = false;

        console.log('Detalle recibido:', datos);

        this.refrescarVista();
      },
      error: (error) => {
        console.error('Error al obtener la empresa:', error);

        this.mensajeError =
          error.status === 404
            ? 'No se encontró la empresa solicitada.'
            : 'No fue posible cargar los detalles de la empresa.';

        this.cargando = false;
        this.refrescarVista();
      }
    });
  }

  regresar(): void {
    this.router.navigate(['/listado-empresas']);
  }

  private refrescarVista(): void {
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }
}
