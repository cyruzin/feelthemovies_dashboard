// import React from 'react'

// function RecommendationsCreate () {

//     return (
//         <div>
//             <div className="container-fluid">
//                 <ul className="breadcrumb">
//                     <li className="breadcrumb-item">
//                         <Link to='/dashboard/recommendations'>
//                             Recommendations
//                             </Link>
//                     </li>
//                     <li className="breadcrumb-item active">Create</li>
//                 </ul>
//             </div>
//             <section className="no-padding-top">
//                 <div className="container-fluid">
//                     <div className="row">
//                         <div className="col-lg-12">

//                             <div className="block">
//                                 <div className="title">
//                                     <strong>Create recommendation</strong>
//                                 </div>
//                                 <div className="block-body">
//                                     {error !== '' ?
//                                         <Alert
//                                             message={error}
//                                             type='primary' />
//                                         : null
//                                     }
//                                     {created && error === '' ?
//                                         <Alert
//                                             message="Recommendation created successfully"
//                                             type='success' />
//                                         : null
//                                     }
//                                     <div className="form-group row">
//                                         <label className="col-lg-3 form-control-label">
//                                             Title
//                                             </label>
//                                         <div className="col-lg-9">
//                                             <input ref={this.titleRef}
//                                                 type="text"
//                                                 className="form-control" />
//                                         </div>
//                                     </div>
//                                     <div className="line"></div>

//                                     <div className="form-group row">
//                                         <label className="col-lg-3 form-control-label">
//                                             Body
//                                             </label>
//                                         <div className="col-lg-9">
//                                             <textarea
//                                                 className="form-control"
//                                                 rows="4"
//                                                 ref={this.editorRef}>
//                                             </textarea>
//                                         </div>
//                                     </div>
//                                     <div className="line"></div>

//                                     <div className="form-group row">
//                                         <label className="col-lg-3 form-control-label">
//                                             Type
//                                             </label>
//                                         <div className="col-lg-9">
//                                             <select
//                                                 onChange={this.handleType}
//                                                 ref={this.typeRef}
//                                                 className="form-control mb-3">
//                                                 <option value="0" defaultValue>
//                                                     Movie
//                                                     </option>
//                                                 <option value="1">TV Show</option>
//                                                 <option value="2">Mixed</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="line"></div>

//                                     <div className="form-group row">
//                                         <label className="col-lg-3 form-control-label">
//                                             Image
//                                             </label>
//                                         <div className="col-lg-9">
//                                             <Select
//                                                 showSearch
//                                                 size='large'
//                                                 value={imagesValue}
//                                                 style={{ width: '100%' }}
//                                                 defaultActiveFirstOption={false}
//                                                 notFoundContent={
//                                                     fetching ? <Spin size="small" /> : null
//                                                 }
//                                                 showArrow={false}
//                                                 filterOption={false}
//                                                 onSearch={this.fetchRecommendationImages}
//                                                 onChange={this.handleRecommendationImage}
//                                             >
//                                                 {images.map(v =>
//                                                     <Option key={v.id} value={v.id}>
//                                                         {v.hasOwnProperty('name') ?
//                                                             `${v.name} ${getYear(v.first_air_date)}`
//                                                             :
//                                                             `${v.title} ${getYear(v.release_date)}`
//                                                         }
//                                                     </Option>)
//                                                 }
//                                             </Select>
//                                         </div>
//                                     </div>
//                                     <div className="line"></div>

//                                     <div className="form-group row">
//                                         <label className="col-lg-3 form-control-label">
//                                             Genres
//                                             </label>
//                                         <div className="col-lg-9">
//                                             <Select
//                                                 mode="multiple"
//                                                 labelInValue
//                                                 value={this.props.genres.genresValue}
//                                                 size="large"
//                                                 notFoundContent={
//                                                     this.props.genres.loadingSearch ?
//                                                         <Spin size="small" />
//                                                         : null
//                                                 }
//                                                 filterOption={false}
//                                                 onSearch={this.searchGenres}
//                                                 onChange={this.genresChange}
//                                                 style={{ width: '100%' }}
//                                             >
//                                                 {this.props.genres.genres.map(k =>
//                                                     <Option key={k.id} value={k.id}>
//                                                         {k.name}
//                                                     </Option>)
//                                                 }
//                                             </Select>
//                                         </div>
//                                     </div>
//                                     <div className="line"></div>

//                                     <div className="form-group row">
//                                         <label className="col-lg-3 form-control-label">
//                                             Keywords
//                                             </label>
//                                         <div className="col-lg-9">
//                                             <Select
//                                                 mode="multiple"
//                                                 labelInValue
//                                                 value={this.props.keywords.keywordsValue}
//                                                 size="large"
//                                                 notFoundContent={
//                                                     this.props.keywords.loadingSearch
//                                                         ? <Spin size="small" />
//                                                         : null
//                                                 }
//                                                 filterOption={false}
//                                                 onSearch={this.searchKeywords}
//                                                 onChange={this.keywordsChange}
//                                                 style={{ width: '100%' }}
//                                             >
//                                                 {this.props.keywords.keywords.map(k =>
//                                                     <Option key={k.id} value={k.id}>
//                                                         {k.name}
//                                                     </Option>)
//                                                 }
//                                             </Select>
//                                         </div>
//                                     </div>
//                                     <div className="line"></div>


//                                     <div className="form-group row">
//                                         <div className="col-sm-9 ml-auto">
//                                             <button
//                                                 onClick={this.createRecommendation}
//                                                 className="btn btn-outline-success">
//                                                 Save
//                                                 </button>
//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </div >
//     )
// }

// export default RecommendationsCreate