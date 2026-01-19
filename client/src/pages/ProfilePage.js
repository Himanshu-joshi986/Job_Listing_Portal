import React, { useState } from "react";
import { PageShell } from "../components/PageShell";
import { SectionHeading } from "../components/SectionHeading";

function UploadInline() {
  const [name, setName] = useState("");
  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <label className="btn-ghost cursor-pointer">
        Upload resume
        <input
          type="file"
          className="hidden"
          onChange={(e) => setName(e.target.files?.[0]?.name || "")}
        />
      </label>
      <div className="text-sm text-white/55">
        {name ? <span className="text-white/80">{name}</span> : "No file selected"}
      </div>
    </div>
  );
}

export function ProfilePage() {
  const [fullName, setFullName] = useState("Himanshu Joshi");
  const [headline, setHeadline] = useState("Frontend • React • UI Systems");
  const [email, setEmail] = useState("himanshu@example.com");
  const [phone, setPhone] = useState("+91 9xxxx xxxxx");
  const [city, setCity] = useState("India");

  return (
    <PageShell className="container-app">
      <SectionHeading
        eyebrow="Profile"
        title="Edit your information"
        subtitle="UI-only profile editor with glass cards and clean forms."
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-3xl p-6 lg:col-span-2">
          <div className="text-lg font-bold tracking-tight">Personal info</div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/55">
                Full name
              </div>
              <input
                className="input mt-2"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/55">
                Headline
              </div>
              <input
                className="input mt-2"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/55">
              About
            </div>
            <textarea
              className="input mt-2 min-h-[120px] resize-none"
              placeholder="Write a short bio (dummy)..."
              defaultValue="I build premium, motion-first interfaces with React + Tailwind. I love design systems and micro-interactions."
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button className="btn-ghost">Cancel</button>
            <button className="btn-primary">Save changes</button>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="glass rounded-3xl p-6">
            <div className="text-lg font-bold tracking-tight">Contact</div>
            <div className="mt-5 grid gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-white/55">
                  Email
                </div>
                <input
                  className="input mt-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-white/55">
                  Phone
                </div>
                <input
                  className="input mt-2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-white/55">
                  City
                </div>
                <input
                  className="input mt-2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-bold tracking-tight">Resume</div>
                <div className="mt-1 text-sm text-white/60">
                  Upload & manage (mock).
                </div>
              </div>
              <span className="chip">UI only</span>
            </div>
            <UploadInline />
            <div className="mt-4 grid gap-2">
              <button className="btn-ghost w-full py-3">Preview</button>
              <button className="btn-primary w-full py-3">Set as default</button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

