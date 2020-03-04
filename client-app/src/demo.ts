let data: any;
// let data : string | number;
data = '24';

export interface ICar {
    color: string;
    model: string;
    // top speed is optional
    topSpeed?: number;
}

const Bmw: ICar = {
    color: 'blue',
    model: '320d',
    topSpeed: 224
}
const Mercedes: ICar = {
    color: 'red',
    model: 'c180',
    topSpeed: 244
}
const Alfarome: ICar = {
    color: 'white',
    model: 'guiletta',
    topSpeed: 184
}
const Renault: ICar = {
    color: 'grey',
    model: 'clio',
    topSpeed: 204
}

const multiply = (x: any, y: any): string => {
    return (x * y).toString();
}

export const cars = [Bmw, Mercedes, Renault, Alfarome];
