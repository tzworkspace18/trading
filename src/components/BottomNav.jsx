import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiPlusCircle, FiMinusCircle, FiList } from 'react-icons/fi';

const Item = ({ to, icon: Icon, label }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link to={to} className={`flex flex-col items-center justify-center flex-1 py-2 ${active ? 'text-black' : 'text-gray-500'}`}>
      <Icon className="text-xl" />
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-screen-md mx-auto flex">
        <Item to="/" icon={FiHome} label="Home" />
        <Item to="/buy" icon={FiPlusCircle} label="Buy" />
        <Item to="/sell" icon={FiMinusCircle} label="Sell" />
        <Item to="/history" icon={FiList} label="History" />
      </div>
    </nav>
  );
}
