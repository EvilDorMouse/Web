import { writable } from "svelte/store"
import {    transpose,
            multiplMatrixVector, 
            positiveDefiniteSum, 
            lineAmount 
        } from "./myMath"

interface IMultiset // мультимн-во для описания входных/выходных позиций
{
    place: string // позиция
    trans: string // переход 
    multiplicity: number // кратность позиции
}

interface INetworkModel // описание сети Петри
{
    places: string[] // мн-во позиций сети
    transitions: string[] // мн-во переходов сети
    inputs: IMultiset[] // мн-во входных позиций
    outputs: IMultiset[] // мн-во выходных позиций
}

class PetriNet implements INetworkModel
{
    places: string[] = [];
    transitions: string[] = [];
    inputs: IMultiset[] = [];
    outputs: IMultiset[] = [];

    // конструктор по умолчанию
    constructor()
    {
        this.places = ['p1', 'p2'];
        this.transitions = ['t1'];
        this.inputs = [{place: 'p1', trans: 't1', multiplicity: 1},];
        this.outputs = [{place: 'p2', trans: 't1', multiplicity: 2},];
    }

    setPlaces(places: number)
    {
        this.places = [];
        let val: string = 'p';
        for (let i = 1; i < places + 1; i++) { this.places.push(val + i); }
    }

    setTransitions(transitions: number)
    {
        this.transitions = [];
        let val: string = 't';
        for (let i = 1; i < transitions + 1; i++) { this.transitions.push(val + i); }
    }

    setInOutPuts(inputs: number[][], outputs: number[][])
    {
        this.inputs = [];
        this.outputs = [];

        let mul: IMultiset;
        for(let i = 0; i < this.transitions.length; i++)
        {
            for(let j = 0; j < this.places.length; j++)
            {
                if(inputs[i][j] !== 0)
                {
                    mul = 
                    {
                        place: this.places[j],
                        trans: this.transitions[i],
                        multiplicity: inputs[i][j],
                    }
                    this.inputs = [... this.inputs, mul];
                }

                if(outputs[i][j] !== 0)
                {
                    mul = 
                    {
                        place: this.places[j],
                        trans: this.transitions[i],
                        multiplicity: outputs[i][j],
                    }
                    this.outputs = [... this.outputs, mul];
                }
            }
        }
    }

    Create(places: number, transitions: number, inputs: number[][], outputs: number[][])
    {
        this.setPlaces(places);
        this.setTransitions(transitions);
        this.setInOutPuts(inputs, outputs);
    }

    // сбросить все свойства объекта
    Clear(): void
    {
        this.places = [];
        this.transitions = [];
        this.inputs = [];
        this.outputs = [];
    }

    // создание матрицы инцидентности
    CreateIncident(): number[][]
    {
        let matr: number[][] = [];

        for(let i = 0; i < this.transitions.length; i++) 
        {
            matr[i] = [];
            for(let j = 0; j < this.places.length; j++) { matr[i][j] = 0; }
        }

        this.outputs.forEach((val) => matr[parseInt(val.trans.slice(1)) - 1][parseInt(val.place.slice(1)) - 1] = val.multiplicity);
        this.inputs.forEach((val) => matr[parseInt(val.trans.slice(1)) - 1][parseInt(val.place.slice(1)) - 1] = -val.multiplicity);
        
        return matr;
    }

    // вычисление состояния сисетмы на шаге k
    SystemState(M0: number[], inc: number[][], k: number): number []
    {
        if(inc[0].length != M0.length)
        {
            console.log('Раземерность M0.length не совпадает с размерностью inc[0].length');
            return [0];
        }

        let u: number [] = [];
        for(let i = 0; i < inc.length; i++) { u.push(0); }
        let multipl: number[] = [];

        for(let n = 0; n < k; n++)
        {
            for(let i = 0; i < inc.length; i++)
            {
                u[i] = 0;
                if(positiveDefiniteSum(inc[i], M0))
                {
                    u[i] = 1;
                    break;
                }
            }

            if(lineAmount(u) === 1)
            {
                multipl = multiplMatrixVector(transpose(inc), u);
                for(let i = 0; i < M0.length; i++) { M0[i] += multipl[i]; }
            }
            else
            {
                return [n + 1];
            }
        }
        
        return M0;
    }
}

export const MyNet = writable(new PetriNet());