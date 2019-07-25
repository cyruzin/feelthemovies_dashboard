import React from 'react'
import RecommendationsList from './RecommendationsList';

function Recommendations () {
    return (
        <div>
            <div className="page-header">
                <div className="container-fluid">
                    <h2 className="h5 no-margin-bottom">
                        Recommendations
                    </h2>
                </div>
            </div>
            <RecommendationsList />
        </div>
    )
}


export default Recommendations