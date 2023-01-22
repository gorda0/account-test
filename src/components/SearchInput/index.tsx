import colors from "@constants/colors";

import { Input, SearchContainer, SearchIcon } from "./styles";

const SearchInput = () => {
  return (
    <SearchContainer>
      <SearchIcon name="search" size={20} color={colors.grayLight} />
      <Input placeholder="Pesquisar conta" />
    </SearchContainer>
  );
};

export default SearchInput;
