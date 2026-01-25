import dgram from 'dgram';

const messageHandler = (msg, info) => {
    console.log(`Received from ${info.address}:${info.port}`);
    console.log(`Message: ${msg}`);
}

const main = () => {
    const receiver = dgram.createSocket('udp4')

    receiver.on("message", messageHandler)
    receiver.on("listening", () =>  console.log(`UDP Receiver is listening on ${receiver.address().address}:${receiver.address().port}`))
    receiver.bind(60700)
}

main()
