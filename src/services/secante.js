import { parse } from "mathjs";
import { messageAlert } from "./sharedService";

let eq;

const validateErrorSecante = (iterations) => Math.abs(iterations.at(-1)['f(p)']) < 0.000001;

const f = (x) => eq.evaluate({ x: x });

const validateHasRaiz = (iterations, iteration) => {
    if (!iterations.length && Math.sign(iteration['f(a)']) === Math.sign(iteration['f(b)'])) {
        throw "SinRaiz";
    }
}

const calSecante = (a, b, iterations) => {
    let iteration = {
        'a': null,
        'b': null,
        'p': null,
        'f(p)': null,
        'f(a)': null,
        'f(b)': null,
    };
    if (!iterations.length) {
        iteration['a'] = a; iteration['b'] = b;
    } else {
        const lastIteration = iterations.at(-1);
        iteration['a'] = lastIteration['b'];
        iteration['b'] = lastIteration['p'];
        validateHasRaiz(iterations, lastIteration);
    }

    iteration['f(a)'] = f(iteration['a']);
    iteration['f(b)'] = f(iteration['b']);
    iteration['p'] = iteration['b'] - (iteration['f(b)'] * (iteration['b'] - iteration['a'])) / (iteration['f(b)'] - iteration['f(a)']);
    iteration['f(p)'] = f(iteration['p']);
    return iteration;
}

export function calcIterationsSecante(equation, a, b) {
    let error = false;
    let iterations = [];
    eq = parse(equation);
    while (!error) {
        try {
            iterations.push(calSecante(a, b, iterations));
            error = validateErrorSecante(iterations);
        } catch (exception) {
            if (exception === 'SinRaiz') {
                messageAlert('error', 'No hay raiz entre los dos puntos');
                error = true;
            } else {
                error = true;
                // No se puede manejar esta excepción, así que se vuelve a lanzar
            }
        }

    }
    return iterations;
}
