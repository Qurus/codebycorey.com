const fetcher: typeof fetch = async (input, init?) => {
  const res: Response = await fetch(input, init);
  return await res.json();
};

const fetcherWithToken = async (url: string, token: string) => {
  const res: Response = await fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin'
  });
  return await res.json();
};

export { fetcher, fetcherWithToken };
