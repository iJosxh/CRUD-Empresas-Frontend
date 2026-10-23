export interface Empresa {
  idEmpresa: number;
  nombreComercial: string;
  razonSocial: string;
  telefono: string;
  correoElectronico: string;
  nit: string;
  estado: string;
  direccion: string;
}

export type NuevaEmpresa = Omit<Empresa, 'idEmpresa'>;