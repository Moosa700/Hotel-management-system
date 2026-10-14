export default function RoomGallery({ images = [] }) {
  return (
    <div className="space-y-4">
      <img
        src={images[0]}
        alt="Room"
        className="h-[450px] w-full rounded-2xl object-cover shadow-lg"
      />

      <div className="grid grid-cols-3 gap-4">
        {images.slice(1).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Room ${index + 2}`}
            className="h-32 w-full rounded-xl object-cover shadow"
          />
        ))}
      </div>
    </div>
  );
}