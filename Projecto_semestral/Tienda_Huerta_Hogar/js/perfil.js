
document.getElementById('profileForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const updatedData = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value
  };

  localStorage.setItem('userProfile', JSON.stringify(updatedData));
  alert('Perfil actualizado');
});