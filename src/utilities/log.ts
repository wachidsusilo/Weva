
export const Log = (...messages: Array<any>) => {
    if(process.env.NODE_ENV === 'development') {
        console.log(messages.join(' '))
    }
}