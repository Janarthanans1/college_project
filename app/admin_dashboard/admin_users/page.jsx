'use client'
import { useRouter } from "next/navigation";
import axios from "axios";
const { useState } = require("react");

const Tutor = () => {
    const router = useRouter()
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [dept, setDept] = useState('');
    const [email, setEmail] = useState('');

    // State for validation errors
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required.";
        if (!email.trim()) newErrors.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Enter a valid email address.";
        if (!dept) newErrors.dept = "Please select a department.";
        if (!password) newErrors.password = "Password is required.";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters long.";
        return newErrors;
    };

    const store = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Validate form fields
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors); // Display errors
            return;
        }

        console.log(name, password, dept, email);

        try {
            const response = await axios.post('./api/register_user', {
                name, password, dept, email
            });
            if(!response.data.status === 200){
                alert("Registration Failed!"); 
            }else{
                alert("Registration successful!"); 
            }
            // Reset form fields
            setName('');
            setEmail('');
            setDept('');
            setPassword('');
            setErrors({});
        } catch (error) {
            console.error(error);
            alert("Registration failed!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
                onSubmit={store}
            >
                <h1 className="text-2xl font-bold text-center mb-6">Tutor Register</h1>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:outline-none ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:outline-none ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="dept" className="block text-sm font-medium text-gray-700 mb-2">
                        Department
                    </label>
                    <select
                        name="dept"
                        id="dept"
                        className={`w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:outline-none ${errors.dept ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                        value={dept}
                        onChange={(e) => setDept(e.target.value)}
                    >
                        <option value="">-- Select Department --</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Hotel Management">Hotel Management</option>
                        <option value="Management">Management</option>
                        <option value="Physics">Physics</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Bio – Technology">Bio – Technology</option>
                        <option value="Microbiology">Microbiology</option>
                        <option value="English">English</option>
                        <option value="Forensic Science">Forensic Science</option>
                        <option value="Sanitary Inspector">Sanitary Inspector</option>
                    </select>
                    {errors.dept && <p className="text-red-500 text-sm mt-1">{errors.dept}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="Password"
                        className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:outline-none ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default Tutor;
