import SearchBook from "./SearchBook";
import SortBy from "./SortBy";

export default function Header({
  searchTerm,
  handleSearch,
  sortBy,
  handleSort,
}) {
  return (
    <header className="mb-8 lg:mb-10 mx-auto max-w-7xl md:px-4 xl:px-0">
      <div className="mx-auto  max-md:max-w-[95%]   max-md:space-y-4">
        <div>
          <h6 className="mb-2 text-base lg:text-xl">The Brightest Books of The World History.</h6>
          <h2 className="mb-6 font-['Playfair_Display'] text-3xl font-bold lg:text-4xl">
            Jepto Books Showcase
          </h2>

        </div>
        <div className="flex justify-between items-center">

          <SearchBook searchTerm={searchTerm} handleSearch={handleSearch} />
        <SortBy sortBy={sortBy} handleSort={handleSort} />
        </div>
      </div>
    </header>
  );
}