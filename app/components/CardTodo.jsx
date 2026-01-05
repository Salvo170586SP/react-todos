import { useState } from 'react';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';

export default function CardTodo({ todo, handleDelete, handleUpdateTodo }) {
    const [isShow, setIsShow] = useState(false);
    const handleShow = () => {
        setIsShow(!isShow);
    };

    return (
        <>
            <div
                className={`${isShow ? 'h-[300px]' : 'h-[90px]'} w-full overflow-hidden rounded-2xl border border-blue-100 bg-gray-50 p-4 text-black transition-all duration-500 ease-in-out hover:shadow`}
            >
                <div className="flex w-full items-center justify-between">
                    <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className="font-bold">
                                {todo.is_active ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                )}
                            </div>
                            {todo.img_url ? (
                                <img src={`http://localhost:8080/storage/${todo.img_url}`} alt={todo.title} className="me-5 h-15 w-15 rounded-full object-cover shadow" />
                            ) : (
                                <div className="flex h-15 w-15 items-center justify-center rounded-full bg-white border border-zinc-200 object-cover shadow">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>

                        <div className="mx-5 flex w-full">
                            <h3 className="font-bold uppercase">{todo.title}</h3>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <ModalEdit todo={todo} handleUpdateTodo={handleUpdateTodo} />
                        <ModalDelete text="Vuoi eliminare la Todo?" handleDelete={() => handleDelete(todo.id)} /> 
                        <button
                            className="flex h-10 w-10  cursor-pointer items-center justify-center rounded-full border border-zinc-300 bg-white hover:bg-zinc-100"
                            onClick={handleShow}
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
                                    d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="mt-5 h-[180px] overflow-auto rounded-xl border border-zinc-300 bg-white p-2 text-zinc-500">{todo.content ? todo.content  : 'nessuna descrizione'}</div>
            </div>
        </>
    );
}
