import axios from 'axios';

export const sendEmail = async (email, subject, message) => {
    const apiUrl = 'YOUR_EMAIL_API_ENDPOINT';
    const apiKey = 'YOUR_API_KEY';

    try {
        await axios.post(apiUrl, {
            to: email,
            subject,
            text: message,
            api_key: apiKey
        });
    } catch (error) {
        console.error("Error sending email", error);
        throw error;
    }
};
