import Persona from '../entities/Persona';

/**
 * Caso de uso: obtener personas que no tienen departamento asignado.
 * El método Execute devuelve una promesa con el array de Persona.
 */
export default interface IGetPersonasSinDptoUC {
  Execute(): Promise<Persona[]>;
}
