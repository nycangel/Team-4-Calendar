import { addEventToDB } from './libs/firebase.js';
import { sendEmail } from './libs/mailgun.js';

document.getElementById('event-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get user input from the form
    const title = e.target.title.value;
    const date = e.target.date.value;
    const description = e.target.description.value;
    const recipientEmail = e.target.email.value;

    try {
        // Add event to Firebase
        const eventId = await addEventToDB({ title, date, description });

        // Send email notification
        const emailSubject = `New Event Created: ${title}`;
        const emailBody = `Hi,\n\nA new event titled "${title}" has been scheduled for ${date}.\n\nDescription:\n${description}`;
        await sendEmail(recipientEmail, emailSubject, emailBody);

        // Update event log on the site
        const eventLog = document.getElementById('event-log');
        const newLogEntry = document.createElement('div');
        newLogEntry.classList.add('log-entry');
        newLogEntry.innerHTML = `
            <h3>${title}</h3>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Description:</strong> ${description}</p>
        `;
        eventLog.appendChild(newLogEntry);

        alert('Event Created, Email Sent, and Log Updated!');
    } catch (error) {
        console.error('Error creating event or sending notification:', error);
        alert('Failed to create event or send notification.');
    }

    // Reset the form
    e.target.reset();
});
