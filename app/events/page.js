"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [closing, setClosing] = useState(false);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    fetch("/api/admin/events")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load events");
        return res.json();
      })
      .then((data) => {
        const withStatus = data.map((e) => ({
          ...e,
          isUpcoming: new Date(e.date) >= new Date(),
        }));
        setEvents(withStatus);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let list = [...events];
    if (filter === "all") {
      const up = list
        .filter((e) => e.isUpcoming)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      const past = list
        .filter((e) => !e.isUpcoming)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      list = [...up, ...past];
    } else if (filter === "upcoming") {
      list = list
        .filter((e) => e.isUpcoming)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      list = list
        .filter((e) => !e.isUpcoming)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setFiltered(list);
  }, [events, filter]);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const openModal = (evt, index) => {
    const cardElement = document.getElementById(`event-card-${index}`);
    if (cardElement) {
      const rect = cardElement.getBoundingClientRect();
      setCardPosition({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      });
    }
    setClosing(false);
    setSelectedEvent(evt);
  };

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setSelectedEvent(null);
      setClosing(false);
    }, 400);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 bg-black text-yellow-400">
        Loading events…
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-64 bg-black text-red-500">
        {error}
      </div>
    );

  return (
    <main className="bg-gradient-to-b from-black via-gray-900 to-black text-white min-h-screen px-6 py-12">
      <Link
        href="/"
        className="flex items-center text-yellow-400 mb-6 hover:text-yellow-200 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-lg">Back to Home</span>
      </Link>

      <h1 className="text-5xl font-extrabold text-yellow-400 text-center mb-8">
        Vision Events
      </h1>

      <div className="flex justify-center space-x-3 mb-10">
        {["all", "upcoming", "past"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              filter === cat
                ? "bg-yellow-400 text-black shadow-lg"
                : "bg-gray-800 text-yellow-300 hover:bg-yellow-500"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <section className="relative max-w-3xl mx-auto space-y-14">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-500 -translate-x-1/2"></div>
        {filtered.map((evt, i) => (
          <div
            key={evt.id || i}
            className={`flex w-full items-start ${
              i % 2 === 0 ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div className="w-1/2" />
            <div className="relative w-1/2">
              <span className="absolute left-[-6px] top-2 w-4 h-4 bg-yellow-500 rounded-full"></span>
              <div
                id={`event-card-${i}`}
                onClick={() => openModal(evt, i)}
                className="bg-gray-900 border-2 border-yellow-500 rounded-lg p-6 ml-8 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {evt.image && (
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-36 object-cover rounded mb-4"
                  />
                )}
                <div className="flex justify-between items-center mb-2">
                  <time className="text-sm text-yellow-300">{formatDate(evt.date)}</time>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      evt.isUpcoming ? "bg-green-600 text-black" : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {evt.isUpcoming ? "Upcoming" : "Past"}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-yellow-400 mb-2">{evt.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{evt.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{evt.location}</span>
                  {evt.isUpcoming && evt.registrationLink && (
                    <Link href={evt.registrationLink} target="_blank" className="text-yellow-400 hover:underline">
                      Register →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {selectedEvent && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 ${
            closing ? "fade-out" : "fade-in"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-gray-900 rounded-lg w-full max-w-2xl overflow-auto relative p-6 ${
              closing ? "modal-scale-out" : "modal-scale-in"
            }`}
            style={{ 
              maxHeight: "85vh",
              '--card-x': `${cardPosition.x}px`,
              '--card-y': `${cardPosition.y}px`,
              '--card-width': `${cardPosition.width}px`,
              '--card-height': `${cardPosition.height}px`
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-200 transition text-4xl z-10"
            >
              &times;
            </button>

            {selectedEvent.image && (
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded mb-6"
              />
            )}

            <h2 className="text-3xl font-bold text-yellow-400 mb-2">{selectedEvent.title}</h2>
            {selectedEvent.subtitle && <p className="text-yellow-300 italic mb-4">{selectedEvent.subtitle}</p>}

            <time className="block text-sm text-yellow-300 mb-4">
              {formatDate(selectedEvent.date)} {selectedEvent.startTime && `• ${selectedEvent.startTime}`}
              {selectedEvent.endTime && ` - ${selectedEvent.endTime}`}
            </time>

            {selectedEvent.locationLink ? (
              <a href={selectedEvent.locationLink} target="_blank" className="text-yellow-400 hover:underline mb-6 block">
                {selectedEvent.location}
              </a>
            ) : (
              <p className="text-gray-400 mb-6">
                <strong>Location:</strong> {selectedEvent.location}
              </p>
            )}

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">Overview</h3>
              <p className="text-gray-300 mb-2">{selectedEvent.description}</p>
              {selectedEvent.purpose && (
                <p className="text-gray-300 mb-1">
                  <strong>Purpose:</strong> {selectedEvent.purpose}
                </p>
              )}
              {selectedEvent.theme && (
                <p className="text-gray-300 mb-1">
                  <strong>Theme:</strong> {selectedEvent.theme}
                </p>
              )}
              {selectedEvent.targetAudience && (
                <p className="text-gray-300">
                  <strong>Audience:</strong> {selectedEvent.targetAudience}
                </p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">Agenda & Schedule</h3>
              {Array.isArray(selectedEvent.schedule) ? (
                <ul className="list-disc list-inside text-gray-300">
                  {selectedEvent.schedule.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.time}</strong>: {item.activity}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300">Details coming soon.</p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">Host</h3>
              <p className="text-gray-300">{selectedEvent.host || "TBA"}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">Organizer Contact</h3>
              {selectedEvent.organizerEmail && (
                <p className="text-gray-300 mb-1">
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${selectedEvent.organizerEmail}`} className="text-yellow-300 hover:underline">
                    {selectedEvent.organizerEmail}
                  </a>
                </p>
              )}
              {selectedEvent.organizerPhone && (
                <p className="text-gray-300 mb-1">
                  <strong>Phone:</strong>{" "}
                  <a href={`tel:${selectedEvent.organizerPhone}`} className="text-yellow-300 hover:underline">
                    {selectedEvent.organizerPhone}
                  </a>
                </p>
              )}
              {!selectedEvent.organizerEmail && !selectedEvent.organizerPhone && (
                <p className="text-gray-300">Contact information coming soon.</p>
              )}
            </div>

            {selectedEvent.registrationLink && (
              <a
                href={selectedEvent.registrationLink}
                target="_blank"
                className="inline-block px-6 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition"
              >
                Register Now
              </a>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes modalScaleIn {
          0% {
            transform: translate(calc(var(--card-x) - 50vw + var(--card-width) / 2), calc(var(--card-y) - 50vh + var(--card-height) / 2)) scale(0.2);
            opacity: 0;
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
        }
        @keyframes modalScaleOut {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(var(--card-x) - 50vw + var(--card-width) / 2), calc(var(--card-y) - 50vh + var(--card-height) / 2)) scale(0.2);
            opacity: 0;
          }
        }
        .fade-in { 
          animation: fadeIn 400ms ease-out forwards; 
        }
        .fade-out { 
          animation: fadeOut 400ms ease-in forwards; 
        }
        .modal-scale-in { 
          animation: modalScaleIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards; 
        }
        .modal-scale-out { 
          animation: modalScaleOut 400ms cubic-bezier(0.36, 0, 0.66, -0.56) forwards; 
        }
      `}</style>
    </main>
  );
}