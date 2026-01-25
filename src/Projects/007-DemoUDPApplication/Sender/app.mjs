import dgram from 'dgram'

let counter = 0
const sendIntervalCallback = sender => {
    const message = Buffer.from(`I am Ok!..., Counter: ${++counter}`)

    sender.send(message, 60700, 'localhost', e => {
        if (e)
            console.error("Error sending message:", e)
        else
            console.log(`Message sent. Count: ${counter}`)
    })
}

const main = () => {
    const sender = dgram.createSocket('udp4')

    setInterval(() => sendIntervalCallback(sender), 100)
}

main()
