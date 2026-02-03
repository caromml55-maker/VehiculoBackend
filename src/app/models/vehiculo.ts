export interface Vehiculo {
    placa: string;
    propietario: string;
    marca: string;
    fabricacion: number;
    valor_comercial: number;
    impuesto?: number;
    codigo_revision?: string;
}
