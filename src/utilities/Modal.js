import { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, user }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
          }
        };
    
        if (isOpen) {
          document.addEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);
    
    if (!isOpen) return null;


  
    return (
      <div className="_modal_overlay">
        <div ref={modalRef} className="_modal">
            <button className="_modal_close" onClick={onClose}>Close</button>
            <div className="_user_card center">
                <header>
                    <div className="_user_card_personal_info">
                        <span>
                            {user.id}
                        </span>
                        <span className="_user_card_personal_info_title">
                            {user.name}
                        </span>
                        <span className="">
                            ({user.username})
                        </span>
                    </div>
                    <span>{user.website}</span>
                </header>
                    <div className="_user_card_personal_info_bio">
                        <p>
                           Address: {user.address.street} , {user.address.suite} , {user.address.city} , {user.address.zipcode}
                        </p>
                        <ul>
                            <li>
                                <span>email: {user.email}</span>
                                <span>phone: {user.phone}</span>
                            </li>
                        </ul>
                    </div>
                </div>

        </div>
      </div>
    );
};

export default Modal