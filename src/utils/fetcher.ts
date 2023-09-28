import axios from "axios";

export const fetcher = (url: string) =>  {
  return axios
    .get(process.env.NEXT_PUBLIC_API_URL + url, {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
      // "Referer": "https://www.scrapingbee.com/",
		  // "Referrer-Policy": "strict-origin-when-cross-origin"
    },
      validateStatus: (status) => status !== 204 // Ignore 204 status
    })
    .then((res) => (res.status !== 204 ? res.data : undefined))
}
  
