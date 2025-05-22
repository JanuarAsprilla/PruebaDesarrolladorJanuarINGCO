import type { User } from "../interface/user";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  users: User[];
  onDelete: (id: number) => void;
}

/**
 * UserTable con animaciones naturales usando framer-motion.
 */
export const UserTable = ({ users, onDelete }: Props) => {
  const filteredUsers = users.filter((user) => user.status);

  // Variantes para la animación de la tabla completa
  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  // Animación para las filas al hacer hover
  const rowHover = {
    rest: { backgroundColor: "transparent" },
    hover: { backgroundColor: "rgba(14, 165, 233, 0.1)" }, 
  };

  return (
    <motion.div
      className="mt-10 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={tableVariants}
    >
      <div className="sm:flex sm:items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-slate-800">Usuarios Activos</h2>
        <p className="text-xl text-slate-700">Total: {filteredUsers.length}</p>
      </div>

      <div className="overflow-x-auto rounded-xl shadow ring-1 ring-slate-200 bg-white">
        <table className="min-w-full text-slate-700 divide-y divide-slate-200">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Apellido</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Correo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.map((user) => (
              <motion.tr
                key={user.id}
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={rowHover}
                className="transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">{user.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      if (confirm(`¿Eliminar a ${user.firstName}?`)) {
                        onDelete(user.id);
                      }
                    }}
                    className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition shadow-sm hover:shadow-md cursor-pointer"
                  >
                    
                    Eliminar
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        <AnimatePresence>
          {filteredUsers.length === 0 && (
            <motion.div
              key="empty"
              className="p-6 text-center text-slate-400"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              No hay usuarios activos para mostrar.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
