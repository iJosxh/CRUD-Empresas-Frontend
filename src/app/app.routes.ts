import { Routes } from '@angular/router';
import { ListadoEmpresas } from './pages/listado-empresas/listado-empresas';
import { DetalleEmpresa } from './pages/detalle-empresa/detalle-empresa';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listado-empresas',
    pathMatch: 'full'
  },
  {
    path: 'listado-empresas',
    component: ListadoEmpresas
  },
  {
    path: 'detalle-empresa/:id',
    component: DetalleEmpresa
  },
  {
    path: '**',
    redirectTo: 'listado-empresas'
  }
];