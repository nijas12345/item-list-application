import React, { useEffect, useState } from "react";
import axios,{AxiosError} from "axios";
import { Item } from "./types/item";
import ItemList from "./components/itemList";
import ItemForm from "./components/itemForm";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL || "https://jsonplaceholder.typicode.com/posts";
const itemsPerPage = 10;

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newBody, setNewBody] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data.slice(0, 100);
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        setItems(data.slice(indexOfFirstItem, indexOfLastItem));
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, [currentPage]);

  const addItem = async () => {
  if (!newTitle) return toast.error("Enter title");
  if (newTitle.length < 3) return toast.error("Title must be more than 3 letters");
  if (!newBody) return toast.error("Enter description");
  if (newBody.length < 5) return toast.error("Description must be more than 5 letters");

  const newItem = { title: newTitle, body: newBody, id: Date.now() };

    try {
      await axios.post(API_URL, newItem);
      setItems((prevItems) => [newItem, ...prevItems]);
      setNewTitle("");
      setNewBody("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateItem = (id: number, updatedItem: Item) => setItems(items.map(item => item.id === id ? updatedItem : item));
  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setItems(items.filter(item => item.id !== id));
    }  catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Error adding item:", error.response?.data);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const totalPages = Math.ceil(100 / itemsPerPage);

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Item List</h1>
      <ItemForm newTitle={newTitle} newBody={newBody} setNewTitle={setNewTitle} setNewBody={setNewBody} addItem={addItem} />
      <ItemList items={items} deleteItem={deleteItem} updateItem={updateItem} />
      <div className="mt-4 flex justify-between items-center">
        <button onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} className="bg-blue-500 text-white p-2 rounded">Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} className="bg-blue-500 text-white p-2 rounded">Next</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
