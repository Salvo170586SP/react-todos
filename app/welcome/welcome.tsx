import { useEffect, useRef, useState } from "react";
import CardTodo from "../components/CardTodo";
import FleshMessages from "../components/FleshMessages";
import FormTodo from "../components/FormTodo";
import ModalDelete from "../components/ModalDelete";

import axios from "axios";

const API_URL = "http://localhost:8080/api/todos";

export function Welcome() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    img_url: null,
    is_active: false,
  });

  const [open, setOpen] = useState(true);
  const [data, setData] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [flashMessage, setFlashMessage] = useState("");
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchTodos();
  }, []);

  // Chiamata Api
  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data.todos);
      showFlash(response.data.message);
    } catch (error) {
      console.error("Errore nel caricamento:", error);
    }
  };

  // Show flash message
  const showFlash = (message) => {
    setFlashMessage(message);
    setTimeout(() => setFlashMessage(""), 3000);
  };

  // Create todo
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData([response.data.todo, ...data]);
      setFormData({ title: "", content: "", is_active: false, img_url: null });
      showFlash(response.data.message);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setErrors({});
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  // Delete todo
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      setData(data.filter((todo) => todo.id !== id));
      showFlash(response.data.message);
    } catch (error) {
      console.error("Errore nell'eliminazione:", error);
    } finally {
      setDeletingId(null);
    }
  };

  // Delete all todo
  const handleDeleteAll = async () => {
    try {
      const response = await axios.delete(`${API_URL}/delete-all`);
      setData([]);
      showFlash(response.data.message);
    } catch (error) {
      console.error("Errore nell'eliminazione:", error);
    }
  };

  // Update todo
  const handleUpdateTodo = (updatedTodo) => {
    setData(
      data.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    showFlash(data.message);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, img_url: e.target.files[0] });
  };

  return (
    <main className="flex h-screen">
      <div
        className={`flex flex-col items-start justify-between border-e border-zinc-200 bg-zinc-100 p-6 shadow-lg`}
      >
        <div className="space-y-5">
          <button onClick={() => setOpen(!open)} className="cursor-pointer ">
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            )}
          </button>
          <div className={`${open ? "" : "hidden"}`}>
            <h2 className="mb-5 text-4xl font-bold">Todo LaraReact</h2>
            <FormTodo
              handleSubmit={handleSubmit}
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              handleFileChange={handleFileChange}
              fileInputRef={fileInputRef}
            />
            {flashMessage && <FleshMessages flashMessage={flashMessage} />}
          </div>
        </div>

        <div className={`${open ? "" : "hidden"}`}>
          {data && data.length > 0 && (
            <ModalDelete
              text="Elimina tutti i todos"
              textButton="Elimina Tutti"
              handleDelete={handleDeleteAll}
            />
          )}
        </div>
      </div>

      <div className="flex w-full p-5">
        <div className="w-full space-y-5 overflow-auto px-2">
          {data && data.length > 0 ? (
            data.map((todo) => (
              <CardTodo
                key={todo.id}
                todo={todo}
                handleDelete={handleDelete}
                handleUpdateTodo={handleUpdateTodo}
              />
            ))
          ) : (
            <div className="flex h-full items-center justify-center font-medium text-zinc-500">
              <div className="flex flex-col items-center justify-center text-xl">
                Scrivi la tua prima lista
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mt-5 size-15"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
