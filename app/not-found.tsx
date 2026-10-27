import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-4 py-8 text-white">
      <h2 className="text-2xl font-semibold">Harjoitetta ei löydy</h2>
      <p className="mt-2 text-sm text-white/80">
        Se on voitu poistaa julkaisusta tai osoite on vanhentunut.
      </p>
      <Link href="/" className="mt-4 inline-block font-semibold underline">
        Takaisin ikäryhmiin
      </Link>
    </div>
  );
}
