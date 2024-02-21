import { useEffect, useState } from "react";

type UserType = { id: number; firstName: string; lastName: string }

export default function AutoComplete() {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFiteredUsers] = useState<UserType[]>([]);


    async function fetchUsers() {

        try {
            setError(null);
            setLoading(true);

            const res = await fetch('https://dummyjson.com/users');
            const data = await res.json();

            if (data !== null && data.users != null)
                setUsers(data.users);

            setLoading(false);

        } catch (er: any) {
            setError(er.message);
        }
    }

    useEffect(() => {
        console.log('loading')
        fetchUsers();
    }, []);

    useEffect(() => {
        console.log(searchText);
        let list = users.filter(i => `${i.firstName.toLowerCase()} ${i.lastName.toLowerCase()}`.includes(searchText.toLowerCase()));
        if (list.length == 1 && `${list[0].firstName.toLowerCase()} ${list[0].lastName.toLowerCase()}` == searchText.toLowerCase())
            list = [];

        setFiteredUsers(list);
    }, [searchText]);

    return (
        <>
            {loading && <div className="loading">loading...</div>}
            {error !== null && <div>{error}</div>}

            <div className="search-autocomplete-wrapper">
                <input name="search-users" placeholder="Search users here.." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            </div>
            <div>
                {
                    filteredUsers.length > 0 && filteredUsers.map((user) => {
                        return (<div key={user.id} className="user-line">
                            <div onClick={() => setSearchText(`${user.firstName} ${user.lastName}`)} style={{ cursor: 'pointer' }}>{user.firstName} {user.lastName}</div>

                        </div>)
                    })
                }
            </div>
        </>
    )
}