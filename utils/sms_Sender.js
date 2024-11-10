

export const sms_Sender = async (to, message) => {
  try {
    const response = await fetch("https://api.local-telecom.com/sms", {
      // Replace with the actual API endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY", // Replace with your API key if required
      },
      body: JSON.stringify({ to: to, message: message }),
    });
    const data = await response.json();
    if (response.ok) {
      res.status(200).send(`Message sent successfully: ${data}`);
    } else {
      res.status(response.status).send(`Error sending message: ${data}`);
    }
  } catch (error) {
    res.status(500).send(`Error sending message (catch): ${error.message}`);
  }
};
