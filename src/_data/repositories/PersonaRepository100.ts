import IPersonaRepository from '../../_domain/repositories/IPersonaRepository';
import Persona from '../../_domain/entities/Persona';
import 'reflect-metadata';
import { injectable } from 'inversify';

@injectable()
export default class PersonaRepository100 implements IPersonaRepository {
  // Lista interna de personas
  private ListaPersonas: Persona[];

  constructor() {
    // Genera 100 instancias de Persona con datos de ejemplo
    this.ListaPersonas = Array.from({ length: 100 }, (_, i) => {
      const id = i + 1;
      return new Persona({
        id,
        nombre: `Nombre ${id}`,
        apellidos: `Apellidos ${id}`,
      });
    });
  }

  /** Devuelve la lista completa de personas (simulado como operación async) */
  async GetListaPersonasRep(): Promise<Persona[]> {
    return this.ListaPersonas;
  }
}
