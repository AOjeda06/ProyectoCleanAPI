import Persona from '../entities/Persona';

export default interface IPersonaRepository {
  GetListaPersonasRep(): Promise<Persona[]>;
}
