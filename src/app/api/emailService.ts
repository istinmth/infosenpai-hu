import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendConfirmationEmail(firstName: string, email: string, template: 'freeRegistration' | 'paidRegistration') {
    try {
        const subject = template === 'freeRegistration'
            ? 'Sikeres jelentkezés az InfoSenpai próbaalkalmára'
            : 'Sikeres regisztráció az InfoSenpai tanfolyamra';

        const htmlContent = template === 'freeRegistration'
            ? `<p>Kedves ${firstName}!</p>
         <p>Rögzítettük a jelentkezésed a próbaalkalmunkra...</p>`
            : `<p>Kedves ${firstName}!</p>
         <p>Köszönjük a regisztrációdat az InfoSenpai tanfolyamra...</p>`;

        const data = await resend.emails.send({
            from: 'InfoSenpai <info@infosenpai.hu>',
            to: [email],
            subject: subject,
            html: htmlContent,
        });

        console.log('Confirmation email sent successfully:', data);
        return data;
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw error;
    }
}