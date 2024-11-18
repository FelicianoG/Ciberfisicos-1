import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    // Aquí puedes redirigir al usuario o realizar otra acción después de la eliminación.
    window.location.reload(); // Por ejemplo, recargar la página o redirigir a la página de inicio
  };

  return (
    <button onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
