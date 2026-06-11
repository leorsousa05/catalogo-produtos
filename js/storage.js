const STORAGE_KEY = 'lindex:favoritos';

function obterFavoritos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function salvarFavoritos(ids) {
  const unicos = [...new Set(ids)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(unicos));
  return unicos;
}

function alternarFavorito(id) {
  const favoritos = obterFavoritos();
  const idx = favoritos.indexOf(id);
  if (idx === -1) {
    favoritos.push(id);
  } else {
    favoritos.splice(idx, 1);
  }
  salvarFavoritos(favoritos);
  return favoritos;
}

function ehFavorito(id) {
  return obterFavoritos().includes(id);
}
