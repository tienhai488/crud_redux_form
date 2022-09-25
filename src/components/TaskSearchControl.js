import React, { Component } from "react";

import { connect } from "react-redux";
import * as action from "../actions";

class TaskSearchControl extends Component {
  state = {
    keyword: "",
  };

  onHandleChange = (event) => {
    this.setState({
      keyword: event.target.value,
    });
  };

  onSearch = () => {
    this.props.onSearchTasks(this.state.keyword);
    this.setState({
      keyword: "",
    });
    document.getElementById("form-search").focus();
  };

  render() {
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="input-group">
          <input
            name="keyword"
            value={this.state.keyword}
            type="text"
            id="form-search"
            className="form-control"
            placeholder="Nhập từ khóa..."
            onChange={this.onHandleChange}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.onSearch}
            >
              <span className="fa fa-search mr-5"></span>Tìm
            </button>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSearchTasks: (keyword) => {
      dispatch(action.searchTasks(keyword));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskSearchControl);
