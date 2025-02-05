'use client';

import { useState, useEffect } from 'react';

export default function Page() {
    const [users, setUsers] = useState([]);
    const [editMode, setEditMode] = useState("Add");
    const [selUser, setSelUser] = useState({
        id: "",
        name: "",
        password: "",
        address: "",
        email: "",
        tel: ""
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setSelUser({ ...selUser, [name]: value });
    }

    const saveUser = (e) => {
        if (editMode === "Add") {
            fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selUser),
            })
                .then((res) => res.json())
                .then((data) => {
                    setUsers([...users, data]);
                    setSelUser({
                        id: "",
                        name: "",
                        password: "",
                        address: "",
                        email: "",
                        tel: ""
                    });
                });
        } else {
            fetch(`/api/users/${selUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selUser),
            })
                .then((res) => res.json())
                .then((data) => {
                    setUsers(users.map((user) => (user.id === data.id ? data : user)));
                    setSelUser({
                        id: "",
                        name: "",
                        password: "",
                        address: "",
                        email: "",
                        tel: ""
                    });
                    setEditMode("Add");
                });
        }
    };


    // Helper to format timestamp to yyyy/mm/dd hh:mm:ss in Japanese time zone
    function formatDate(date) {
        const d = new Date(date);
        return d.toLocaleString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: "Asia/Tokyo",
        }).replace(/(\d+)\/(\d+)\/(\d+),/, "$1/$2/$3");
    }

    useEffect(() => {
        fetch('/api/users')
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);

    return (
        <div className="p-4">
            <h1 className='2xl'>Users</h1>
            <table className="table-fixed w-full mt-4 border-collapse border border-solid border-blue-200">
                <thead>
                    <tr>
                        <th className="border border-solid border-blue-200">Action</th>
                        <th className="border border-solid border-blue-200">ID</th>
                        <th className="border border-solid border-blue-200">Name</th>
                        <th className="border border-solid border-blue-200">Password</th>
                        <th className="border border-solid border-blue-200">Address</th>
                        <th className="border border-solid border-blue-200">Email</th>
                        <th className="border border-solid border-blue-200">Tel</th>
                        <th className="border border-solid border-blue-200">CreatedAt</th>
                        <th className="border border-solid border-blue-200">UpdatedAt</th>
                    </tr>
                </thead>
                <tbody>
                    {/* New input row */}
                    <tr>
                        <td className="border border-solid border-blue-200 text-center w-[200px]">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={saveUser}>{editMode}</button>
                        </td>
                        <td className="border border-solid border-blue-200">
                            <input type="text" placeholder="ID" disabled className="p-2 w-full" />
                        </td>
                        <td className="border border-solid border-blue-200">
                            <input type="text" placeholder="Name" className="p-2 w-full" name="name" value={selUser.name} onChange={handleInputChange} />
                        </td>
                        <td className="border border-solid border-blue-200">
                            <input type="text" placeholder="Password" className="p-2 w-full" name="password" value={selUser.password} onChange={handleInputChange}/>
                        </td>
                        <td className="border border-solid border-blue-200">
                            <input type="text" placeholder="Address" className="p-2 w-full" name="address" value={selUser.address} onChange={handleInputChange} />
                        </td>
                        <td className="border border-solid border-blue-200">
                            <input type="email" placeholder="Email" className="p-2 w-full" name="email" value={selUser.email} onChange={handleInputChange} />
                        </td>
                        <td className="border border-solid border-blue-200">
                            <input type="tel" placeholder="Tel" className="p-2 w-full" name="tel" value={selUser.tel} onChange={handleInputChange} />
                        </td>
                        <td className="border border-solid border-blue-200">
                            <input type="text" placeholder="CreatedAt" disabled className="p-2 w-full bg-gray-200" />
                        </td>
                        <td className="border border-solid border-blue-200">
                            <input type="text" placeholder="UpdatedAt" disabled className="p-2 w-full bg-gray-200" />
                        </td>
                    </tr>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border border-solid border-blue-200 text-center w-[200px]">
                                {/* Selected option */}
                                <input type="checkbox" className="mr-2" checked={selUser.id === user.id} onChange={e => {
                                    if (e.target.checked) {
                                        setSelUser(user);
                                        setEditMode("Update");
                                    } else {
                                        setSelUser({
                                            id: "",
                                            name: "",
                                            password: "",
                                            address: "",
                                            email: "",
                                            tel: ""
                                        });
                                        setEditMode("Add");
                                    }
                                }}/>
                            </td>
                            <td className="border border-solid border-blue-200">{user.id}</td>
                            <td className="border border-solid border-blue-200">{user.name}</td>
                            <td className="border border-solid border-blue-200">********</td>
                            <td className="border border-solid border-blue-200">{user.address}</td>
                            <td className="border border-solid border-blue-200">{user.email}</td>
                            <td className="border border-solid border-blue-200">{user.tel}</td>
                            <td className="border border-solid border-blue-200">{formatDate(user.createdAt)}</td>
                            <td className="border border-solid border-blue-200">{formatDate(user.updatedAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}