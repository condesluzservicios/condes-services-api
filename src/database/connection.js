import mongoose from 'mongoose';
// mongoose.set('bufferCommands', false);

export const connectionDB = async () => {
  try {
    const connection = await mongoose.connect(getTypeConnection(), {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Database connected to ${connection.connections[0].name}`);
  } catch (error) {
    console.log(`[Database] ${error}`);
  }
};

const getTypeConnection = () => {
  const connectType = process.env.MONGODB_CONNECT_TYPE;
  if (connectType == 'REMOTE') return getRemoteURL();
  if (connectType === 'TEST') return getRemoteURLTest();
  return getLocalURL();
};

const getRemoteURL = () => {
  const server = process.env.MONGODB_REMOTE_SERVER;
  const database = process.env.MONGODB_REMOTE_DATABASE;
  const user = process.env.MONGODB_REMOTE_USER;
  const password = process.env.MONGODB_REMOTE_PASSWORD;
  return `mongodb+srv://${user}:${password}@${server}/${database}?retryWrites=true&w=majority`;
};

const getRemoteURLTest = () => {
  const user = process.env.MONGODB_REMOTE_TEST_USER;
  const password = process.env.MONGODB_REMOTE_TEST_PASSWORD;
  const server = process.env.MONGODB_REMOTE_TEST_SERVER;
  const database = process.env.MONGODB_REMOTE_TEST_DATABASE;
  return `mongodb+srv://${user}:${password}@${server}/${database}?retryWrites=true&w=majority`;
};

const getLocalURL = () =>
  `mongodb://${process.env.MONGODB_LOCAL_SERVER}/${process.env.MONGODB_LOCAL_DATABASE}`;
