import { Resend } from "resend";
import { z } from "zod";

const getResendClient = () => new Resend(process.env.RESEND_API_KEY || "re_dummy_for_build");

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6).regex(/^[\d\s+()-]+$/),
  email: z.string().email(),
  serviceSlug: z.string().min(1),
  message: z.string().optional(),
});

const SERVICE_LABELS: Record<string, string> = {
  "pie-diabetico": "Pie diabético",
  "unas-encarnadas": "Uñas encarnadas",
  "hongos": "Hongos en uñas / pie de atleta",
  "callosidades": "Callosidades y durezas",
  "plantillas": "Plantillas a medida",
  "cirugia-menor": "Cirugía menor podológica",
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Datos del formulario incompletos o inválidos." },
      { status: 422 },
    );
  }

  const { name, phone, email, serviceSlug, message } = parsed.data;
  const serviceName = SERVICE_LABELS[serviceSlug] ?? serviceSlug;
  const clinicEmail = process.env.CLINIC_EMAIL ?? "kairox.tech@gmail.com";

  const resend = getResendClient();
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "Consultorio Podológico Aguilar <onboarding@resend.dev>",
    to: [clinicEmail],
    replyTo: email,
    subject: `Nueva solicitud de cita – ${name}`,
    html: buildEmailHtml({ name, phone, email, serviceName, message }),
    text: buildEmailText({ name, phone, email, serviceName, message }),
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return Response.json(
      { error: "No pudimos enviar tu solicitud. Por favor intenta nuevamente." },
      { status: 500 },
    );
  }

  return Response.json({ success: true });
}

interface EmailData {
  name: string;
  phone: string;
  email: string;
  serviceName: string;
  message?: string;
}

function buildEmailHtml({ name, phone, email, serviceName, message }: EmailData): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8" /></head>
<body style="font-family:system-ui,sans-serif;background:#f4f6f9;margin:0;padding:32px 16px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
    <div style="background:#001736;padding:32px 40px;">
      <h1 style="margin:0;color:#7cf8dd;font-size:20px;font-weight:700;letter-spacing:-.02em;">
        Consultorio Podológico Aguilar
      </h1>
      <p style="margin:4px 0 0;color:rgba(255,255,255,.7);font-size:13px;">
        Nueva solicitud de cita
      </p>
    </div>
    <div style="padding:32px 40px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e8edf2;color:#64748b;font-size:13px;width:40%;">Nombre</td>
          <td style="padding:10px 0;border-bottom:1px solid #e8edf2;color:#0f172a;font-size:14px;font-weight:500;">${escHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e8edf2;color:#64748b;font-size:13px;">Teléfono</td>
          <td style="padding:10px 0;border-bottom:1px solid #e8edf2;color:#0f172a;font-size:14px;font-weight:500;">${escHtml(phone)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e8edf2;color:#64748b;font-size:13px;">Correo</td>
          <td style="padding:10px 0;border-bottom:1px solid #e8edf2;color:#0f172a;font-size:14px;font-weight:500;">${escHtml(email)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;${message ? "border-bottom:1px solid #e8edf2;" : ""}color:#64748b;font-size:13px;">Servicio</td>
          <td style="padding:10px 0;${message ? "border-bottom:1px solid #e8edf2;" : ""}color:#0f172a;font-size:14px;font-weight:500;">${escHtml(serviceName)}</td>
        </tr>
        ${
          message
            ? `<tr>
          <td style="padding:10px 0;color:#64748b;font-size:13px;vertical-align:top;">Mensaje</td>
          <td style="padding:10px 0;color:#0f172a;font-size:14px;line-height:1.6;">${escHtml(message)}</td>
        </tr>`
            : ""
        }
      </table>
      <div style="margin-top:28px;padding:16px 20px;background:#f0fdf9;border-radius:8px;border-left:4px solid #7cf8dd;">
        <p style="margin:0;color:#064e3b;font-size:13px;">
          Podés responder directamente a este correo para contactar al paciente.
        </p>
      </div>
    </div>
    <div style="padding:16px 40px;background:#f8fafc;border-top:1px solid #e8edf2;">
      <p style="margin:0;color:#94a3b8;font-size:12px;text-align:center;">
        Consultorio Podológico Aguilar · Los Olivos, Lima · 999 222 550
      </p>
    </div>
  </div>
</body>
</html>`;
}

function buildEmailText({ name, phone, email, serviceName, message }: EmailData): string {
  return [
    "NUEVA SOLICITUD DE CITA – Consultorio Podológico Aguilar",
    "",
    `Nombre:   ${name}`,
    `Teléfono: ${phone}`,
    `Correo:   ${email}`,
    `Servicio: ${serviceName}`,
    message ? `Mensaje:  ${message}` : "",
    "",
    "Podés responder a este correo directamente para contactar al paciente.",
  ]
    .filter((l) => l !== undefined)
    .join("\n");
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
