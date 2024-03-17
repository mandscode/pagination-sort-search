import { useContext, useEffect, useState } from "react";
import useFetch from "../useFetch/useFetch";
import Modal from "../../utilities/Modal";
import { AppContext } from "../Context/AppContext";

const UserInfo = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [searchVal, setSearchVal] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);  

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const sortBy = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedItems = [...filteredProducts].sort((a, b) => {
        if (sortConfig.key && a[sortConfig.key] && b[sortConfig.key]) {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
        }
        return 0;
    });


    const closeModal = () => {
        setIsOpen(false);
    };
  
    const openModal = (user) => {
        setSelectedUser(user);
        setIsOpen(true);
    };

    const handleInput = (e) => {
        setSearchVal(e.target.value);
    }


    
    const {data, loading, error} = useFetch("https://jsonplaceholder.typicode.com/users");
    
    const [listItems, setListItems] = useState('');
    const [itemPerPage, setItemPerPage] = useState(5);
    const [currentPage, SetCurrentPage] = useState(1);
    const [numOfButtons, SetNumOfButtons] = useState([]);
    
    const [pageItem, SetPageItem] = useState({
        start: 0,
        end: itemPerPage
    })

    
    const onPageChangeEvent = (start, end) => {
        SetPageItem({
            start: start,
            end: end
        })
    }
    
    const prevPageClick = () => {
        if (currentPage === 1) {
            SetCurrentPage(currentPage);
        } else {
            SetCurrentPage(currentPage - 1);
        }
    }

    const nextPageClick = () => {
        if (currentPage === numOfButtons.length) {
            SetCurrentPage(currentPage);
        } else {
            SetCurrentPage(currentPage + 1);
        }
    }
    
    const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);   
    
    useEffect(() => {
        setListItems(data);
        const numOfPages = Math.ceil(listItems.length / itemPerPage);
        
        const buttonsArray = [];
        for (let i = 1; i <= numOfPages; i++) {
            buttonsArray.push(i);
        }
        SetNumOfButtons(buttonsArray);
        let tempNumberOfButtons = [...arrOfCurrButtons]

        let dotsInitial = '...'
        let dotsLeft = '... '
        let dotsRight = ' ...'
        
        if (buttonsArray.length < 6) {
            tempNumberOfButtons = buttonsArray
        }
        
        
        else if (currentPage >= 1 && currentPage <= 3) {
            tempNumberOfButtons = [1, 2, 3, 4, dotsInitial, buttonsArray.length]
        }

        else if (currentPage === 4) {
            const sliced = buttonsArray.slice(0, 5)
            tempNumberOfButtons = [...sliced, dotsInitial, buttonsArray.length]
        }
        
        else if (currentPage > 4 && currentPage < numOfButtons.length - 2) {
            // from 5 to 8 -> (10 - 2)
            const sliced1 = numOfButtons.slice(currentPage - 2, currentPage)
            // sliced1 (5-2, 5) -> [4,5] 
            const sliced2 = numOfButtons.slice(currentPage, currentPage + 1)
            // sliced1 (5, 5+1) -> [6]
            tempNumberOfButtons = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numOfButtons.length])
            // [1, '...', 4, 5, 6, '...', 10]
        }

        else if (currentPage > numOfButtons.length - 3) {
            // > 7
            const sliced = numOfButtons.slice(numOfButtons.length - 4)
            // slice(10-4) 
            tempNumberOfButtons = ([1, dotsLeft, ...sliced])
        }
        
        else if (currentPage === dotsInitial) {
            SetCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1)
        }
        else if (currentPage === dotsRight) {
            SetCurrentPage(arrOfCurrButtons[3] + 2)
        }
        
        else if (currentPage === dotsLeft) {
            SetCurrentPage(arrOfCurrButtons[3] - 2)
        }
        
        setArrOfCurrButtons(tempNumberOfButtons);
        const value = currentPage * itemPerPage;
        
        onPageChangeEvent(value - itemPerPage, value)
        setListItems(filteredProducts)
    }, [currentPage, itemPerPage, listItems, data, filteredProducts]);
    


    const updateNavbarData = () => {
        // setListItems(filteredProducts);
        // console.log(listItems)
        setSearchVal('');
    };

    useEffect(() => {
        if (Array.isArray(data)) {
            const filteredUsers = data.filter((user) => {
                return user.name.toLowerCase().includes(searchVal.toLowerCase()) || user.username.toLowerCase().includes(searchVal.toLowerCase());
            });
            // console.log(listItems)
            setFilteredProducts(filteredUsers);
        }    
    }, [searchVal, data])

    return (
        <>
            {
                loading && <div className="_user_info _container">Loading............</div>
            }
            {
                data.length > 1 && 
                <div className="_user_info">
                    <div className="_container">

                    <ul className="_navbar_items">
                        <div className="_input_group">
                            <div className="_input_field_wrapper">
                                <div className="_input_field_items">
                                    <input 
                                    id="text"
                                    type="text" 
                                    name="name" 
                                    value={searchVal}
                                    placeholder="Search..." 
                                    onChange={handleInput}
                                    className="_input_field _icon_left"
                                    />
                                    <span className="_input_field_icon_wrapper _input_field_icon_left">
                                        <svg className="_input_icon" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.99671 0C6.86174 0 4.29688 2.56209 4.29688 5.69366C4.29688 8.82524 6.86174 11.3873 9.99671 11.3873C13.1317 11.3873 15.6965 8.82524 15.6965 5.69366C15.6965 2.56209 13.1317 0 9.99671 0ZM9.99671 9.49023C7.90633 9.49023 6.19602 7.78178 6.19602 5.69366C6.19602 3.60555 7.90633 1.89709 9.99671 1.89709C12.0871 1.89709 13.7974 3.60555 13.7974 5.69366C13.7974 7.78178 12.0871 9.49023 9.99671 9.49023Z" fill="#AAAAAA" />
                                            <path d="M10.0002 13.9504C6.46129 13.9504 3.06458 15.4213 0.641936 18.0073L0.00012207 18.695L1.37817 19.9999L2.01998 19.3122C4.11036 17.082 6.93697 15.8487 10.0002 15.8487C13.0635 15.8487 15.8901 17.082 17.9805 19.3122L18.6223 19.9999L20.0003 18.695L19.3585 18.0073C16.9359 15.4452 13.5392 13.9504 10.0002 13.9504Z" fill="#AAAAAA" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="_input_group">
                            <button onClick={() => sortBy('name')} className="_button _is_primary _is_small">Sort by Name Asc/Des</button>
                        </div>
                    </ul>
                    <div className="_user_info_container">
                    <table className="_user_info_wrapper">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>User Name</th>
                                <th>City</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sortedItems && sortedItems.slice(pageItem.start, pageItem.end).map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td onClick={() => {openModal(user)}} className="_user_info_title">{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.address.city}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    </div>

                    <div className="table-filter-info">
                        <div className="_pagination">
                            <ul className="_pagination_ul">
                                <li className={`_pagination_li ${currentPage===1 ? 'disabled': ''}`}>
                                    <a className="_pagination_link" onClick={prevPageClick}>Prev</a>
                                </li>
                                {/* {console.log(arrOfCurrButtons )} */}
                                { arrOfCurrButtons.map((data, index) => { return (
                                <li key={index} className={`_pagination_li ${currentPage===data ? 'active' : ''}`}>
                                    <a className="_pagination_link" onClick={()=> SetCurrentPage(data)}>{data}</a>
                                </li>

                                ) }) }
                                <li className={`_pagination_li ${currentPage===numOfButtons.length ? 'disabled': ''}`}>
                                    <a className="_pagination_link" onClick={nextPageClick}>Next</a>
                                </li>
                                {/* {console.log(currentPage,numOfButtons.length)} */}
                            </ul>
                        </div>
                    </div>
                    </div>
                </div>
            }
            {
                error && <div className="_user_info _container">Error</div>
            }

            {isOpen && <Modal isOpen={isOpen} onClose={closeModal} user={selectedUser} />}
        </>
    );
}
 
export default UserInfo;