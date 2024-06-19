import React from "react";
import Header from "../../components/Templates/Header";
import ListItem from "../../components/Home/ListItem";

import {
  FaRegFile,
  FaRegRectangleList,
  FaRegBell,
  FaBoxArchive,
  FaRegTrashCan,
} from "react-icons/fa6";

const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex h-full">
        <div className="max-w-1/6 mt-2 font-poppins">
          <ul id="list" className="w-full">
            <ListElement isActive={true} icon={<FaRegFile size={20} />} title="Notas" />
            <ListElement isActive={false} icon={<FaRegRectangleList size={20} />} title="Lista de tareas" />
            <ListElement isActive={false} icon={<FaRegBell size={20} />} title="Recordatorios" />
            <ListElement isActive={false} icon={<FaBoxArchive size={20} />} title="Archivados" />
            <ListElement isActive={false} icon={<FaRegTrashCan size={20} />} title="Papelera" />
          </ul>
        </div>
        <div className="flex-1">
          <p className="p-4">Contenido</p>
        </div>
      </div>
    </div>
  );
};

// Elemento de cada lista del sidebar
const ListElement = ({ isActive, icon, title }) => {
  return (
    <ListItem isActive={isActive} title={title}>
      {icon}
    </ListItem>
  );
};

export default Home;
