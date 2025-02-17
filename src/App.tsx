import React, { useEffect, useState } from "react";
import axios from "axios";
import { Item } from "./types/item";

const API_URL = process.env.REACT_APP_API_URL || "https://jsonplaceholder.typicode.com/posts";

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);


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



  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
    <h1 className="text-3xl font-bold text-center mb-6 text-white">Item List</h1>
    {items.map((item) => (
      <div key={item.id} className="mb-4 p-4 border border-white rounded">
        <h2 className="text-xl font-semibold">{item.title}</h2>
        <p>{item.body}</p>
      </div>
    ))}
  </div>
  
  );
};

export default App;
