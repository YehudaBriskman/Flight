import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const AuthWrapper = () => {
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

    return <Navbar user={user} />;
};

export default AuthWrapper;
