# 📝 Todo LaraReact

Applicazione **Todo List** sviluppata in **React** come frontend, collegata a un **backend API REST in Laravel**.

L’app consente di creare, visualizzare ed eliminare attività, con supporto a **upload immagini**, **flash messages** e **transizioni animate**.

---

## 🧱 Architettura

- **Frontend**: React + Tailwind CSS
- **Backend**: Laravel (API REST)
- **Comunicazione**: Axios (`multipart/form-data`)

Il backend **non è incluso** in questo repository e deve essere realizzato separatamente in **Laravel** seguendo le specifiche sotto indicate.

---

## 🚀 Funzionalità

- ✅ Creazione Todo (titolo, descrizione, immagine, stato)
- 📋 Visualizzazione lista Todo
- 🗑️ Eliminazione singola Todo
- ❌ Eliminazione di tutte le Todo
- 🔔 Flash messages di feedback
- 🎞️ Transizioni animate apertura/chiusura form
- 📱 UI responsive

---

## 🧑‍💻 Tecnologie utilizzate

### Frontend
- React
- React Hooks (`useState`, `useEffect`, `useRef`)
- Axios
- Tailwind CSS
- JavaScript ES6+

### Backend
- Laravel
- API REST
- Upload file con `multipart/form-data`

---

---

## 🔗 Backend API (Laravel)

Il frontend comunica con un backend Laravel da creare tramite il seguente endpoint base:

```js
"/api/todos"
```

### 📌 Endpoints richiesti

| Metodo | Endpoint | Descrizione |
|------|---------|------------|
| GET | `/api/todos` | Recupera tutte le todos |
| POST | `/api/todos` | Crea una nuova todo |
| DELETE | `/api/todos/{id}` | Elimina una todo |
| DELETE | `/api/todos/delete-all` | Elimina tutte le todo |

> ⚠️ L’endpoint `POST /api/todos` deve supportare **multipart/form-data** per l’upload delle immagini.

 
## ⚙️ Installazione Frontend

```bash
npm install
npm run dev
```

## 📌 Miglioramenti futuri

- Autenticazione utenti
- Stato globale (Context / Redux)
- Dark mode
- Testing
- Drag & Drop per ordinamento Todo
- Ai Generated

---

## 🧑‍🚀 Autore

Salvo – Web Developer

---
