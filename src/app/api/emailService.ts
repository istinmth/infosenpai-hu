import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendConfirmationEmail(firstName: string, email: string) {
    try {
        const data = await resend.emails.send({
            from: 'InfoSenpai <info@infosenpai.hu>',
            to: [email],
            subject: 'Sikeres jelentkezés az InfoSenpai tanfolyamra',
            html: `<p>Kedves ${firstName}!</p>

<p>Rögzítettük a jelentkezésed a próbaalkalomra.</p>

<p>Hamarosan egy új e-mailben értesítünk a pontos időpontról és helyszínről, sajnos ezt még mi sem tudjuk, azonban legkésőbb egy héttel az óra előtt jelentkezünk.</p>

<p>Ha bármi kérdés felmerült benned az órákkal, a tananyaggal, az oktatóinkkal vagy a weboldallal kapcsolatban, keress minket bátran, az <a href="mailto:info@infosenpai.hu">info@infosenpai.hu</a> címen!</p>

<p>Kellemes tanévkezdést kívánunk (ha van ilyen), hamarosan jelentkezünk!</p>

<p>Üdvözlettel,<br>Az InfoSenpai csapata</p>`,
        });

        console.log('Confirmation email sent successfully:', data);
        return data;
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw error;
    }
}