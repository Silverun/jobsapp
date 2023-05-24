import axios from "axios";

export default async function handler(req, res) {
  console.log(req.query);
  if (JSON.stringify(req.query) !== "{}" && req.query.keyword) {
    console.log(req.query.keyword);
    const keyword = req.query.keyword;
    const data = await axios.get(
      process.env.PROXY_URL + `/2.0/vacancies/?keyword=${keyword}`,
      {
        headers: {
          // Authorization: "Bearer " + accToken,
          "X-Api-App-Id": process.env.SUPERJOB_CLIENT_SECRET,
          "x-secret-key": process.env.PROXY_KEY,
        },
      }
    );
    res.status(200).send(data.data.objects);
  } else if (req.query.catalogues) {
    const catalogues = req.query.catalogues;
    const from = req.query.payment_from;
    const to = req.query.payment_to;
    const data = await axios.get(
      process.env.PROXY_URL +
        `/2.0/vacancies/?catalogues=${catalogues}&payment_from=${from}&payment_to=${to}`,
      {
        headers: {
          // Authorization: "Bearer " + accToken,
          "X-Api-App-Id": process.env.SUPERJOB_CLIENT_SECRET,
          "x-secret-key": process.env.PROXY_KEY,
        },
      }
    );
    res.status(200).send(data.data.objects);
  } else {
    try {
      const data = await axios.get(process.env.PROXY_URL + "/2.0/vacancies/", {
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
}
