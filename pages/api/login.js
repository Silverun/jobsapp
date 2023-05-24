import axios from "axios";

export default async function handler(req, res) {
  try {
    const data = await axios.get(
      `${process.env.PROXY_URL}/2.0/oauth2/password/?login=${process.env.SUPERJOB_LOGIN}&password=${process.env.SUPERJOB_PASS}&client_id=${process.env.SUPERJOB_CLIENT_ID}&client_secret=${process.env.SUPERJOB_CLIENT_SECRET}`,
      {
        headers: {
          "x-secret-key": process.env.PROXY_KEY,
        },
      }
    );
    const accToken = data.data.access_token;
    console.log(accToken);
    res.status(200).send(accToken);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
