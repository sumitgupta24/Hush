import { resendClient, sender } from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "./emailTemplate.js"

export const sendWelcomeEmail = async (email, name, clientURL) => {
    const {data, error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Hush!",
        html: createWelcomeEmailTemplate(name, clientURL)
    });

    if(error){
        console.error("Error sending welcome mail", error);
        throw new Error("Failed to send email");
    }
    else{
        console.log("Welcome email sent successfully", data)
    }
}