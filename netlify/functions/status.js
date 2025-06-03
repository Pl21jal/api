let status = 0; // default status

export async function handler(event) {
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      if (typeof body.status === 'number') {
        status = body.status;
        return {
          statusCode: 200,
          body: JSON.stringify({ status, message: "Status updated successfully" })
        };
      } else {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Invalid status value" })
        };
      }
    } catch (err) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid JSON" })
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method not allowed" })
  };
}
