// Turns string to a primitive.
// Example:
//   'true' -> true
//   '1' -> 1
module.exports = function convertToPrimitive(stringValue) {
    if (stringValue === 'true' || stringValue === 'false') {
        return stringValue === 'true';
    } else if (!isNaN(+stringValue)) {
        return +stringValue;
    } else {
        return stringValue;
    }
};