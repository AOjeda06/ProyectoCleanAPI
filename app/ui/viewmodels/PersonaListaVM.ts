// APP/ui/viewmodels/peoplelistvm.ts
import { makeAutoObservable, runInAction } from 'mobx';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../src/_core/types';
import IPersonaRepository from '../../../src/_domain/repositories/IPersonaRepository';
import Persona from '../../../src/_domain/entities/Persona';

@injectable()
export default class PeopleListVM {
  private _personasList: Persona[] = [];
  private _personaSeleccionada: Persona;

  constructor(
    @inject(TYPES.IPersonaRepository)
    private personaRepository: IPersonaRepository
  ) {
    // valor inicial para ver en la vista
    this._personaSeleccionada = new Persona({ id: 0, nombre: 'Fernando', apellidos: 'Galiana' });

    // Hacemos observable la instancia antes de operaciones async
    makeAutoObservable(this);

    // Cargar personas sin bloquear el constructor
    void this.loadPersonas();
  }

  // Método async para cargar datos desde el repositorio
  async loadPersonas(): Promise<void> {
    try {
      const list = await this.personaRepository.GetListaPersonasRep();
      runInAction(() => {
        this._personasList = list;
      });
    } catch (err) {
      // Manejo de errores: podrías exponer un observable error si lo necesitas
      console.error('Error cargando personas:', err);
    }
  }

  // Getters / setters observables
  public get personasList(): Persona[] {
    return this._personasList;
  }

  public get personaSeleccionada(): Persona {
    return this._personaSeleccionada;
  }

  public set personaSeleccionada(value: Persona) {
    this._personaSeleccionada = value;
    // Para debugging; en producción usa un logger o modal controlado por estado
    alert(`Persona seleccionada en el VM: ${this._personaSeleccionada.nombre} ${this._personaSeleccionada.apellidos}`);
  }
}
