import colors from "@constants/colors";

import { Input, SearchContainer, SearchIcon } from "./styles";

interface SearchInputProps {
  testID: string;
  onSearch: (value: string) => void;
}

const SearchInput = ({ testID, onSearch }: SearchInputProps) => {
  return (
    <SearchContainer>
      <SearchIcon name="search" size={20} color={colors.grayLight} />
      <Input testID={testID} placeholder="Pesquisar conta" onChangeText={onSearch} />
    </SearchContainer>
  );
};

export default SearchInput;
