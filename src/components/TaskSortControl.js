import React, { Component } from "react";

import { connect } from "react-redux";
import * as action from "../actions";

const sortDefault = JSON.parse(localStorage.getItem("sort")) || {
  sortBy: "name",
  sortStatus: 1,
};

class TaskSortControl extends Component {
  state = {
    sort: {
      sortBy: sortDefault.sortBy,
      sortStatus: sortDefault.sortStatus,
    },
  };

  handleSaveSort = (sort) => {
    this.setState({
      sort,
    });
  };

  render() {
    const { sort } = this.state;
    const { onSortTasks } = this.props;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li
              onClick={() => {
                onSortTasks({ sortBy: "name", sortStatus: 1 });
                this.handleSaveSort({ sortBy: "name", sortStatus: 1 });
              }}
            >
              <a
                role="button"
                title="tienhai"
                className={
                  sort.sortBy === "name" && sort.sortStatus === 1
                    ? "sort_selected"
                    : ""
                }
              >
                <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
              </a>
            </li>
            <li
              onClick={() => {
                onSortTasks({ sortBy: "name", sortStatus: -1 });
                this.handleSaveSort({ sortBy: "name", sortStatus: -1 });
              }}
            >
              <a
                role="button"
                className={
                  sort.sortBy === "name" && sort.sortStatus === -1
                    ? "sort_selected"
                    : ""
                }
              >
                <span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
              </a>
            </li>
            <li role="separator" className="divider"></li>
            <li
              onClick={() => {
                onSortTasks({ sortBy: "status", sortStatus: 1 });
                this.handleSaveSort({ sortBy: "status", sortStatus: 1 });
              }}
            >
              <a
                role="button"
                className={
                  sort.sortBy === "status" && sort.sortStatus === 1
                    ? "sort_selected"
                    : ""
                }
              >
                Trạng Thái Kích Hoạt
              </a>
            </li>
            <li
              onClick={() => {
                onSortTasks({ sortBy: "status", sortStatus: -1 });
                this.handleSaveSort({ sortBy: "status", sortStatus: -1 });
              }}
            >
              <a
                role="button"
                className={
                  sort.sortBy === "status" && sort.sortStatus === -1
                    ? "sort_selected"
                    : ""
                }
              >
                Trạng Thái Ẩn
              </a>
            </li>
          </ul>
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
    onSortTasks: (sort) => {
      dispatch(action.sortTasks(sort));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskSortControl);
