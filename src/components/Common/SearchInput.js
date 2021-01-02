// @flow
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import InputLabel from "./InputLabel";

type Props = {
  path: string,
  placeholder?: string,
};

SearchInput.defaultProps = {
  placeholder: "Busca",
};

function SearchInput(props: Props) {
  const { placeholder, path } = props;
  const { push } = useHistory();
  const [searchKeyword, setSearchKeyword] = useState("");

  function searchHandler() {
    if (searchKeyword === "") return false;

    return push(`${path}?query=${searchKeyword}`, {
      query: encodeURIComponent(searchKeyword),
    });
  }

  function getKeyword(event) {
    setSearchKeyword(event.target.value);
  }

  function isEnterPressed(event) {
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
