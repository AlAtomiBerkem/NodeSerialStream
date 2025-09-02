import type { messageError } from "../../types";

 function logError({message}: messageError): void {
    console.log(`\x1b[31m${message}\x1b[0m`); //красный цвет
}

 function logSuccess({message}: messageError): void{
    console.log(`\x1b[32m${message}\x1b[0m`); //зеленый цвет
}

module.exports = { logError, logSuccess};
