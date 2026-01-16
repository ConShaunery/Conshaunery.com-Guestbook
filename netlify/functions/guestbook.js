let entries = [];

exports.handler = async function (event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  };

  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers };
  }

  // Add entry
  if (event.httpMethod === "POST") {
    const data = JSON.parse(event.body || "{}");

    if (!data.name || !data.message) {
      return {
        statusCode: 400,
        headers,
        body: "Invalid input"
      };
    }

    entries.unshift({
      name: data.name,
      message: data.message,
      date: new Date().toISOString()
    });

    return {
      statusCode: 200,
      headers,
      body: "OK"
    };
  }

  // Get entries
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(entries)
  };
};
