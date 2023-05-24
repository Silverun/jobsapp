import axios from "axios";

export default async function handler(req, res) {
  try {
    const data = await axios.get(process.env.PROXY_URL + "/2.0/catalogues/", {
      headers: {
        // Authorization: "Bearer " + accToken,
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
