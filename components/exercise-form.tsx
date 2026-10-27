"use client";

import { useActionState, useState } from "react";
import { saveExercise, type ExerciseFormState } from "@/app/actions/exercises";
import { AGE_GROUPS, THEMES } from "@/lib/catalog";

export type ExerciseFormValues = {
  id?: string;
  title: string;
  body: string;
  videoUrl: string;
  forPlayers: boolean;
  forCoaches: boolean;
  ageGroups: string[];
  themes: string[];
  published: boolean;
};

const initialState: ExerciseFormState = { error: null };

export function ExerciseForm({ values }: { values: ExerciseFormValues }) {
  const [state, action, pending] = useActionState(saveExercise, initialState);
  const [title, setTitle] = useState(values.title);
  const [body, setBody] = useState(values.body);
  const [videoUrl, setVideoUrl] = useState(values.videoUrl);
  const [audiences, setAudiences] = useState({
    pelaajat: values.forPlayers,
    valmentajat: values.forCoaches,
  });
  const [ages, setAges] = useState(values.ageGroups);
  const [themes, setThemes] = useState(values.themes);
  const [published, setPublished] = useState(values.published);

  function toggle(list: string[], value: string, checked: boolean) {
    return checked ? [...list, value] : list.filter((item) => item !== value);
  }

  return (
    <form action={action} className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-md">
      {values.id ? <input type="hidden" name="id" value={values.id} /> : null}
      <Field label="Otsikko">
        <input
          name="title"
          required
          maxLength={120}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="field"
        />
      </Field>
      <Field label="Teksti">
        <textarea
          name="body"
          required
          rows={7}
          maxLength={5000}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          className="field min-h-32"
        />
      </Field>
      <Field label="Videon osoite">
        <input
          name="videoUrl"
          type="url"
          required
          inputMode="url"
          placeholder="https://www.youtube.com/watch?v=…"
          value={videoUrl}
          onChange={(event) => setVideoUrl(event.target.value)}
          className="field"
        />
        <p className="text-xs text-[#5c6b7a]">
          YouTube-linkki tai Google Drive -tiedosto, joka on jaettu kaikille linkin haltijoille.
        </p>
      </Field>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Kohderyhmä</legend>
        <div className="grid gap-2">
          <Check
            name="audience"
            value="pelaajat"
            label="Pelaajat"
            checked={audiences.pelaajat}
            onChange={(checked) => setAudiences((current) => ({ ...current, pelaajat: checked }))}
          />
          <Check
            name="audience"
            value="valmentajat"
            label="Valmentajat"
            checked={audiences.valmentajat}
            onChange={(checked) =>
              setAudiences((current) => ({ ...current, valmentajat: checked }))
            }
          />
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Ikäryhmät</legend>
        <div className="grid gap-2">
          {AGE_GROUPS.map((age) => (
            <Check
              key={age.id}
              name="ageGroup"
              value={age.id}
              label={age.label}
              checked={ages.includes(age.id)}
              onChange={(checked) => setAges((current) => toggle(current, age.id, checked))}
            />
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Teemat</legend>
        <div className="grid gap-2">
          {THEMES.map((theme) => (
            <Check
              key={theme.id}
              name="theme"
              value={theme.id}
              label={theme.label}
              checked={themes.includes(theme.id)}
              onChange={(checked) => setThemes((current) => toggle(current, theme.id, checked))}
            />
          ))}
        </div>
      </fieldset>
      <Check
        name="published"
        value="on"
        label="Julkaistu"
        checked={published}
        onChange={setPublished}
      />
      {state.error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="h-12 rounded-full bg-[#e8a317] text-base font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Tallennetaan…" : "Tallenna"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-sm font-semibold text-[#1e2a36]">
      {label}
      {children}
    </label>
  );
}

function Check({
  name,
  value,
  label,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex min-h-11 items-center gap-3 rounded-xl border border-black/10 px-3 text-sm font-medium">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      {label}
    </label>
  );
}
