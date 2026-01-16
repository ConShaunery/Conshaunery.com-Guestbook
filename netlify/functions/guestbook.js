import { getStore } from "@netlify/blobs";

export async function handler(event) {
  const store = getStore("guestbook");
  let entries = (await store.get("entries", { type: "json" })) || [];

  if (event.httpMethod === "POST") {
    const data = JSON.parse(event.body);

    entries.unshift({
      name: data.name,
      message: data.message,
      date: new Date().toISOString()
    });

    await store.set("entries", entries);
    return { statusCode: 200 };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(entries)
  };
}
