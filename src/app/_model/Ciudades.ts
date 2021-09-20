import { Departamento } from "./Departamento";

export class Ciudades{
    idCiudad!: number;
    nombre!: string;
    departamento: Departamento = new Departamento;
}