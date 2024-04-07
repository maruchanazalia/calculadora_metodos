import { parse } from "mathjs";
import { messageAlert } from "./sharedService";

let eq;

const validateErrorFalsaPosicion = (iterations) => Math.abs(iterations.at(-1)['f(p)']) < 0.000001;

const f = (x) => eq.evaluate({ x: x });

const validateHasRaiz = (iterations, iteration) => {
    if (!iterations.length && Math.sign(iteration['f(a)']) === Math.sign(iteration['f(b)'])) {
        throw "SinRaiz";
    }
}

const calFalsaPosicion = (a, b, iterations) => {
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
        const fa = lastIteration['f(a)'];
        const fb = lastIteration['f(b)'];
        iteration['a'] = lastIteration['a'];
        iteration['b'] = lastIteration['b'];
        iteration['p'] = (a * fb - b * fa) / (fb - fa);
    }

    iteration['f(a)'] = f(iteration['a']);
    iteration['f(b)'] = f(iteration['b']);
    iteration['f(p)'] = f(iteration['p']);
    validateHasRaiz(iterations, iteration);
    return iteration;
}

export function calcIterationsFalsaPosicion(equation, a, b) {
    let error = false;
    let iterations = [];
    eq = parse(equation);
    while (!error) {
        try {
            iterations.push(calFalsaPosicion(a, b, iterations));
            error = validateErrorFalsaPosicion(iterations);
        } catch (exception) {
            if (exception === 'SinRaiz') {
                messageAlert('error', 'No hay raíz entre los dos puntos');
                error = true;
            } else {
                error = true;
            }
        }
    }
    return iterations;
}
