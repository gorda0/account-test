import colors from "@constants/colors";

import { Input, SearchContainer, SearchIcon } from "./styles";

interface SearchInputProps {
  onSearch: (value: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  return (
    <SearchContainer>
      <SearchIcon name="search" size={20} color={colors.grayLight} />
      <Input placeholder="Pesquisar conta" onChangeText={onSearch} />
    </SearchContainer>
  );
};

export default SearchInput;
