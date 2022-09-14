import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, InputGroup, Button } from 'reactstrap';

export default function SearchUser() {
  const inputSearch = useRef(null);
  const navigate = useNavigate();

  const onSearchClick = () => {
    if (!inputSearch.current.value) {
      return;
    }
    navigate(`/search-users/${inputSearch.current.value}`);
  };

  return (
    <InputGroup style={{ "width": "250px" }} size="sm">
      <Input
        placeholder="user name"
        innerRef={inputSearch}
      />
      <Button
        color="secondary"
        outline
        onClick={onSearchClick}
      >
        Search
      </Button>
    </InputGroup>
  );
}