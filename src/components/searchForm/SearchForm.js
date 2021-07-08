import React from "react";

import './SearchForm.css';

export default function SearchForm() {
    return (
        <div className="search-form">
            <form className="form">
                <div className="form__control">
                    {/*<label htmlFor="search"><small>Search...</small></label>*/}
                    <input name="search"
                        id="search"
                        type="text"
                        placeholder="Search..."
                        required/>
                </div>
                <div className="form__panel">
                    <button type="submit" className="btn brn_primary">Search</button>
                </div>
            </form>
        </div>
    );
}