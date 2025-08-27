### Javascript Programlama Dili
### Çalışma Soruları Çözümleri
### Eğitmen: Oğuz KARAN
### C ve Sistem Programcıları Derneği

#### Homework-001

>1.sorunun bir çözümü
>
>**Not:** Çözüm, çalışma sorusunun verildiği tarihe kadar işlenmiş konular kullanılarak yazılmıştır

```javascript
const write = a => process.stdout.write(a)  
const writeLine = a => write(a === undefined ? '\r\n' : `${a}\r\n`)  
  
const printRelations = (a, b, c) => {  
    let max = Math.max(a, b, c)  
    let min = Math.min(a, b, c)  
    let mid = a + b + c - max - min  
  
    if (min < mid)  
        write(`${min} < ${mid} `)  
    else  
        write(`${min} = ${mid} `)  
  
    if (mid < max)  
        writeLine(`< ${max}`)  
    else  
        writeLine(`= ${max}`)  
}  
  
const main = () => {  
    printRelations(20, 10, 30)  
    writeLine("----------------------------")  
    printRelations(10, 10, 20)  
    writeLine("----------------------------")  
    printRelations(10, 10, 10)  
    writeLine("----------------------------")  
    printRelations(10, 20, 20)  
}  
  
main()
```

>2.sorunun bir çözümü
>
>**Not:** Çözüm, çalışma sorusunun verildiği tarihe kadar işlenmiş konular kullanılarak yazılmıştır

```javascript
const write = a => process.stdout.write(a)  
const writeLine = a => write(a === undefined ? '\r\n' : `${a}\r\n`)  
  
const mid = (a, b, c) => {  
    if (a <= b && b <= c || c <= b && b <= a)  
        return b;  
  
    if (b <= a && a <= c || c <= a && a <= b)  
        return a;  
  
    return c;  
}  
  
const main = () => {  
    writeLine(mid(20, 10, 30))  
    writeLine("----------------------------")  
    writeLine(mid(10, 10, 20))  
    writeLine("----------------------------")  
    writeLine(mid(10, 10, 10))  
    writeLine("----------------------------")  
    writeLine(mid(10, 20, 20))  
}  
  
main()
```

>3.sorunun bir çözümü
>
>**Not:** Çözüm, çalışma sorusunun verildiği tarihe kadar işlenmiş konular kullanılarak yazılmıştır

```javascript
const write = a => process.stdout.write(a)  
const writeLine = a => write(a === undefined ? '\r\n' : `${a}\r\n`)  
  
const signum = a => {  
    let result = -1;  
  
    if (a > 0)  
        result = 1;  
    else if (a === 0)  
        result = 0;  
  
    return result;  
}  
  
const main = () => {  
    writeLine(signum(10))  
    writeLine("----------------------------")  
    writeLine(signum(-10))  
    writeLine("----------------------------")  
    writeLine(signum(0))  
}  
  
main()
```


#### Homework-002

>1.sorunun bir çözümü
>
>**Not:** Çözüm, çalışma sorusunun verildiği tarihe kadar işlenmiş konular kullanılarak yazılmıştır

```javascript
const write = a => process.stdout.write(a)  
const writeLine = a => write(a === undefined ? '\r\n' : `${a}\r\n`)  
  
const printPrimeFactors = a => {  
    let x = 2;  
    a = Math.abs(a);  
  
    while (a !== 1)  
        if (a % x === 0) {  
            write(`${x} `)  
            a /= x;  
        }  
        else  
            ++x;  
  
    writeLine()  
}  
  
const main = () => {  
    printPrimeFactors(12)  
    writeLine("----------------------------")  
    printPrimeFactors(10)  
    writeLine("----------------------------")  
    printPrimeFactors(19)  
}  
  
main()
```


>2.sorunun bir çözümü
>
>**Not:** Çözüm, çalışma sorusunun verildiği tarihe kadar işlenmiş konular kullanılarak yazılmıştır

```javascript
const write = a => process.stdout.write(a)  
const writeLine = a => write(a === undefined ? '\r\n' : `${a}\r\n`)  
  
const writeSpaces = (begin, end) => {  
    for (let i = begin; i < end; ++i)  
        write(' ');  
}  
  
const writeBall = (ballIndex, end) => {  
    writeSpaces(0, ballIndex);  
    write('*');  
    writeSpaces(ballIndex + 1, end);  
}  
  
const updateBallIndex = (isRight, ballIndex) => isRight ? (ballIndex + 1) : (ballIndex - 1)  
  
const updateRightFlag = (isRight, ballIndex, width) => {  
    if (ballIndex === 0)  
        return true;  
  
    if (ballIndex === width - 1)  
        return false;  
  
    return isRight;  
}  
  
const playBallFall = (width, height) => {  
    let ballIndex = 0;  
    let isRight = false;  
  
    for (let i = 1; i <= height; ++i) {  
        write('|');  
        writeBall(ballIndex, width);  
        if (width !== 1) {  
            isRight = updateRightFlag(isRight, ballIndex, width);  
            ballIndex = updateBallIndex(isRight, ballIndex);  
        }  
        writeLine('|');  
    }  
}  
  
const main = () => {  
    playBallFall(5, 10)  
    writeLine("--------------------------------------------")  
    playBallFall(1, 10)  
}  
  
main()
```

>3.sorunun bir çözümü
>
>**Not:** Çözüm, çalışma sorusunun verildiği tarihe kadar işlenmiş konular kullanılarak yazılmıştır

```javascript
const write = a => process.stdout.write(a)  
const writeLine = a => write(a === undefined ? '\r\n' : `${a}\r\n`)  
  
  
const isPrime = a => {  
    if (a <= 1)  
        return false  
  
    if (a % 2 === 0)  
        return a === 2  
  
    if (a % 3 === 0)  
        return a === 3  
  
    if (a % 5 === 0)  
        return a === 5  
  
    if (a % 7 === 0)  
        return a === 7  
  
    for (let i = 11; i * i <= a; i += 2)  
        if (a % i === 0)  
            return false  
  
    return true}  
  
const printGoldBach = a => {  
    for (let x = a - 1; x >= 2; --x) {  
        let y = a - x  
  
        if (isPrime(x) && isPrime(y) && x >= y)  
            writeLine(`${x} + ${y}`)  
    }  
}  
  
const main = () => {  
    printGoldBach(16)  
}  
  
main()
```


>4.sorunun bir çözümü
>
>**Not:** Çözüm, çalışma sorusunun verildiği tarihe kadar işlenmiş konular kullanılarak yazılmıştır

```javascript
const write = a => process.stdout.write(a)  
const writeLine = a => write(a === undefined ? '\r\n' : `${a}\r\n`)  
  
const printAbove = n => {  
    for (let i = 1; i < n; ++i) {  
        for (let k = 0; k < n - i; ++k)  
            write(" ")  
  
        for (let k = 0; k < 2 * i - 1; ++k)  
            write('*');  
  
        writeLine();  
    }  
}  
  
  
const printBelow = n => {  
    for (let i = 0; i < n; ++i) {  
        for (let k = 0; k < i; ++k)  
            write(" ");  
  
        for (let k = 0; k < 2 * (n - i) - 1; ++k)  
            write('*');  
  
        writeLine();  
    }  
}  
  
const printDiamond = n => {  
    printAbove(n)  
    printBelow(n)  
}  
  
const main = () => {  
    printDiamond(6)  
    writeLine("\n\n\n")  
  
    printDiamond(5)  
    writeLine("\n\n\n")  
  
    printDiamond(10)  
}  
  
main()
```

#### Homework-003

>Sorunun bir çözümü
>
>**Not:** Çözüm, çalışma sorusunun verildiği tarihe kadar işlenmiş konular kullanılarak yazılmıştır


```javascript
const write = a => process.stdout.write(a)  
const writeLine = a => write(a === undefined ? '\r\n' : `${a}\r\n`)
const randomInt = (min, bound) => Math.floor(Math.random() * (bound - min) + min)
  
const sumOfDice = () => randomInt(1, 7) + randomInt(1, 7)  
  
const rollDiceForIndeterminate = v => {  
    let total  
  
    while ((total = sumOfDice()) !== 7 && total !== v)  
        ;  
  
    return total !== 7  
}  
  
const playCraps = () => {  
    let total = sumOfDice()  
  
    switch (total) {  
        case 7:  
        case 11:  
            return true  
        case 2:  
        case 3:  
        case 12:  
            return false  
        default:  
            return rollDiceForIndeterminate(total)  
    }  
}  
  
const calculateCrapsProbability = n => {  
    let count = 0  
  
    for (let i = 0; i < n; ++i)  
        if (playCraps())  
            ++count  
  
    return count / n  
}  
  
const main = () => {  
    writeLine(`p = ${calculateCrapsProbability(100_000)}`)  
}  
  
main()
```
