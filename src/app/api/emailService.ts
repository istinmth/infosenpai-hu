import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type EmailTemplate = 'freeRegistration' | 'paidRegistration' | 'paymentSuccess';

export default async function sendConfirmationEmail(email: string, template: EmailTemplate, data?: { uniqueCode?: string }) {
    try {
        let subject: string;
        let htmlContent: string;

        switch (template) {
            case 'freeRegistration':
                subject = 'Sikeres jelentkezés az InfoSenpai próbaalkalmára';
                htmlContent = `
          <h1>Köszönjük a jelentkezésed!</h1>
          <p>Sikeresen regisztráltál az InfoSenpai próbaalkalmára. Hamarosan további információkat küldünk az eseményről.</p>
        `;
                break;
            case 'paidRegistration':
                subject = 'Sikeres regisztráció az InfoSenpai tanfolyamra';
                htmlContent = `
          <h1>Köszönjük a regisztrációdat!</h1>
          <p>Sikeresen regisztráltál az InfoSenpai tanfolyamra. Kérjük, kövesd a fizetési folyamatot a regisztráció befejezéséhez.</p>
        `;
                break;
            case 'paymentSuccess':
                subject = 'Sikeres fizetés - InfoSenpai tanfolyam';
                htmlContent = `
          <h1>Köszönjük a vásárlást!</h1>
          <p>A fizetésed sikeresen feldolgoztuk. Az egyedi kódod: <strong>${data?.uniqueCode}</strong></p>
          <p>Kérjük, őrizd meg ezt a kódot, szükséged lesz rá a tanfolyamon való részvételhez.</p>
        `;
                break;
            default:
                throw new Error('Invalid email template');
        }

        const result = await resend.emails.send({
            from: 'InfoSenpai <info@infosenpai.hu>',
            to: [email],
            subject: subject,
            html: htmlContent,
        });

        console.log('Email sent successfully:', result);
        return result;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}