import IPersonaRepository from '../../_domain/repositories/IPersonaRepository';
import Persona from '../../_domain/entities/Persona';
import Connection from '../datasource/Connection';
import 'reflect-metadata';
import { injectable } from 'inversify';

@injectable()
export default class PersonaRepository100 implements IPersonaRepository {
  constructor() {}

  /** Obtiene el listado de personas desde la API */
  async GetListaPersonasRep(): Promise<Persona[]> {
    try {
      const url = `${Connection.getBaseURL()}personas`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.statusText}`);
      }

      const data = await response.json();

      // Mapear los datos de la API a instancias de Persona
      return data.map((item: any) => new Persona({
        id: item.id,
        nombre: item.nombre,
        apellidos: item.apellidos,
        foto: item.foto,
        fechaNacimiento: item.fechaNacimiento,
        direccion: item.direccion,
        telefono: item.telefono,
        nombreDepartamento: item.nombreDepartamento,
      }));
    } catch (error) {
      console.error('Error al obtener personas:', error);
      return [];
    }
  }
}
