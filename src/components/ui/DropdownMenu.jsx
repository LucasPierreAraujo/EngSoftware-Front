import { useState, useRef, useEffect } from 'react';

function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dropdown relative inline-block" ref={menuRef}>
      {children({ open, setOpen })}
    </div>
  );
}

function DropdownTrigger({ children, setOpen }) {
  return (
    <button
      onClick={() => setOpen(prev => !prev)}
      className="dropdown-trigger p-2 rounded hover:bg-gray-200"
    >
      {children}
    </button>
  );
}

function DropdownContent({ open, children }) {
  if (!open) return null;
  return (
    <div className="dropdown-content absolute right-0 mt-2 w-32 bg-white border rounded shadow">
      {children}
    </div>
  );
}

function DropdownItem({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="dropdown-item block w-full text-left px-4 py-2 hover:bg-gray-100"
    >
      {children}
    </button>
  );
}

export { DropdownMenu, DropdownTrigger, DropdownContent, DropdownItem };
