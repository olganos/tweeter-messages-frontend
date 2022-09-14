import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, InputGroup, Button, Form } from 'reactstrap';

export default function SearchUser() {
  const inputSearch = useRef(null);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputSearch.current.value) {
      return;
    }
    navigate(`/search-users/${inputSearch.current.value}`);
  };

  return (
    <Form onSubmit={onSubmit}>
      <InputGroup style={{ "width": "250px" }} size="sm">
        <Input
          placeholder="user name"
          innerRef={inputSearch}
        />
        <Button
          color="secondary"
          outline
        >
          Search
        </Button>
      </InputGroup>
    </Form>
  );
}