import React, { useState } from "react";
import { Item } from "../types/item";
import { TrashIcon, PencilAltIcon, SearchIcon } from '@heroicons/react/solid';
import ItemEditForm from "./itemEditForm";
import { confirmDelete } from "../utils/deleteConfirmation";
interface ItemListProps {
  items: Item[];
  deleteItem: (id: number) => void;
  updateItem: (id: number, updatedItem: Item) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, deleteItem, updateItem }) => {
  const [editMode, setEditMode] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setSortOrder(event.target.value as "asc" | "desc" | "none");

  const sortedItems = items
    .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "asc" ? a.title.localeCompare(b.title) : sortOrder === "desc" ? b.title.localeCompare(a.title) : 0
    );

  return (
    <div>
      {/* Sorting and Search Options */}
      <div className="mb-4 flex space-x-2 justify-between">
        <select onChange={handleSortChange} value={sortOrder} className="p-2 bg-gray-200 text-gray-800 rounded">
          <option value="none">Sort by Title</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title"
            className="p-2 w-full pl-10 border rounded text-black"
          />
          <SearchIcon className="h-5 w-5 text-gray-500 absolute right-2 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {sortedItems.map((item) => (
        <div key={item.id} className="mb-4 p-4 border border-white rounded text-white bg-black-100">
          {editMode === item.id ? (
            <ItemEditForm
              item={item}
              onSave={(updatedItem) => {
                updateItem(updatedItem.id, updatedItem);
                setEditMode(null);
              }}
              onCancel={() => setEditMode(null)}
            />
          ) : (
            <div>
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p>{item.body}</p>
              <div className="mt-2 flex space-x-2 justify-end">
                <button onClick={() => setEditMode(item.id)} className="bg-blue-500 text-white p-2">
                  <PencilAltIcon className="h-5 w-5 mr-2" />
                </button>
                <button onClick={() => confirmDelete(item.id, deleteItem)} className="bg-red-500 text-white p-2 rounded-sm">
                  <TrashIcon className="h-5 w-5 mr-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
