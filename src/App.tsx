import axios from "axios";
import { useEffect, useState } from "react";
import type { User } from "./interface/user.ts";
import { UserTable } from "./components/UserTable";
import { UserForm } from "./components/UserForm";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Componente principal de la aplicación.
 * 
 * Maneja el estado de usuarios, controla el modal para agregar usuarios,
 * y maneja las funciones de agregar y eliminar usuarios.
 */
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);

  /**
   * Carga la lista inicial de usuarios desde una API externa
   * cuando el componente se monta.
   */
  useEffect(() => {
    axios
      .get<User[]>("https://api.fake-rest.refine.dev/users")
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error("Error al cargar usuarios:", err);
      });
  }, []);

  /**
   * Agrega un nuevo usuario al estado.
   * Cierra el modal automáticamente tras agregar.
   * 
   * @param newUser - Usuario sin id ni status, estos se asignan aquí.
   */
  const addUser = (newUser: Omit<User, "id" | "status">) => {
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const userToAdd: User = { ...newUser, id, status: true };
    setUsers((prevUsers) => [...prevUsers, userToAdd]);
  };

  /**
   * Elimina un usuario del estado según su ID.
   * 
   * @param id - Identificador del usuario a eliminar.
   */
  const deleteUser = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  // Variantes para la animación del modal con framer-motion
  const modalBackdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalContentVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  };

  return (
    <div className="app-container p-6 text-white bg-gray-400 min-h-screen">
      <div className=" grid grid-cols-[1fr_200px]">
      <h1 className="text-4xl center   font-bold flex items-center gap-2 mb-6 select-none">
        Lista de Usuarios
      </h1>

      {/* Botón para abrir el modal */}
      <motion.button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-haspopup="dialog"
        aria-expanded={showModal}
      >
        Agregar usuario
      </motion.button>
      </div>

      {/* Modal animado */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 backdrop-blur bg-white/30 flex justify-center items-center z-50"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalBackdropVariants}
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
          >
            <motion.div
              className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md relative"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={modalContentVariants}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-5 text-xl font-bold text-gray-800 hover:text-gray-900 cursor-pointer focus:outline-none"
                aria-label="Cerrar modal"
              >
                X
              </button>
              
              <UserForm
                onAdd={(user) => {
                  addUser(user);
                  setShowModal(false);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabla con usuarios activos */}
      <div className="mt-10">
        <UserTable users={users} onDelete={deleteUser} />
      </div>
    </div>
  );
}

export default App;
