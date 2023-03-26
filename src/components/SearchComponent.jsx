const SearchComponent = (props) => {
  return (
    <input
      class="border border-gray-200 rounded-lg px-4 py-2"
      ref={props.ref}
      type="number"
      name="search"
      placeholder="search pet by id"
      onBlur={(e) => props.handlePetIdChange(e.target.value)}
    />
  );
};

export default SearchComponent;
