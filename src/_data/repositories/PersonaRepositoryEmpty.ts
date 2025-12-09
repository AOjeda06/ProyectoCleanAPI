import IPersonaRepository from '../../_domain/repositories/IPersonaRepository';
import Persona from '../../_domain/entities/Persona';
import 'reflect-metadata';
import { injectable } from 'inversify';

@injectable()
export default class PersonaRepositoryEmpty implements IPersonaRepository {
  // Lista interna vacía
  private ListaPersonas: Persona[] = [];

  constructor(initial?: Persona[]) {
    // Permite opcionalmente inyectar una lista inicial (por defecto queda vacía)
    if (initial && initial.length > 0) {
      this.ListaPersonas = initial;
    }
  }

  /** Devuelve la lista (vacía por defecto) */
  async GetListaPersonasRep(): Promise<Persona[]> {
    return this.ListaPersonas;
  }
}
