import React from "react";

const Filters = React.memo(({setFilter, setCurrentPage, filter})=>{
    return(
        <div className="filters">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => {
            setFilter('all');
            setCurrentPage(1);
          }}
        >
          Все
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''} 
          onClick={() => {
            setFilter('active');
            setCurrentPage(1);
          }}
        >
          Активные
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''} 
          onClick={() => {
            setFilter('completed');
            setCurrentPage(1);
          }}
        >
          Завершенные
        </button>
      </div>
    )
})
export default Filters;