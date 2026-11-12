"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { PRODUCTS, SHOP } from "@/lib/data";
import { Icon } from "./Icon";

const SLOTS = ["11:00", "13:00", "15:00", "17:00", "19:00"];
type Mode = "showroom" | "video";
type Errors = Partial<Record<"name" | "phone" | "date" | "slot", string>>;

function nextDays(n: number) {
  const out: { iso: string; day: string; date: string; closed: boolean }[] = [];
  const d = new Date();
  for (let i = 1; out.length < n; i++) {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
    out.push({
      iso: x.toISOString().slice(0, 10),
      day: x.toLocaleDateString("en-IN", { weekday: "short" }),
      date: x.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      closed: x.getDay() === 1,
    });
  }
  return out;
}

export function AppointmentForm() {
  const params = useSearchParams();
  const piece = params.get("piece");
  const days = useMemo(() => nextDays(10), []);
  const [mode, setMode] = useState<Mode>(params.get("mode") === "video" ? "video" : "showroom");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<null | { name: string; when: string }>(null);
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const phone = String(f.get("phone") ?? "").replace(/[\s-]/g, "");
    const errs: Errors = {};
    if (!name) errs.name = "Tell us who we'll be welcoming.";
    if (!/^(\+?91)?[6-9]\d{9}$/.test(phone)) errs.phone = "Enter a 10-digit Indian mobile number, so we can confirm on WhatsApp.";
    if (!date) errs.date = "Choose a day for your sitting.";
    if (!slot) errs.slot = "Choose a time.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setSending(true);
    // Demo only: no backend yet. Wire this to the CRM or an API route.
    await new Promise((r) => setTimeout(r, 700));
    const d = days.find((x) => x.iso === date)!;
    setDone({ name, when: `${d.day} ${d.date} at ${slot}` });
    setSending(false);
  };

  if (done) {
    const msg = encodeURIComponent(`Namaste, this is ${done.name}. I've requested a ${mode === "video" ? "video consultation" : "showroom sitting"} on ${done.when}.`);
    return (
      <div className="form-done" role="status">
        <span className="done-mark">
          <Icon name="check" size={28} />
        </span>
        <h3>Your sitting is requested, {done.name.split(" ")[0]}.</h3>
        <p>
          {mode === "video" ? "Video consultation" : "Showroom sitting"} on <strong>{done.when}</strong>. We'll confirm on WhatsApp within a working hour, and set the pieces you asked about on a tray before you arrive.
        </p>
        <a className="btn btn-velvet" href={`https://wa.me/${SHOP.whatsapp}?text=${msg}`} target="_blank" rel="noreferrer">
          <Icon name="whatsapp" /> Message us now
        </a>
        <p className="muted small">Demo form: nothing has been sent yet.</p>
      </div>
    );
  }

  return (
    <form className="appt" onSubmit={onSubmit} noValidate>
      <fieldset className="mode">
        <legend className="sr-only">How would you like to meet?</legend>
        <button type="button" aria-pressed={mode === "showroom"} onClick={() => setMode("showroom")}>
          <Icon name="pin" /> <span><strong>At the showroom</strong><span>Johari Bazaar, Jaipur</span></span>
        </button>
        <button type="button" aria-pressed={mode === "video"} onClick={() => setMode("video")}>
          <Icon name="video" /> <span><strong>On a video call</strong><span>From anywhere, 30 minutes</span></span>
        </button>
      </fieldset>

      <div className="field-row">
        <label className="field">
          <span>Your name</span>
          <input id="f-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
          {errors.name ? <span className="err" id="e-name">{errors.name}</span> : null}
        </label>
        <label className="field">
          <span>Mobile (WhatsApp)</span>
          <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "e-phone" : undefined} />
          {errors.phone ? <span className="err" id="e-phone">{errors.phone}</span> : null}
        </label>
      </div>

      <fieldset className="field">
        <legend>Day</legend>
        <div className="days" id="f-date" tabIndex={-1}>
          {days.map((d) => (
            <button key={d.iso} type="button" disabled={d.closed} aria-pressed={date === d.iso} onClick={() => setDate(d.iso)} title={d.closed ? "Closed on Mondays" : undefined}>
              <span>{d.day}</span>
              <strong>{d.date}</strong>
            </button>
          ))}
        </div>
        {errors.date ? <span className="err">{errors.date}</span> : null}
      </fieldset>

      <fieldset className="field">
        <legend>Time</legend>
        <div className="slots" id="f-slot" tabIndex={-1}>
          {SLOTS.map((s) => (
            <button key={s} type="button" aria-pressed={slot === s} onClick={() => setSlot(s)}>
              {s}
            </button>
          ))}
        </div>
        {errors.slot ? <span className="err">{errors.slot}</span> : null}
      </fieldset>

      <label className="field">
        <span>What should we bring out?</span>
        <select name="interest" defaultValue={piece ?? ""}>
          <option value="">Show me a bit of everything</option>
          <optgroup label="A piece you saw">
            {PRODUCTS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Or a need">
            <option value="trousseau">Full bridal trousseau</option>
            <option value="exchange">Old gold exchange</option>
            <option value="custom">A custom piece</option>
          </optgroup>
        </select>
      </label>

      <label className="field">
        <span>Anything else? <em>optional</em></span>
        <textarea name="notes" rows={3} placeholder="Wedding date, outfit colours, who's coming along…" />
      </label>

      <button className="btn btn-velvet btn-wide" type="submit" disabled={sending}>
        {sending ? "Setting out the tray…" : mode === "video" ? "Request a video consultation" : "Request a showroom sitting"}
      </button>
    </form>
  );
}
