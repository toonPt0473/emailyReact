const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default (email) => {
    const invalidEmails = email
    .split(',')
    .map(email => email.trim())
    .filter(email => regex.test(email) === false)

    if(invalidEmails.length){
        return `these email are invalid : ${invalidEmails}`
    }
}