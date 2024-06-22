import React from "react";

const ListItem = ({ children, isActive = false, title }) => {
  const bgColor = isActive ? "bg-primary" : "bg-gray-100";
  
  return (
    <li 
    title={title}
    className={`flex flex-row justify-start items-center select-none cursor-pointer p-4 ${bgColor} bg-opacity-100 rounded-tr-3xl rounded-br-3xl transition-all
    hover:mb-2 hover:bg-primary hover:bg-opacity-80`}>
      {children}
      <p className="ml-6">{title}</p>
    </li>
  );
};

export default ListItem;
