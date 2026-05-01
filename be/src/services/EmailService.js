import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

class EmailService {
  async sendResetPasswordEmail(email, name, token) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    try {
      const { data, error } = await resend.emails.send({
        from: 'PPDB SMP Katolik St. Rafael <onboarding@resend.dev>', // Use verified domain in production
        to: [email],
        subject: 'Reset Kata Sandi Akun PPDB',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; rounded: 8px;">
            <h2 style="color: #253b80; text-align: center;">Reset Kata Sandi</h2>
            <p>Halo <strong>${name}</strong>,</p>
            <p>Kami menerima permintaan untuk meriset kata sandi akun PPDB Anda. Silakan klik tombol di bawah ini untuk melanjutkan:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #253b80; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Kata Sandi</a>
            </div>
            <p>Link ini hanya berlaku selama <strong>30 menit</strong>. Jika Anda tidak merasa melakukan permintaan ini, abaikan email ini.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666; text-align: center;">Ini adalah email otomatis, mohon tidak membalas email ini.</p>
          </div>
        `,
      });

      if (error) {
        console.error("Resend Error:", error);
        throw new Error("Gagal mengirim email reset password");
      }

      return data;
    } catch (err) {
      console.error("Email Service Error:", err);
      throw err;
    }
  }
}

export default new EmailService();
