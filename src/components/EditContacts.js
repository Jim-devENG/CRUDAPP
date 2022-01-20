import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, } from 'react-router-dom'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditContacts = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    const { id } = useParams();

    const contacts = useSelector((state) => state);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
    );

    useEffect(() => {
        if (currentContact) {
            setName(currentContact.name);
            setEmail(currentContact.email);
            setNumber(currentContact.number);
        }
    }, [currentContact]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const checkEmail = contacts.find(
            (contacts) => contacts.id !== parseInt(id) && contacts.email === email
        );
        const checkNumber = contacts.find(
            (contacts) => contacts.id !== parseInt(id) && contacts.number === parseInt(number)
        );

        if (!email || !number || !name) {
            return toast.warning("Please fill in all fields!")
        }

        if (checkEmail) {
            return toast.error("This email already Exist");
        }
        if (checkNumber) {
            return toast.error("This number already Exist");
        }

        const data = {
            id: parseInt(id),
            name,
            email,
            number
        };

        dispatch({ type: "UPDATE_CONTACT", payload: data });
        toast.success("Student Updated successfully!!");
        navigate("/");
    };
    

    return (
        <div>
            <div className='container'>
                {currentContact ? (
                    <>
                        <h4 className="display-3 my-5 text-center">Edit Student</h4>
                        <div className="row">
                            <div className="col-md-6 shadow mx-auto p-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input type="text" placeholder='Name' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                                    </div><br />
                                    <div className="form-group">
                                        <input type="email" placeholder='Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div><br />
                                    <div className="form-group">
                                        <input type="number" placeholder='Phone number' className='form-control' value={number} onChange={(e) => setNumber(e.target.value)} />
                                    </div><br />
                                    <div className="form-group">
                                        <input type="submit" value="Update Student" className='btn btn-dark' />
                                        <Link to="/" className='btn btn-dark mr-3' >Cancel</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                ) : (
                    <h1 class="display-3 my-5 text-center">
                        Student contact {id} does not exist
                    </h1>
                )}
            </div>
        </div>
    );
};
