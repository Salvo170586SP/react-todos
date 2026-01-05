export default function FormTodo({
  handleSubmit,
  formData,
  setFormData,
  errors,
  handleFileChange,
  fileInputRef,
}) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col items-start justify-start gap-2 rounded-lg">
          <div className="space-y-2">
            <input
              id="title"
              placeholder="Titolo"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className={`${errors.title ? "border-red-500" : "border-zinc-200"} w-[500px] rounded border  bg-white p-2`}
            />
            {errors.title && (
              <span className="mt-1 text-sm text-red-500">
                {errors.title[0]}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <textarea
              id="content"
              placeholder="Descrizione"
              rows={5}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className={`${errors.content ? "border-red-500" : "border-zinc-200"} w-[500px] rounded border  bg-white p-2`}
            ></textarea>
            {errors.content && (
              <span className="mt-1 text-sm text-red-500">
                {errors.content[0]}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <input
              id="img_url"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="w-[500px] rounded border border-zinc-200 bg-white p-2"
            />
            {errors.img_url && (
              <span className="mt-1 text-sm text-red-500">
                {errors.img_url[0]}
              </span>
            )}
          </div>

          <div className="flex items-center">
            <label htmlFor="is_active">
              <input
                id="is_active"
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
                className="me-3"
              />
              Fatto
            </label>
          </div>

          <div className="flex w-full items-center justify-between">
            <button
              type="submit"
              className="mt-5 cursor-pointer rounded-lg bg-black p-2 font-semibold text-white"
            >
              Aggiungi
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
