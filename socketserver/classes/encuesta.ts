export class EncuestaData {

    private año: string[] = ['opcion 1', 'opcion 2', 'opcion 3', 'opcion 4' ];
    private valores: any[] = [0, 0, 0, 0];

    constructor() { }

    getDataGrafica() {
        return [
            { data: this.valores , label: 'Encuesta 2022'}
        ];
    }

    incrementarValor( opcion: number, valor: number ) {

        this.valores[opcion] += valor; 
        return this.getDataGrafica();

    }


}