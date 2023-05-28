import ReactPaginate from "react-paginate";
import VacPill from "./VacPill";
import { useRouter } from "next/router";
import { useState } from "react";
import NoResults from "./NoResults";

const PaginatedVacs = ({ itemsPerPage, initVacs }) => {
  const router = useRouter();
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const vacs = initVacs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(initVacs.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % initVacs.length;
    setItemOffset(newOffset);
  };

  const vacClickHandler = (vac) => {
    router.push(`vacancy/${vac.id}`);
  };

  if (initVacs.length === 0) {
    return (
      <NoResults
        text="Увы, ничего не найдено."
        isSmall={true}
        hasButton={false}
      />
    );
  } else {
    return (
      <div className="paginated-list">
        <ul className="vacancy-list">
          {vacs.map((vac) => (
            <VacPill
              onClick={() => vacClickHandler(vac)}
              key={vac.id}
              id={vac.id}
              profession={vac.profession}
              townTitle={vac.town.title}
              typeOfWorkTitle={vac.type_of_work.title}
              payFrom={vac.payment_from}
              payTo={vac.payment_to}
              currency={vac.currency}
              data-elem={`vacancy-${vac.id}`}
            />
          ))}
        </ul>
        <div>
          <ReactPaginate
            containerClassName="pagination-box"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    );
  }
};
export default PaginatedVacs;
