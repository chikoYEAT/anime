import { useState, useEffect } from "react";


interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://api.jikan.moe/v4/random/anime');
  const data = await response.json();
  return data;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
 useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }
    fetchData();
  }, []);  if (error) {
    return <div>Error: {error}</div>;
  }  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>User List</h1>
      <UserList />
    </div>
  );
}

export default App;