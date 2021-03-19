export class Encuesta{
    private opciones: number[] = [0, 1, 2, 3, 4];
    private valores: number[] = [1, 2, 3, 4, 5 ];
    constructor() {

    }
    getDataEncuesta (){
        return [
            { data: this.valores, label: 'Entrevistados' },
        ]
    }
    incrementarValor(opcion:number, valor:number) {
        // en la i se pasa el indice
        for(let i in this.opciones){
            if (this.opciones[i] == opcion ) {
                this.valores[i] += valor;
            }
        }
        return this.getDataEncuesta();
    }
}