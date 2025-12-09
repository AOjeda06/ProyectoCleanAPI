import IGetPersonasSinDptoUC from '../interfaces/IGetPersonaSinDpto';
import IPersonaRepository from '../repositories/IPersonaRepository';
import Persona from '../entities/Persona';
import 'reflect-metadata';
import { injectable } from 'inversify';

/**
 * Caso de uso: obtener personas sin departamento asignado.
 * Recibe por inyección una implementación de IPersonaRepository.
 */
@injectable()
export default class GetPersonasSinDptoUC implements IGetPersonasSinDptoUC {
  private personaRepo: IPersonaRepository;

  constructor(personaRepo: IPersonaRepository) {
    this.personaRepo = personaRepo;
  }

  /**
   * Ejecuta el caso de uso y devuelve las personas cuyo idDepartamento es null o undefined.
   */
  async Execute(): Promise<Persona[]> {
    const all = await this.personaRepo.GetListaPersonasRep();
    // Devolvemos una copia filtrada para evitar mutación externa
    return all
      .filter(p => p.idDepartamento === undefined || p.idDepartamento === null)
      .map(p => p); // copia superficial de los elementos
  }
}
