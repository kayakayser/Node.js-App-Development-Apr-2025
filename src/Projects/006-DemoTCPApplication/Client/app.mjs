import net from "node:net"


const connectionCallback = client => {
    console.log("Client connected")

    client.write(process.argv[2])
    client.end()
}




const main = () => {
    const client = net.createConnection({port: 50500, host: "127.0.0.1"}, () => connectionCallback(client))
    client.on("data", data => console.log("Data received from server:", data.toString()))
    client.on("end", () => console.log("Disconnected from server"))
}


main()