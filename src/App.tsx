import React, { useEffect, useState } from "react";
import axios from "axios";
import { Item } from "./types/item";
import ItemList from "./components/itemList";
import ItemForm from "./components/itemForm";

const API_URL = process.env.REACT_APP_API_URL || "https://jsonplaceholder.typicode.com/posts";

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newTitle,setNewTitle] = useState<string>("")
  const [newBody,setNewBody] = useState<string>("")

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(API_URL);
        setItems(response.data.slice(0, 10)); // Limit to 10 items
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const addItem = async () => {
    if (!newTitle || !newBody) return;
    const newItem = { title: newTitle, body: newBody,id:Date.now() };
  
    try {
      const response = await axios.post(API_URL, newItem);
      setItems((prevItems) => [newItem,...prevItems]);
      setNewTitle("");
      setNewBody("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  
  // Delete item
  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  
  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
    <h1 className="text-3xl font-bold text-center mb-6 text-white">Item List</h1>
      <ItemForm
        newTitle={newTitle}
        newBody={newBody}
        setNewTitle={setNewTitle}
        setNewBody={setNewBody}
        addItem={addItem}
      />
       <ItemList items={items} deleteItem={deleteItem} />
  </div>
  
  );
};

export default App;
