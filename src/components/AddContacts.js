import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

export const AddContacts = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");


    const contacts = useSelector((state) => state);
    const dispatch = useDispatch();
     
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        const checkEmail = contacts.find(
            (contacts) => contacts.email === email && number
        );
        const checkNumber = contacts.find(
            (contacts) => contacts.number === parseInt(number)
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
            id: contacts[contacts.length - 1].id + 1,
            name,
            email,
            number
        };

        dispatch({ type: "ADD_CONTACT", payload: data });
        toast.success("Student added successfully!!");
        navigate("/");
        

    };
    return (
        <div>
            <div className='container'>
                <h4 className="display-3 my-5 text-center">Add Student</h4>
                <div className="row">
                    <div className="col-md-6 shadow mx-auto p-5">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" placeholder='Name' className='form-control' value={name} onChange={e => setName(e.target.value)} />
                            </div><br />
                            <div className="form-group">
                                <input type="email" placeholder='Email' className='form-control' value={email} onChange={e => setEmail(e.target.value)} />
                            </div><br />
                            <div className="form-group">
                                <input type="number" placeholder='Phone number' className='form-control' value={number} onChange={e => setNumber(e.target.value)} />
                            </div><br />
                            <div className="form-group">
                                <input type="submit" value="Add Student" className='btn btn-block btn-dark' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
