"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import "../admin.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (loginError) throw loginError;
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-shell">
      <section className="login-panel">
        <a className="admin-brand" href="/" aria-label="ATEL 3D inicio">
          ATEL<span>3D</span>
        </a>
        <div className="login-icon"><LockKeyhole size={22} strokeWidth={1.5} /></div>
        <p className="admin-kicker">ESPACIO PRIVADO · ATEL 3D</p>
        <h1>Bienvenido<br /><em>de vuelta.</em></h1>
        <p className="login-description">Ingresa con tu cuenta autorizada para gestionar el estudio.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            placeholder="tu@correo.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label htmlFor="password">Contraseña</label>
          <div className="password-field">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="admin-primary-button" type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar al panel"} <ArrowRight size={17} />
          </button>
        </form>
        <p className="login-footnote">Acceso restringido a usuarios autorizados.</p>
      </section>
      <aside className="login-art">
        <div className="login-art-grid" />
        <div className="login-art-shape shape-a" />
        <div className="login-art-shape shape-b" />
        <div className="login-art-shape shape-c" />
        <div className="login-art-caption"><span>ATEL / MANAGER</span><span>IDEAS QUE TOMAN FORMA</span></div>
      </aside>
    </main>
  );
}
