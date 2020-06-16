import React, { useEffect, useState } from "react";
import api from './services/api';
import "./styles.css";

export default () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await api.get('repositories');
      setData(response.data);
    })();

  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Esse é um novo repo",
      url: "http://localhost:3000/",
      techs: [
        "react",
        "node",
        "postgres",
        "esta",
        "caralho"
      ]
    });
    setData([...data, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {data.map(item => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}
