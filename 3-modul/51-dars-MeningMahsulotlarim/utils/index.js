export default {
    ifequal(a, b, options) {
        if (a == b) {
            return options.fn(this)
        }
        return options.inverse(this)
    },
    getFullNameFirstCharacter(firstname, lastname) {
        return firstname.charAt(0) + lastname.charAt(0)
    }
}