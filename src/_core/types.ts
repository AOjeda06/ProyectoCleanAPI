// APP/core/types.ts
export const TYPES = {
  IPersonaRepository: Symbol.for('IPersonaRepository'),
  GetPersonasSinDptoUC: Symbol.for('GetPersonasSinDptoUC'),
  PeopleListVM: Symbol.for('PeopleListVM'),
} as const;
export default TYPES;