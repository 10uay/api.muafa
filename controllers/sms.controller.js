import { sms_Sender } from "../utils/sms_Sender";

export const sms_notification = async (req, res, next) => {
  const { to, message } = req.body;
  if (!to || !message) {
    next(handleError(400, "message and mobile are required!"));
  } else sms_Sender(to, message);
};
