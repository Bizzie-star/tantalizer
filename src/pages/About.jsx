import React from "react";
import { Link } from "react-router-dom";

// About.jsx - Tantalizers About Page
// Drop this file in: src/pages/About.jsx
// Uses Tailwind CSS for styling. No header/footer included (import your app header separately).

export default function About() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* HERO */}
      <section className="bg-[url('/assets/about-hero.jpg')] bg-cover bg-center"> 
        <div className="backdrop-brightness-75">
          <div className="max-w-6xl mx-auto px-6 py-28 text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">About B's Kitchen</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl">
              We bring delicious, ready-to-eat meals and memorable dining experiences to the campus. Our mission is simple: great food, served with love.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to="/menu" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-3 rounded-lg shadow">See our menu</Link>
              <a href="#contact" className="inline-block bg-white/10 hover:bg-white/20 text-white font-medium px-5 py-3 rounded-lg">Contact us</a>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS / MISSION */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-neutral-700">
              To provide tasty, affordable meals while supporting local farmers and maintaining consistent quality across every location.
            </p>
          </div>

          <div className="col-span-2 grid grid-cols-3 gap-4">
           
           
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="text-3xl font-bold">5+</div>
              <div className="text-sm text-neutral-500 mt-1">Meals served monthly</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow">
              <div className="text-3xl font-bold">2 yrs</div>
              <div className="text-sm text-neutral-500 mt-1">Heritage & flavour</div>
            </div>
          </div>
        </div>
      </section>

      {/* HISTORY / TIMELINE */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold">Our Story</h3>
          <p className="mt-3 text-neutral-600 max-w-3xl">
            Founded by passionate food-lovers, Tantalizers started as a single restaurant focused on consistent taste and great service. Over the years we expanded, while staying true to our core values — quality ingredients, friendly service and accessible pricing.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="p-6 border rounded-lg">
              <h4 className="font-semibold">1994</h4>
              <p className="text-sm text-neutral-600 mt-2">First store opened — a neighbourhood favourite from day one.</p>
            </article>
            <article className="p-6 border rounded-lg">
              <h4 className="font-semibold">2005</h4>
              <p className="text-sm text-neutral-600 mt-2">Expanded into multiple cities and introduced new product lines.</p>
            </article>
            <article className="p-6 border rounded-lg">
              <h4 className="font-semibold">2018</h4>
              <p className="text-sm text-neutral-600 mt-2">Modernised our menu and launched delivery services nationwide.</p>
            </article>
          </div>
        </div>
      </section>

      {/* VALUES GRID */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-2xl font-bold">What we stand for</h3>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: 'Quality', desc: 'Only the best ingredients.' },
            { title: 'Community', desc: 'Support local suppliers.' },
            { title: 'Integrity', desc: "Honest prices, honest food." },
            { title: 'Hospitality', desc: 'Warm service every time.' }
          ].map((v) => (
            <div key={v.title} className="bg-white p-6 rounded-lg shadow-sm">
              <h5 className="font-semibold">{v.title}</h5>
              <p className="text-sm text-neutral-500 mt-2">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM HIGHLIGHT */}
      <section className="bg-neutral-100 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold">Meet the Team</h3>
          <p className="text-neutral-600 mt-2">A small team with a big appetite for great food and better service.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow">
              <img src="/assets/team-1.jpg" alt="Founder" className="mx-auto h-28 w-28 object-cover rounded-full" />
              <h4 className="mt-4 font-semibold">Ayo Ade</h4>
              <p className="text-sm text-neutral-500">Founder & CEO</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow">
              <img src="/assets/team-2.jpg" alt="COO" className="mx-auto h-28 w-28 object-cover rounded-full" />
              <h4 className="mt-4 font-semibold">Chinelo Okafor</h4>
              <p className="text-sm text-neutral-500">Operations</p>
            </div>

            <div className="bg-white rounded-lg p-6 text-center shadow">
              <img src="/assets/team-3.jpg" alt="Head Chef" className="mx-auto h-28 w-28 object-cover rounded-full" />
              <h4 className="mt-4 font-semibold">Chef Emeka</h4>
              <p className="text-sm text-neutral-500">Head Chef</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold">Get in touch</h3>
            <p className="text-neutral-600 mt-2">Questions about franchising, corporate catering or partnerships? We’d love to hear from you.</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <div className="font-semibold">Email</div>
                <div className="text-neutral-600">info@tantalizers.com</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="font-semibold">Phone</div>
                <div className="text-neutral-600">+234 800 000 0000</div>
              </div>
              <div className="mt-4">
                <a href="/contact" className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md">Contact form</a>
              </div>
            </div>
          </div>

          <div>
            <form className="bg-white p-6 rounded-lg shadow">
              <label className="block text-sm font-medium">Name</label>
              <input className="mt-2 w-full border rounded px-3 py-2" placeholder="Your name" />

              <label className="block text-sm font-medium mt-4">Email</label>
              <input className="mt-2 w-full border rounded px-3 py-2" placeholder="you@example.com" />

              <label className="block text-sm font-medium mt-4">Message</label>
              <textarea className="mt-2 w-full border rounded px-3 py-2" rows={4} placeholder="How can we help?"></textarea>

              <div className="mt-4 text-right">
                <button type="button" className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded">Send</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold">Frequently asked</h3>
          <div className="mt-6 grid gap-4">
            <details className="p-4 border rounded">
              <summary className="font-medium">Do you offer delivery?</summary>
              <p className="mt-2 text-neutral-600">Yes — delivery is available in most cities. Check our Delivery page for details.</p>
            </details>

            <details className="p-4 border rounded">
              <summary className="font-medium">How do I franchise?</summary>
              <p className="mt-2 text-neutral-600">Visit our Franchise page to view requirements and apply online.</p>
            </details>
          </div>
        </div>
      </section>

      {/* SIMPLE FOOTER NOTE (light) */}
      <footer className="mt-12 bg-neutral-900 text-white py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">© {new Date().getFullYear()} Tantalizers. All rights reserved.</div>
          <div className="flex gap-4 text-sm">
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="/terms" className="hover:underline">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
