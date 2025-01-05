interface FilterModalProps {
  isFilterModalOpen: boolean;
  handleCloseFilterModal: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isFilterModalOpen,
  handleCloseFilterModal,
}) => {
  if (!isFilterModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg p-3 sm:p-4 max-w-xs sm:max-w-sm w-full mx-2 sm:mx-4">
        <h2 className="text-sm sm:text-base font-bold text-accent mb-3 sm:mb-4 text-start">
          Фільтри
        </h2>
        <form className="grid grid-cols-1 gap-3 sm:gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Categories:
              </h3>
              <div className="space-y-2">
                {[
                  "Electronic",
                  "Clothing",
                  "Travel",
                  "Beauty and Health",
                  "Games and Entertainment",
                ].map((category) => (
                  <label
                    key={category}
                    className="flex items-center text-gray-700 text-xs sm:text-sm"
                  >
                    <input
                      type="checkbox"
                      value={category}
                      className="mr-2"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Sorting Options:
              </h3>
              <div className="space-y-2">
                {[
                  "By maximum cashback",
                  "By minimum cashback",
                  "By new companies",
                ].map((sortOption) => (
                  <label
                    key={sortOption}
                    className="flex items-center text-gray-700 text-xs sm:text-sm"
                  >
                    <input
                      type="checkbox"
                      value={sortOption}
                      className="mr-2"
                    />
                    {sortOption}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Offers:
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {["New", "Hits"].map((offerType) => (
                <label
                  key={offerType}
                  className="flex items-center text-gray-700 text-xs sm:text-sm"
                >
                  <input
                    type="checkbox"
                    value={offerType}
                    className="mr-2"
                  />
                  {offerType}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="bg-gray-300 text-black text-xs sm:text-sm px-3 py-2 rounded hover:bg-gray-400 transition"
              onClick={handleCloseFilterModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-accent text-white text-xs sm:text-sm px-3 py-2 rounded hover:bg-blue-600 transition"
              onClick={handleCloseFilterModal}
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterModal;
