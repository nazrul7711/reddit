import axios from "axios";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const fetchSubscribers = async ([url, token]:[url:string,token:string]) =>
  await axios
    .get(url, {
      params: { count: token },
    })
    .then((res) => res.data);
