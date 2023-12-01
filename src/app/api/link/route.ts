import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  let url = new URL(request.url);

  const href = url.searchParams.get("url");

  console.log(href);
  if (!href) {
    return NextResponse.json({ msg: "invalid href" }, { status: 400 });
  }
  const response = await axios.get(href);

  const titleMatch = response.data.match(/<title>(.*?)<\/title>/);

  const title = titleMatch ? titleMatch[1] : "";
  const descriptionMatch = response.data.match(
    /meta name="description" content="(.*?)"/
  );
  const description = descriptionMatch ? descriptionMatch[1] : "";

  const imageMatch = response.data.match(
    /<meta property="og:image" content="(.*?)"/
  );

  const imageUrl = imageMatch ? imageMatch[1] : "";
  return new Response(
    JSON.stringify({
      success: 1,
      meta: {
        title,
        description,
        image: {
          url: imageUrl,
        },
      },
    })
  );

  // return NextResponse.json({data:"kill bill"})
  // JSON.stringify({
  //   success: 1,
  //   meta: {
  //     title,
  //     description,
  //     image: {
  //       url: imageUrl,
  //     },
  //   },
  // })
  // );
}
