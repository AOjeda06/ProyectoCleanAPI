// src/_core/container.ts
import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';

// Repositorios y usecases en src/_data y src/_domain
import PersonaRepository100 from '../_data/repositories/PersonaRepository100';
import GetPersonasSinDptoUC from '../_domain/usecases/GetPersonasSinDptoUC';

// ViewModel está en app/ui/viewmodels (subir dos niveles y entrar en app)
import PersonaListaVM from '../../app/ui/viewmodels/PersonaListaVM';

const container = new Container();

// Repositorios
container.bind(TYPES.IPersonaRepository).to(PersonaRepository100).inSingletonScope();

// Casos de uso
container.bind(TYPES.GetPersonasSinDptoUC).to(GetPersonasSinDptoUC).inSingletonScope();

// ViewModels
container.bind(TYPES.PeopleListVM).to(PersonaListaVM).inSingletonScope();

export default container;
