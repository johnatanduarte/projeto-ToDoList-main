import { useState } from "react";

const ListRender = () => {
    const [list] = useState(["Maria", "Pedro", "Josias"]);
    const [user, setUsers] = useState([
        { id: 1, name: "Maria", age: 31},
        { id: 1, name: "Jones", age: 19},
        { id: 1, name: "Scorpion", age: 45},
    ]);

    const deleteRandom = () => {
        const randoMNumber = Math.floor(Math.random() * 4);

        setUsers((prevUsers) => {
            return prevUsers.filter((user) => randoMNumber !== user.id);
        });
    };

    return (
        <div>
            {/* render sem key primeiramente */}
            <ul>
              {list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <ul>
              {user.map((user) => (
                <li key={user.id}>
                    {user.name} - {user.age} anos
                </li>
              ))}
            </ul>
            <button onClick={deleteRandom}>Delete random user</button>
        </div>
    );
};

export default ListRender;