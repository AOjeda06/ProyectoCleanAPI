export default class Persona {
    //#region Atributos
    private _id: number;
    private _nombre: string;
    private _apellidos: string;
    private _fechaNacimiento?: Date;
    private _direccion?: string;
    private _telefono?: string;
    private _foto?: string;
    private _nombreDepartamento?: string;
    //#endregion

    //#region Constructores
    constructor(params: {
        id: number;
        nombre: string;
        apellidos: string;
        fechaNacimiento?: Date | string | null;
        direccion?: string | null;
        telefono?: string | null;
        foto?: string | null;
        nombreDepartamento?: string | null;
    }) {
        this._id = params.id;
        this._nombre = params.nombre;
        this._apellidos = params.apellidos;
        this._fechaNacimiento =
            params.fechaNacimiento == null
                ? undefined
                : params.fechaNacimiento instanceof Date
                    ? params.fechaNacimiento
                    : new Date(params.fechaNacimiento);
        this._direccion = params.direccion ?? undefined;
        this._telefono = params.telefono ?? undefined;
        this._foto = params.foto ?? undefined;
        this._nombreDepartamento = params.nombreDepartamento ?? undefined;
    }
    //#endregion

    //#region Getters y Setters
    get id(): number {
        return this._id;
    }
    set id(value: number) {
        this._id = value;
    }

    get nombre(): string {
        return this._nombre;
    }
    set nombre(value: string) {
        this._nombre = value;
    }

    get apellidos(): string {
        return this._apellidos;
    }
    set apellidos(value: string) {
        this._apellidos = value;
    }

    get fechaNacimiento(): Date | undefined {
        return this._fechaNacimiento;
    }
    set fechaNacimiento(value: Date | undefined) {
        this._fechaNacimiento = value;
    }

    get direccion(): string | undefined {
        return this._direccion;
    }
    set direccion(value: string | undefined) {
        this._direccion = value;
    }

    get telefono(): string | undefined {
        return this._telefono;
    }
    set telefono(value: string | undefined) {
        this._telefono = value;
    }

    get foto(): string | undefined {
        return this._foto;
    }
    set foto(value: string | undefined) {
        this._foto = value;
    }

    get nombreDepartamento(): string | undefined {
        return this._nombreDepartamento;
    }
    set nombreDepartamento(value: string | undefined) {
        this._nombreDepartamento = value;
    }
    //#endregion
}