export async function POST(request: Request) {
  const { url } = await request.json();

  const key = "92f365bbfcf946a38c6046e6245c1ad2";

  await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      host: "yourblog.com",
      key,
      keyLocation: `https://techgearsfinds4you.vercel.app/${key}.txt`,
      urlList: [url]
    })
  });

  return Response.json({ submitted: true, url });
}
