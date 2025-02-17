import React, { useState, useEffect } from "react";
import { Item } from "../types/item";
import { toast } from "react-toastify"; // Ensure to import toast

interface ItemEditFormProps {
  item: Item;
  onSave: (updatedItem: Item) => void;
  onCancel: () => void;
}

const ItemEditForm: React.FC<ItemEditFormProps> = ({ item, onSave, onCancel }) => {
  const [title, setTitle] = useState<string>(item.title);
  const [body, setBody] = useState<string>(item.body);

  useEffect(() => {
    setTitle(item.title);
    setBody(item.body);
  }, [item]);

  const handleSubmit = () => {
    // Validation based on the provided example
    if (!title) return toast.error("Enter title");
    if (title.length < 3) return toast.error("Title must be more than 3 letters");
    if (!body) return toast.error("Enter description");
    if (body.length < 5) return toast.error("Description must be more than 5 letters");

    const updatedItem = { ...item, title, body };
    onSave(updatedItem);
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2 p-2 border rounded w-full text-black"
        placeholder="Title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="mb-2 p-2 border rounded w-full text-black"
        placeholder="Body"
      ></textarea>

      <div className="mt-2 flex space-x-2 justify-end">
        <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded-sm">
          Save
        </button>
        <button onClick={onCancel} className="bg-gray-500 text-white p-2 rounded-sm">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ItemEditForm;
