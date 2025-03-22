// src/components/EpicAdventures.jsx
function EpicAdventures() {
  const adventures = [
    { title: "Everest Trek", image: "https://www.worldatlas.com/upload/1c/ed/a9/shutterstock-2224412415.jpg" },
    { title: "Hiking Peak", image: "https://www.worldatlas.com/upload/1c/ed/a9/shutterstock-2224412415.jpg" },
    { title: "Annapurna", image: "https://www.worldatlas.com/upload/1c/ed/a9/shutterstock-2224412415.jpg" },
  ];

  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">Epic Adventures</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {adventures.map((adventure, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={adventure.image} alt={adventure.title} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{adventure.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EpicAdventures;