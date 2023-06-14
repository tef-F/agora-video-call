

module.exports = {
    mutipleMongooseToObject: (mongoosesArray) => {
        return mongoosesArray.map(mongooseArray => mongooseArray.toObject());
    },
    mongooseToObject: (mongooseArray) => {
        return mongooseArray ? mongooseArray.toObject() : mongooseArray;
    }   
}