import React from "react";

const Pagination = React.memo(({currentPage, setCurrentPage, 
                    todosPerPage, filteredTodos, 
                    totalPages, paginate}) =>{
                      
return(<>
        {filteredTodos.length > todosPerPage && (
            <div className="pagination">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}>Назад</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button key={number} onClick={() => paginate(number)}
                  className={currentPage === number ? 'active' : ''}>{number}</button>
              ))}
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}>Вперед</button>
            </div>
        )}</>
    )
});
export default Pagination;