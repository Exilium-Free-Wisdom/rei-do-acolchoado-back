import readline from "readline";

export const question = (msg) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise((resolve) => rl.question(msg, resolve));
}

export const convertNumber = (num) => num.replace(/[^0-9]/g, "")