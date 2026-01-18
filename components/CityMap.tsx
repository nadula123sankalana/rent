type CityMapProps = {
  city: string;
};

export default function CityMap({ city }: CityMapProps) {
  const query = encodeURIComponent(city);
  const src = `https://maps.google.com/maps?q=${query}&t=&z=11&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="overflow-hidden rounded-xl border border-white/60 bg-white/80">
      <iframe
        title={`Map of ${city}`}
        src={src}
        className="h-40 w-full"
        loading="lazy"
      />
    </div>
  );
}
