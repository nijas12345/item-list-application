import React, { useState } from "react";
import { Item } from "../types/item"
import { TrashIcon, PencilAltIcon } from '@heroicons/react/solid';


interface ItemListProps {
  items: Item[];
  deleteItem: (id: number) => void;
 
}

const ItemList: React.FC<ItemListProps> = ({ items, deleteItem }) => {

  return (
    <div>
    {items.map((item) => (
      <div key={item.id} className="mb-4 p-4 border border-white rounded">
        <div>
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p>{item.body}</p>
        </div>
        <div className="mt-2 flex space-x-2 justify-end">
          <button className="bg-blue-500 text-white p-2">
            <PencilAltIcon className="h-5 w-5 mr-2"/>
          </button>
          <button
            onClick={() => deleteItem(item.id)}
            className="bg-red-500 text-white p-2"
          >
            <TrashIcon className="h-5 w-5 mr-1" />
          </button>
        </div>
      </div>
    ))}
  </div>
  );
};

export default ItemList;
