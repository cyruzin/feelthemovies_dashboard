import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRecommendations } from "../../redux/ducks/recommendations";

import RecommendationsList from "./RecommendationsList";
import { Alert, NoResults, SectionHeader, Spinner } from "../Common";

function Recommendations() {
  const recommendations = useSelector((state) => state.recommendations);
  const dispatch = useDispatch();
  const { fetch, data, error, message } = recommendations;

  useEffect(() => {
    dispatch(getRecommendations());
  }, [dispatch]);

  return (
    <>
      <Alert message={error} variant="error" showAlert={error !== ""} />
      <Alert message={message} variant="success" showAlert={message !== ""} />
      <SectionHeader title="Recommendations" />
      {fetch && <Spinner />}

      {!fetch && data.length === 0 && (
        <NoResults
          message="No Results"
          withButton
          path="/dashboard/create_recommendation"
        />
      )}

      {!fetch && data.length > 0 && <RecommendationsList data={data} />}
    </>
  );
}

export default Recommendations;
