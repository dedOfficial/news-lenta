import React from "react";

import './SearchForm.css';
import PropTypes from "prop-types";

export default function SearchForm({searchHandler}) {
    return (
        <div className="search-form">
            <form
                className="form"
                onSubmit={searchHandler}
            >
                <div className="form__control">
                    <input
                        name="search"
                        id="search"
                        type="text"
                        placeholder="Search..."
                    />
                </div>
                <div className="form__panel">
                    <button type="submit" className="btn brn_primary">Search</button>
                </div>
            </form>
        </div>
    );
}
SearchForm.propTypes = {
    searchHandler: PropTypes.func
}