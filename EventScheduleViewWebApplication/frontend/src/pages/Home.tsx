import React from 'react';

const events = [
  {
    id: 1,
    title: "Underground's Parasite Festival",
    date: '2025-08-10',
    image: '/sample_event1.jpg',
    bar: 'Bar Blue',
  },
  {
    id: 2,
    title: 'SUMMER PARTY',
    date: '2025-08-20',
    image: '/sample_event2.jpg',
    bar: '菜コロ',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* ヘッダー */}
      <header className="w-full px-4 py-6 flex items-center justify-between bg-black/80 border-b border-white/10">
        <h1 className="text-3xl font-black tracking-wide">DJ BAR EVENT PORTAL</h1>
        <nav className="space-x-8 text-lg font-medium">
          <a href="#" className="hover:text-pink-500">
            Home
          </a>
          <a href="#" className="hover:text-pink-500">
            イベント
          </a>
          <a href="#" className="hover:text-pink-500">
            DJ
          </a>
          <a href="#" className="hover:text-pink-500">
            BAR
          </a>
          <a href="#" className="hover:text-pink-500">
            ログイン
          </a>
        </nav>
      </header>
      {/* メイン */}
      <main className="container mx-auto px-4 py-12">
        <section>
          <h2 className="text-2xl font-bold mb-8 tracking-tight border-l-4 border-pink-500 pl-4">
            今後の注目イベント
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="relative group rounded-2xl overflow-hidden shadow-xl bg-white/10"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/70 px-6 py-4 flex flex-col gap-1">
                  <span className="text-pink-400 text-xs font-bold">{event.date}</span>
                  <span className="text-xl font-bold">{event.title}</span>
                  <span className="text-gray-200 text-sm">{event.bar}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      {/* フッター */}
      <footer className="bg-black/90 border-t border-white/10 py-6 text-center text-gray-400 mt-20">
        &copy; 2025 DJ BAR EVENT PORTAL
      </footer>
    </div>
  );
}
