import React from "react";

interface ItemFormProps {
  newTitle: string;
  newBody: string;
  setNewTitle: React.Dispatch<React.SetStateAction<string>>;
  setNewBody: React.Dispatch<React.SetStateAction<string>>;
  addItem: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({
  newTitle,
  newBody,
  setNewTitle,
  setNewBody,
  addItem,
}) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="p-2 w-full mb-2 text-black"
        placeholder="Title"
      />
      <textarea
        value={newBody}
        onChange={(e) => setNewBody(e.target.value)}
        className="p-2 w-full mb-4 text-black"
        placeholder="Body"
      />
      <button
        onClick={addItem}
        className="bg-blue-500 text-white p-2 w-full"
      >
        Add Item
      </button>
    </div>
  );
};

export default ItemForm;
