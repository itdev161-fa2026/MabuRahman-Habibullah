import mongoose from 'mongoose';
import config from 'config';

const db = config.get('mongoURL');

const connectDatabase = async () => {
    try {
        await mongoose.connect(db);
        console.log('connected to MongoDB');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDatabase;