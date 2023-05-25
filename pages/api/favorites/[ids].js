import axios from "axios";

export default async function handler(req, res) {
  const { ids } = req.query;
  const idsArr = ids.slice(1, ids.length - 1).split(",");

  const createQuery = () => {
    let result = "";
    idsArr.forEach((id, i) => {
      result = result.concat("&", `ids[${i}]=${id}`);
    });
    return result.slice(1);
  };
  try {
    const data = await axios.get(
      process.env.PROXY_URL + `/2.0/vacancies/?${createQuery()}`,
      {
        headers: {
          // Authorization: "Bearer " + accToken,
          "X-Api-App-Id": process.env.SUPERJOB_CLIENT_SECRET,
          "x-secret-key": process.env.PROXY_KEY,
        },
      }
    );
    res.status(200).send(data.data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
