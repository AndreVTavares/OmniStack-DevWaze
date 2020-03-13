module.exports = function ParseArrayAsString (arrayAsString) {
    return arrayAsString.split(',').map(array => array.trim())
}