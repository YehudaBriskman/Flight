import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';


const Navbar = () => {
    // בדיקה האם קיים משתמש ב-LocalStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // הגדרת משתנה למשתמש עם המצב המתאים
    const [user, setUser] = useState(storedUser || null);

    // Effect Hook לטיפול בשינויים ב-LocalStorage
    useEffect(() => {
        // קריאה לפונקציה המתעדכנת בכל שינוי ב-LocalStorage
        const handleStorageChange = () => {
            const updatedUser = JSON.parse(localStorage.getItem('user'));
            setUser(updatedUser);
        };

        // האזנה לשינויים ב-LocalStorage
        window.addEventListener('storage', handleStorageChange);

        // הסרת האזנה לסיום השימוש ב-Effect Hook
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []); // מועבר רשימת תלות ריקה כדי שה-Effect יתבצע רק פעם אחת לאחר טעינת הקומפוננטה

    const handleLogout = () => {
        // מחיקת המשתמש מה-LocalStorage
        localStorage.removeItem('user');
        // איפוס המשתמש בסטייט
        setUser(null);
    };

    return (
        <div className='min-h-[100vh] bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 rounded-lg text-black'>
            <header className='pb-6'>
                <nav className='bg-slate-900 p-4 flex justify-between'>
                    <div className='p-4'>
                        <Link className='text-white mx-3' to="/">Home</Link>
                        {/* תוסיף לינק להוספת טיסה רק אם יש משתמש מחובר */}
                        {user && <Link className='text-white mx-3' to="/flightDetails">Add Flight</Link>}
                        {/* תוסיף לינק לחיפוש טיסות רק אם יש משתמש מחובר */}
                        {user && <Link className='text-white mx-3' to="/searchFlights">Search Flights</Link>}
                    </div>
                    <div className='p-4'>
                        {user ? (
                            <div className='text-white'>
                                {/* תציג את המשתמש אם קיים */}
                                <span className='mx-3'>{user.name}</span>
                                {/* וכפתור להתנתקות */}
                                <button className='text-red-500 mx-3' onClick={handleLogout}>Logout</button>
                            </div>
                        ) : (
                            <div>
                                {/* אחרת, תציג כפתורים להתחברות והרשמה */}
                                <Link className='text-white mx-3' to="/login">Log-in</Link>
                                <Link className='text-white mx-3' to="/signup">Sign up</Link>
                            </div>
                        )}
                    </div>
                </nav>
            </header>
            <div className='px-4'>
                <Outlet />
            </div>
        </div>
    );
};

export default Navbar;
