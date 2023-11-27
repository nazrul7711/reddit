

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const fetchSubscribers = (url: string) =>
  fetch(url).then(res=>res.json());
