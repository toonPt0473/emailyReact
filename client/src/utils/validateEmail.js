const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ;

export default (email) => {
    const invalidEmails = email
    .split(',')
    .map(email => email.trim())
    .filter(email => regex.test(email) === false)

    if(invalidEmails.length){
        return `these email are invalid : ${invalidEmails}`
    }
}