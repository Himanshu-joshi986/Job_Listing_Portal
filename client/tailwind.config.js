/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0b0b0f",
          900: "#0f0f16",
          850: "#12121a",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(124,58,237,0.25), 0 0 40px rgba(59,130,246,0.10)",
        "glow-strong":
          "0 0 0 1px rgba(124,58,237,0.35), 0 0 65px rgba(59,130,246,0.18)",
      },
      backgroundImage: {
        "neon-radial":
          "radial-gradient(600px circle at var(--mx,50%) var(--my,40%), rgba(59,130,246,0.18), transparent 40%), radial-gradient(900px circle at 20% 15%, rgba(124,58,237,0.18), transparent 45%), radial-gradient(900px circle at 80% 70%, rgba(34,211,238,0.10), transparent 45%)",
        "neon-conic":
          "conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,0.55), rgba(124,58,237,0.55), rgba(34,211,238,0.35), rgba(59,130,246,0.55))",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

