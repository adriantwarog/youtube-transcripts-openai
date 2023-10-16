import { Client } from "cassandra-driver"
import credentials from './youtubescripts-token.json' assert { type: "json" }

async function run() {
  const client = new Client({
    cloud: {
    secureConnectBundle: "./secure-connect-youtubescripts.zip",
    },
    credentials: {
    username: credentials.clientId
	,
    password: credentials.secret,
    },
  });

  await client.connect();

  // Execute a query
  const rs = await client.execute("SELECT * FROM system.local");
  console.log(`Your cluster returned ${rs.rowLength} row(s)`);

  await client.shutdown();
}

// Run the async function
run();

6e465a19-5f95-4ec9-8737-188303c15d4c