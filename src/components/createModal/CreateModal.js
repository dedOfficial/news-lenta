import React from 'react';
import './CreateModal.css';
import Button from '../button';

export default function CreateModal({modalTitle, handleSubmit, closeModalHandler}) {
    return (
        <section className="create-modal">
            <div
                className="create-modal__close"
                onClick={closeModalHandler}
            >&times;</div>
            <h3> {modalTitle} </h3>
            <div className="create-form">
                <form
                    className="form"
                    onSubmit={handleSubmit}
                >
                    <div className="form__control">
                        <input
                            name="title"
                            id="title"
                            type="text"
                            placeholder="What about your dreams?.."
                        />
                    </div>
                    <div className="form__control">
                    <textarea
                        name="body"
                        id="body"
                        type="text"
                        placeholder="Tell about something..."
                    />
                    </div>
                    <div className="form__panel">
                        <Button type="submit" text="Done"/>
                    </div>
                </form>
            </div>
        </section>

    );
}

CreateModal.defaultProps = {
    handleSumbit: () => {}
};