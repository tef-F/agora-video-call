require('dotenv').config();
const mongoose = require('mongoose');
module.exports = {
    connectDB: function () {
        //Database connection
        mongoose.set('strictQuery', true);
        mongoose.connect(`mongodb://127.0.0.1/${process.env.DB_NAME}`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        mongoose.connection.on('error', (error) => {
            console.error('Mongoose Connection Error: ' + error.message);
        });
        mongoose.connection.once('open', () => {
            console.log('Mongodb connected!');
        });
    },
};
