const addValues = (args) => {
    return args.filter(checkNum).reduce(sum, 0);
}

const checkNum = (value) => !isNaN(value);

const sum = (accumulator, curVal) => {
        return Number(curVal) + accumulator;
};

console.log(addValues(process.argv));
