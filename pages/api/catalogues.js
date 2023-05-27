import axios from "axios";

export default async function handler(req, res) {
  const accToken = req.headers.authorization;
  try {
    const data = await axios.get(process.env.PROXY_URL + "/2.0/catalogues/", {
      headers: {
        Authorization: accToken,
        "X-Api-App-Id": process.env.SUPERJOB_CLIENT_SECRET,
        "x-secret-key": process.env.PROXY_KEY,
      },
    });

    res.status(200).send(data.data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
