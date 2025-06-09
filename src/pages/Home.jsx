import { motion } from "framer-motion";

const tools = [
  { id: 1, name: "Resume Optimizer", desc: "Level up your resume with AI-enhanced feedback in seconds" },
  { id: 2, name: "AI Cover Letter Generator", desc: "Auto-write fire cover letters based on your resume + job post." },
  { id: 3, name: "Instagram Caption Wizard", desc: "Drop banger captions powered by viral AI patterns" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-20 flex flex-col items-center">
      
      {/* Glowing Pulse Background for Headline */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-600 blur-3xl mix-blend-screen"
        aria-hidden="true"
      />

      {/* Headline */}
      <motion.h1
        initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className="relative z-10 text-6xl font-extrabold text-center max-w-3xl mb-12"
      >
        This is dope, check this out.
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.7 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-10 text-center max-w-xl text-gray-400 mb-16"
      >
        Launch your AI SaaS toolkit today. No backend. No ads. No excuses.
      </motion.p>

      {/* Tool Cards */}
      <div className="relative z-10 flex justify-center gap-8 flex-wrap max-w-5xl">
        {tools.map(({ id, name, desc }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 60, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 110, damping: 14 }}
            whileHover={{ scale: 1.1, rotate: 3, boxShadow: "0 0 20px rgb(59 130 246)" }}
            className="bg-gray-800 p-8 rounded-2xl max-w-xs cursor-pointer shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-3">{name}</h3>
            <p className="text-gray-400">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
