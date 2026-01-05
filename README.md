import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import CardTodo from '../components/CardTodo';
import FleshMessages from '../components/FleshMessages';

export default function Welcomes({ todos }) {
    const { data, setData, post, errors } = useForm({
        title: '',
        content: '',
        img_url: null,
        is_active: false,
    });

    const { props } = usePage();
    const [showFlash, setShowFlash] = useState(false);
    const fileInputRef = useRef(null);

    const flashMessage = props.flash;

    useEffect(() => {
        if (flashMessage?.success || flashMessage?.error) {
            setShowFlash(true);
            const timer = setTimeout(() => {
                setShowFlash(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    const handleFileChange = (e) => {
        setData('img_url', e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/todos/store', {
            onSuccess: () => {
                setData({ title: '', content: '', is_active: false, img_url: null });
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Sei sicuro di voler eliminare questo todo?')) {
            router.delete(`/todos/delete/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const handleDeleteAll = () => {
        if (confirm('Sei sicuro di voler eliminare tutti i todos?')) {
            router.delete(`/todos/deleteAll`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex h-screen">
                <div className="mx-5 flex flex-col items-start justify-between border-e border-zinc-200 bg-zinc-50 p-6">
                    <div>
                        <h2 className="mb-5 text-4xl font-bold">Todo LaraReact</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5 flex flex-col items-start justify-start gap-2 rounded-lg">
                                <input
                                    id="title"
                                    placeholder="Titolo"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    type="text"
                                    className="w-[500px] rounded border border-zinc-200 bg-white p-2"
                                />
                                {errors.title && <span className="text-sm text-red-500">{errors.title}</span>}

                                <textarea
                                    id="content"
                                    placeholder="Descrizione"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    rows={5}
                                    className="w-[500px] rounded border border-zinc-200 bg-white p-2"
                                ></textarea>
                                {errors.content && <span className="text-sm text-red-500">{errors.content}</span>}

                                <input
                                    id="img_url"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    type="file"
                                    className="w-[500px] rounded border border-zinc-200 bg-white p-2"
                                />
                                {errors.img_url && <span className="text-sm text-red-500">{errors.img_url}</span>}

                                <div className="flex items-center">
                                    <label htmlFor="is_active">
                                        <input
                                            id="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            type="checkbox"
                                            className="me-3"
                                        />
                                        Fatto
                                    </label>
                                    {errors.is_active && <span className="text-sm text-red-500">{errors.is_active}</span>}
                                </div>

                                <div className="flex w-full items-center justify-between">
                                    <button type="submit" className="mt-5 cursor-pointer rounded-lg bg-black p-2 font-semibold text-white">
                                        Aggiungi
                                    </button>
                                    {showFlash && flashMessage?.success && <FleshMessages flashMessage={flashMessage} />}
                                </div>
                            </div>
                        </form>
                    </div>
                    {todos && todos.length > 0 && (
                        <button
                            onClick={handleDeleteAll}
                            className="mt-5 flex cursor-pointer items-center gap-2 rounded-lg bg-red-500 p-2 text-xs font-semibold text-white uppercase"
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
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                            </svg>
                            Elimina Tutti
                        </button>
                    )}
                </div>

                <div className="flex w-full p-5">
                    <div className="w-full space-y-5 overflow-auto px-2">
                        {todos && todos.length > 0 ? (
                            todos.map((todo) => <CardTodo key={todo.id} todo={todo} onDelete={handleDelete} />)
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
            </div>
        </>
    );
}
