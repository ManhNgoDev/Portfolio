"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <main className="min-h-screen">

      <nav className="fixed top-0 w-full backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">


          <a href="#home" className="text-white font-bold text-xl tracking-wider">
            Portfolio
          </a>

          <ul className="hidden md:flex space-x-10 text-white/80 text-sm font-medium">
            <li><Link href="#home" className="hover:text-white transition">Home</Link></li>
            <li><Link href="#about" className="hover:text-white transition">About</Link></li>
            <li><Link href="#projects" className="hover:text-white transition">Projects</Link></li>
            <li><Link href="#skills" className="hover:text-white transition">Skills</Link></li>
            <li><Link href="#contact" className="hover:text-white transition">Contact</Link></li>
          </ul>

          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>

        </div>

        {open && (
          <div className="md:hidden bg-black/80 backdrop-blur-md px-6 py-4 space-y-4 text-white">
            <a href="#home" className="block">Home</a>
            <a href="#about" className="block">About</a>
            <a href="#projects" className="block">Projects</a>
            <a href="#skills" className="block">Skills</a>
            <a href="#contact" className="block">Contact</a>
          </div>
        )}
      </nav>

      {/* Home Section */}
      <motion.section
        id="home"
        className="min-h-screen flex flex-col items-center justify-center text-white pb-20">
        <div className="text-center px-6">
          <img
            className="w-50 h-50 rounded-full border-4 border-white/70 mb-6 mx-auto"
            src="/images/avatar.jpg"
            alt="Avatar"
          />
          <h1 className="text-4xl font-bold text-white mt-4">Hi, I'm Manh Ngo</h1>
          <h2 className="text-xl text-gray-400 mt-2">And I'm a <span className="text-blue-500">Mobile Developer</span></h2>
          <p className="text-gray-400 mt-4 text-lg">
            I create engaging mobile experiences with a focus on performance and user satisfaction.
          </p>
        </div>

        <div className="mt-8 flex gap-5">
          <Link href="https://www.facebook.com/ngo.van.manh.612964/"
            className="w-10 h-10 flex items-center justify-center rounded-full border-3 border-blue-500/50">
            <img src="/icons/facebook.svg" alt="Facebook" width={20} height={20} />
          </Link>

          <Link href="https://www.linkedin.com/in/manh-ngo-3b887b365/"
            className="w-10 h-10 flex items-center justify-center rounded-full border-3 border-blue-500/50">
            <img src="/icons/linkedin.svg" alt="LinkedIn" width={20} height={20} />
          </Link>

          <Link href="https://x.com/ngomanhdz"
            className="w-10 h-10 flex items-center justify-center rounded-full border-3 border-blue-500/50">
            <img src="/icons/twitter.svg" alt="Twitter" width={20} height={20} />
          </Link>
        </div>

        <div className="mt-10">
          <Link
            href="/ManhNgoCV.pdf"
            download="ManhNgoCV.pdf"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-blue-500/50 shadow-lg transition"
          >
            Download CV
          </Link>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className=" flex items-center justify-center text-white px-6 pb-20">
        <div className="max-w-3xl w-full bg-white/5 rounded-2xl p-10 border border-white/10">
          <h2 className="text-white font-bold text-2xl mb-4">About Me</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            I'm Manh Ngo, a Mobile Developer passionate about building smooth and user-friendly applications.
            I work mainly with Flutter and Android (Java/Kotlin), and I also have experience with web development
            with React and Next.js. I enjoy learning new technologies, improving app performance, and creating
            personal projects. My goal is to become a well-rounded developer who can build complete and impactful products.
          </p>
        </div>
      </motion.section>

      {/* Projects Section */}
      <section id="projects" className="flex items-center justify-center text-white px-6 pb-20">
        <div>
          <h1 className="text-3xl font-bold mb-4 justify-center">My Projects</h1>
          
        </div>
      </section>
    </main>
  );
}