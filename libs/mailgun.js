import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const client = mailgun.client({
    username: 'api',
    key: '0920befd-785546cc', // Replace with your Mailgun Private API Key
});

/**
 * Send an email notification using Mailgun.
 *
 * @param {string} to - Recipient email address.
 * @param {string} subject - Email subject line.
 * @param {string} text - Email body content.
 */
export async function sendEmail(to, subject, text) {
    try {
        const domain = 'sandbox794b0577ba8f49389e7b3669fbe062f3.mailgun.org'; // Replace with your verified Mailgun domain
        const message = {
            from: 'sandbox794b0577ba8f49389e7b3669fbe062f3.mailgun.org',
            to,
            subject,
            text,
            html: `<h1>${subject}</h1><p>${text}</p>`, // Add HTML content
        };        

        const result = await client.messages.create(domain, message);
        console.log('Email sent:', result);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
