import { Resend } from "resend";

class EmailService {
    #resendClient = null;

    #getResendClient() {
        if (this.#resendClient) return this.#resendClient;

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error(
                "[EmailService] Error: RESEND_API_KEY is not defined in environment variables.",
            );
            throw new Error(
                "Konfigurasi email belum lengkap (API Key Kosong). Mohon hubungi administrator.",
            );
        }

        this.#resendClient = new Resend(apiKey);
        return this.#resendClient;
    }

    async sendResetPasswordEmail(email, name, token) {
        const resend = this.#getResendClient();

        const frontendUrl = process.env.FRONTEND_URL;
        if (!frontendUrl) {
            console.error(
                "[EmailService] Error: FRONTEND_URL is not defined in environment variables.",
            );
            throw new Error(
                "Konfigurasi tautan reset password belum lengkap (FRONTEND_URL Kosong). Mohon hubungi administrator.",
            );
        }

        const resetUrl = `${frontendUrl}/reset-password?token=${token}`;
        const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

        try {
            const { data, error } = await resend.emails.send({
                from: `PPDB SMP Katolik St. Rafael <${fromEmail}>`,
                to: [email],
                subject: "Reset Kata Sandi Akun PPDB",
                html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px;">
            <h2 style="color: #253b80; text-align: center;">Reset Kata Sandi</h2>
            <p>Halo <strong>${name}</strong>,</p>
            <p>Kami menerima permintaan untuk mengatur ulang kata sandi akun PPDB Anda. Silakan klik tombol di bawah ini untuk melanjutkan:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #253b80; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Kata Sandi</a>
            </div>
            <p>Tautan ini hanya berlaku selama <strong>30 menit</strong>. Jika Anda tidak merasa melakukan permintaan ini, silakan abaikan email ini.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666; text-align: center;">Ini adalah email otomatis, mohon tidak membalas email ini.</p>
          </div>
        `,
            });

            if (error) {
                console.error("[EmailService] Resend API Error:", error);

                // Handle Resend testing mode restriction (Error 403)
                if (error.statusCode === 403 || error.name === "forbidden") {
                    const isTestingMode = fromEmail === "onboarding@resend.dev";
                    if (isTestingMode) {
                        throw new Error("RESEND_TESTING_RESTRICTION");
                    }
                }

                throw new Error(error.message || "Gagal mengirim email reset password.");
            }

            return data;
        } catch (err) {
            console.error("[EmailService] catch Error:", err);
            // Re-throw special error or generic error
            if (err.message === "RESEND_TESTING_RESTRICTION") {
                throw err;
            }
            throw new Error(err.message || "Terjadi kesalahan pada layanan email.");
        }
    }
}

export default new EmailService();
