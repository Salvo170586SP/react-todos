import { useRef, useState } from "react";
import axios from "axios";
const API_URL = "http://localhost:8080/api/todos";

export default function ModalEdit({ todo, handleUpdateTodo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: todo?.title || "",
    content: todo?.content || "",
    img_url: todo?.img_url || null,
    is_active: todo?.is_active || false,
  });

  const fileInputRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: todo?.title || "",
      content: todo?.content || "",
      img_url: todo?.img_url || null,
      is_active: todo?.is_active || false,
    });
    setErrors({});
    // Reset del file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Gestione specifica per il cambio file e preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, img_url: file });
    }
  };

  // Update todo
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    // Per l'update con file in Laravel, usa FormData e _method PUT
    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("content", formData.content || "");
    dataToSend.append("is_active", formData.is_active ? true : false);

    if (formData.img_url instanceof File) {
      dataToSend.append("img_url", formData.img_url);
    }
    try {
      const response = await axios.put(`${API_URL}/${todo.id}`, dataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Chiama il callback con la todo aggiornata
      handleUpdateTodo(response.data.todo);
      setIsOpen(false);
      setErrors({});
    } catch (error) {
      console.error("Errore nella creazione:", error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <>
      <button
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 hover:bg-zinc-200"
        onClick={handleToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-100 ease-in-out ${
          isOpen
            ? "visible bg-black/50 opacity-100"
            : "invisible bg-black/0 opacity-0"
        }`}
      >
        <div className="w-full max-w-[600px] space-y-3 rounded-lg bg-zinc-50 p-5 shadow-xl">
          <form onSubmit={handleUpdateSubmit} className="space-y-3">
            <div className="flex flex-col space-y-2">
              <label htmlFor="title">Titolo</label>
              <input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                type="text"
                className={`${errors.title ? "border-red-500" : "border-zinc-200"}  rounded border  bg-white p-2`}
              />
              {errors.title && (
                <span className="mt-1 text-sm text-red-500">
                  {errors.title[0]}
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="content">Descrizione</label>
              <textarea
                id="content"
                value={formData.content}
                rows={5}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                type="text"
                className={`${errors.content ? "border-red-500" : "border-zinc-200"} rounded border  bg-white p-2`}
              ></textarea>
              {errors.content && (
                <span className="mt-1 text-sm text-red-500">
                  {errors.content[0]}
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="img_url">Immagine esistente</label>

              {/* Preview immagine */}
              {todo.img_url ? (
                <img
                  src={"http://localhost:8080/storage/" + todo.img_url}
                  alt="Preview"
                  className="h-20 w-20 rounded-full border border-zinc-200 object-cover"
                />
              ) : null}

              <input
                id="img_url"
                ref={fileInputRef}
                onChange={handleFileChange}
                type="file"
                accept="image/*"
                className={`${errors.img_url ? "border-red-500" : "border-zinc-200"} rounded border  bg-white p-2`}
              />
              {errors.img_url && (
                <span className="mt-1 text-sm text-red-500">
                  {errors.img_url[0]}
                </span>
              )}
            </div>

            <div className="flex items-center">
              <label htmlFor="is_actives">
                <input
                  id="is_actives"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData({ ...formData, is_active: e.target.checked })
                  }
                  type="checkbox"
                  className="me-3"
                />
                Fatto
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="cursor-pointer rounded-lg bg-gray-200 p-2 text-black hover:bg-gray-300"
                onClick={handleToggle}
              >
                Chiudi
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-lg bg-black p-2 text-white"
              >
                Modifica
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
