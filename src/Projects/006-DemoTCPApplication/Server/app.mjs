import net from 'node:net';

const dataHandler = (socket,  data) => {
    console.log(`Raw Data:${data}`)

    let dataStr = data.toString()
    console.log(`Data String :${dataStr}`)
    dataStr = dataStr.toUpperCase()
    socket.write(dataStr)
    socket.end()
}

const connectedCallback  = s => {
    console.log("Client connected")

    s.setTimeout(2000, () => console.log("Timeout occurred"))
    s.on("data", d => dataHandler(s, d))
    s.on("end", () => console.log("Client disconnected"))
}

const main = () => {
    const server = net.createServer(connectedCallback)

    server.listen({
        port: 50500,
        backlog: 512
    }, () => console.log("Upper server is listening"))
}


main()
