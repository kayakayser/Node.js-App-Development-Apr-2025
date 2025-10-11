
const isIntNumber = s => !s.includes(".") && !isNaN(Number(s))

const main = async () => {
    console.log(isIntNumber("123.2"))
    console.log(isIntNumber("123"))
    console.log(isIntNumber("123a"))
    console.log(isIntNumber("ali"))
}

main()