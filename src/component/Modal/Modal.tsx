interface ModalProps {
  title: string;
  description: string;
  onSave: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Modal = ({ title, description, onSave, onClose, onTitleChange, onDescriptionChange }: ModalProps) => {
  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="modal-content bg-white p-4 rounded-md shadow-lg">
        <h2 className="text-lg mb-2">Edit Task</h2>
        <form onSubmit={onSave}>
          <div className="field mb-2.5">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Edit title"
              value={title}
              onChange={onTitleChange}
              className="border border-black border-solid rounded-md p-1 w-full"
            />
          </div>

          <div className="field mb-2.5">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              placeholder="Edit description"
              value={description}
              onChange={onDescriptionChange}
              className="border border-black border-solid rounded-md p-1 w-full"
            />
          </div>

          <div className="flex justify-between">
            <button type="submit" className="cursor-pointer bg-green-500 rounded-md py-1.5 px-4 text-white">
              Save
            </button>
            <button type="button" onClick={onClose} className="cursor-pointer bg-gray-300 rounded-md py-1.5 px-4">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
