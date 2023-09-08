import TripItemView from '../view/trip-item.js';
import TripItemEditView from '../view/trip-item-edit.js';
import { replace, render, remove } from '../framework/render.js';
import { Mod } from '../const.js';

export default class PointPresenter {
  #point = null;
  #destinationsNames = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #tripListComponent = null;
  #resetPoints = null;

  #handleDataChange = null;
  #handleDestinationChange = null;

  #mod = Mod.DEFAULT;

  constructor({ tripListComponent, onDataChange, onDestinationChange, resetPoints }) {
    this.#tripListComponent = tripListComponent;
    this.#handleDataChange = onDataChange;
    this.#handleDestinationChange = onDestinationChange;
    this.#resetPoints = resetPoints;
  }

  init(point, destinationsNames) {
    this.#point = point;
    this.#destinationsNames = destinationsNames;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new TripItemView({
      point: this.#point,
      onArrowClick: this.#openForm,
      onFavoriteChange: this.#handleFavoriteChange
    });

    this.#pointEditComponent = new TripItemEditView({
      point: this.#point,
      destinationsNames: this.#destinationsNames,
      onFormSubmit: this.#closeForm,
      onArrowClick: this.#closeForm,
      onTypeChange: this.#handleDataChange,
      onDestinationChange: this.#handleDestinationChange
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#tripListComponent.element);
      return;
    }

    if (this.#tripListComponent.element.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#tripListComponent.element.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #handleFavoriteChange = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #closeForm = () => {
    this.#replaceFormToCard();
    window.removeEventListener('keydown', this.#escKeydownHandler);
  };

  #openForm = () => {
    this.#resetPoints();
    this.#replaceCardToForm();
    window.addEventListener('keydown', this.#escKeydownHandler);
  };

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      window.removeEventListener('keydown', this.#escKeydownHandler);
    }
  };

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#mod = Mod.EDIT;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mod = Mod.DEFAULT;
  }

  setDefaultStatus() {
    if (this.#mod === Mod.DEFAULT) {
      return;
    }

    this.#replaceFormToCard();
  }
}
