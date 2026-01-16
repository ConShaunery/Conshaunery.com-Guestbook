let entries = [];

exports.handler = async function (event) {
  if (event.httpMethod === "POST") {
    const data = JSON.parse(event.body);

    entries.unshift({
      name: data.name,
      message: data.message,
      date: new Date().toISOString()
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(entries)
  };
};
