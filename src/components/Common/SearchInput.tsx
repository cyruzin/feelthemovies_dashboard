import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import InputLabel from "./InputLabel";

interface Props {
  path: string;
  placeholder?: string;
};


function SearchInput(props: Props) {
  const { placeholder = 'Busca', path } = props;
  const { push } = useHistory();
  const [searchKeyword, setSearchKeyword] = useState('');

  function searchHandler() {
    if (searchKeyword === '') return false;

    return push(`${path}?query=${searchKeyword}`, {
      query: encodeURIComponent(searchKeyword),
    });
  }

  function getKeyword(event: any) {
    setSearchKeyword(event.target.value);
  }

  function isEnterPressed(event: any) {
    if (event.keyCode === 13) searchHandler();
  }

  return (
    <div className="form-group row">
      <div className="col-lg-6">
        <InputLabel
          type="text"
          className="form-control"
          placeholder={placeholder}
          onKeyDown={isEnterPressed}
          onChange={getKeyword}
        />
      </div>
    </div>
  );
}

export default SearchInput;
