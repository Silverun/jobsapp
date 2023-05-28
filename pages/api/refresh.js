import axios from "axios";

export default async function handler(req, res) {
  const { refreshToken } = req.body;
  try {
    const data = await axios.get(
      `${process.env.PROXY_URL}/2.0/oauth2/refresh_token/?refresh_token=${refreshToken}&client_id=${process.env.SUPERJOB_CLIENT_ID}&client_secret=${process.env.SUPERJOB_CLIENT_SECRET}`,
      {
        headers: {
          "X-Api-App-Id": process.env.SUPERJOB_CLIENT_SECRET,
          "x-secret-key": process.env.PROXY_KEY,
        },
      }
    );

    const ttl = data.data.ttl;
    const accToken = data.data.access_token;
    const refToken = data.data.refresh_token;

    res
      .status(200)
      .send({ ttl: ttl, access_token: accToken, refresh_token: refToken });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
