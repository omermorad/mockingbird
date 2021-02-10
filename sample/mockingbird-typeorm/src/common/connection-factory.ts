import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export async function connectionFactory(): Promise<Connection> {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return createConnection(connectionOptions);
}
