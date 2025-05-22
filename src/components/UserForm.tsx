import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { User } from "../interface/user";

// Función para agregar usuario sin id ni status
interface Props {
  onAdd: (user: Omit<User, "id" | "status">) => void;
}

export const UserForm = ({ onAdd }: Props) => {
  // Estados para controlar valores de inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // Estado para mostrar mensaje de éxito
  const [successMsg, setSuccessMsg] = useState("");
  // Referencia al primer input para enfocar automáticamente
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Cuando cambia successMsg, se enfoca el input nombre para mejor UX
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [successMsg]);

  // Maneja el evento submit del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica de correo electrónico con regex
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      alert("Por favor ingresa un correo válido.");
      return;
    }

    // Validar que ningún campo esté vacío o con solo espacios
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // Si pasa las validaciones, se llama a onAdd para agregar el usuario
    onAdd({ firstName, lastName, email });

    // Se muestra mensaje de éxito
    setSuccessMsg("Usuario agregado correctamente.");

    // Limpiar campos para nueva entrada
    setFirstName("");
    setLastName("");
    setEmail("");

    // Limpiar mensaje de éxito después de 3 segundos
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg ring-1 ring-slate-200 overflow-hidden"
    >
      {/* Encabezado con ícono y título */}
      <div className="bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold tracking-wide ">Agregar nuevo usuario</h2>
        </div>
      </div>

      {/* Formulario con inputs controlados */}
      <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6">
        {/* Input para Nombre */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Nombre
          </label>
          <input
            id="firstName"
            ref={firstInputRef}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Ingrese nombre"
            required
            className="w-full rounded-md border border-slate-300 px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        {/* Input para Apellido */}
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Apellido
          </label>
          <input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Ingrese apellido"
            required
            className="w-full rounded-md border border-slate-300 px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        {/* Input para Correo electrónico */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese correo"
            type="email"
            required
            className="w-full rounded-md border border-slate-300 px-4 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        {/* Botón para enviar formulario con animación */}
        <div className="flex justify-end">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2 rounded-md transition shadow-md hover:shadow-lg"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Agregar usuario
          </motion.button>
        </div>

        {/* Mensaje de éxito animado que desaparece */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-emerald-50 text-emerald-700 rounded-md text-sm border border-emerald-200 mt-4 shadow-sm"
            >
              {successMsg}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};
