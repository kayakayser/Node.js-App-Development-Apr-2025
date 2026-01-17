import net from 'node:net';

process.on('uncaughtException', e => console.error(`Error Log:${e}`))

const upperServerDataHandler = (socket,  data) => {
    console.log(`Raw Data:${data}`)

    let dataStr = data.toString()
    console.log(`Data String :${dataStr}`)
    dataStr = dataStr.toUpperCase()
    socket.write(dataStr)
    socket.end()
}

const upperServerConnectedCallback  = s => {
    console.log("Upper server client connected")

    s.setTimeout(2000, () => console.log("Timeout occurred in upper server"))
    s.on("data", d => upperServerDataHandler(s, d))
    s.on("end", () => console.log("Upper server client disconnected"))
}

const randomNumberServerConnectedCallback  = s => {
    console.log("Random number client connected")

    s.setTimeout(2000, () => console.log("Timeout occurred in random number server"))
    s.on("data", d => randomNumberServerDataHandler(s, d))
    s.on("end", () => console.log("Random number client disconnected"))
}

const randomNumberServerDataHandler = (socket, data) => {
    const origin = data.readInt32BE(0)
    const bound = data.readInt32BE(4)

    const value = Math.trunc(Math.floor(Math.random() * (bound - origin) + origin))
    console.log(`Generated Random Value:${value}`)

    const buf = Buffer.alloc(4)

    buf.writeInt32BE(value, 0)
    socket.write(buf)
    socket.end()
}

const main = () => {
    const upperServer = net.createServer(upperServerConnectedCallback)
    const randomNumberServer = net.createServer(randomNumberServerConnectedCallback)

    upperServer.listen({
        port: 50500,
        backlog: 512
    }, () => console.log("Upper server is listening"))

    randomNumberServer.listen({
        port: 50501,
        backlog: 512
    }, () => console.log("Random number server is listening"))
}

main()


//00000000 00000001 -> 00 01 ->
