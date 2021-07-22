import React from 'react';
import './CreateModal.css';
import Button from '../button';

export default function CreateModal({type, modalTitle, handleSubmit, closeModalHandler}) {
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
                    {type === 'post' ? <div className="form__control">
                        <input
                        name="title"
                        id="title"
                        type="text"
                        placeholder="What about your dreams?.."
                        required
                        />
                        </div>
                        :
                        <React.Fragment>
                            <div className="form__control">
                                <input
                                    name="email"
                                    id="email"
                                    type="text"
                                    placeholder="example@mail.com"
                                    required
                                />
                            </div>
                            <div className="form__control">
                                <input
                                    name="name"
                                    id="name"
                                    type="text"
                                    placeholder="Comment about at..."
                                    required
                                />
                            </div>
                        </React.Fragment>
                    }
                    <div className="form__control">
                    <textarea
                        name="body"
                        id="body"
                        placeholder="Tell about something..."
                        required
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
    handleSubmit: () => {},
    type:"post"
};