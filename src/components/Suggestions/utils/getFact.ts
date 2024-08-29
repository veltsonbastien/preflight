export const getFact = () =>
  fetch("https://api.api-ninjas.com/v1/facts", {
    headers: { "X-Api-Key": process.env.NEXT_PUBLIC_FACTS_API_KEY || "" },
  })
    .then((res) => res.json())
    .then((data) => (data && data[0] ? data[0].fact : "No fact found"));
