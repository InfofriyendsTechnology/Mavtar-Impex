import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Heart, Award, CheckCircle2, ArrowRight } from "lucide-react";

const Craftsmanship = () => {
  return (
    <div className="space-y-16 py-12">
      
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold tracking-widest text-gold-600 uppercase">
          Artisan Heritage • Surat, Gujarat
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-emerald-950">
          The Art of the Loom & Zari
        </h1>
        <p className="text-base text-linen-600 max-w-2xl mx-auto font-light leading-relaxed">
          How Mavtar Impex unites modern multi-head computerized embroidery technology with age-old Indian royal textile craftsmanship.
        </p>
      </section>

      {/* Embedded Workshop Video */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="rounded-2xl overflow-hidden bg-emerald-950 p-4 sm:p-6 border border-gold-500/30 shadow-2xl">
          <video
            src="/workshop-process.mp4"
            controls
            playsInline
            poster="/products/royal-elephant-embroidery-detail.jpg"
            className="w-full max-h-[600px] object-contain rounded-xl mx-auto"
          />
          <div className="mt-4 text-center">
            <h3 className="font-serif text-xl font-bold text-white">
              Behind the Scenes: Stitching the Royal Haathi Motif
            </h3>
            <p className="text-xs text-gold-300 mt-1">
              Live footage of the computerized embroidery machine weaving thousands of zari & sequin threads into emerald linen.
            </p>
          </div>
        </div>
      </section>

      {/* Craft Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-emerald-950">
            Four Steps of Perfection
          </h2>
          <p className="text-sm text-linen-600 mt-1">
            Every tote bag passes through meticulous stages of craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Belgian Flax Linen",
              desc: "We exclusively source heavy-gsm natural flax linen that softens gracefully with age while retaining tensile strength.",
              img: "/products/natural-beige-tote.jpg",
            },
            {
              step: "02",
              title: "Computerized Precision",
              desc: "High-density multi-needle machines stitch intricate royal elephant, peacock, and floral motifs with microscopic accuracy.",
              img: "/products/royal-elephant-embroidery-detail.jpg",
            },
            {
              step: "03",
              title: "Velvet Applique & Zari",
              desc: "Gilded metallic threads and plush magenta velvet saddles are hand-cut and layered for authentic three-dimensional depth.",
              img: "/products/embroidery-loom-process.jpg",
            },
            {
              step: "04",
              title: "Hand-Assembly & Lining",
              desc: "Master tailors reinforce the boxy tote gussets, install water-resistant cotton linings, and test handle durability up to 10kg.",
              img: "/products/workshop-craftsmanship.jpg",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl overflow-hidden border border-linen-200 shadow-sm flex flex-col">
              <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-gold-600 font-serif text-2xl font-bold block">{item.step}</span>
                  <h3 className="font-serif text-lg font-bold text-emerald-950">{item.title}</h3>
                  <p className="text-xs text-linen-600 leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center bg-emerald-950 text-linen-100 rounded-2xl p-10 border border-gold-500/30 space-y-4">
        <h2 className="font-serif text-3xl font-bold text-white">Experience The Royal Linen Bag</h2>
        <p className="text-sm text-linen-300 max-w-md mx-auto">
          Own a piece of Indian textile royalty, handcrafted for everyday sustainable luxury.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-emerald-950 px-8 py-3.5 rounded font-bold text-sm tracking-wide transition-colors"
        >
          <span>Shop The Collection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
};

export default Craftsmanship;
