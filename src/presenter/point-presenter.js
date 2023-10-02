import TripItemView from '../view/trip-item-view.js';
import TripItemEditView from '../view/trip-item-edit-view.js';
import { replace, render, remove } from '../framework/render.js';
import { Mod, UpdateType, UserAction } from '../const.js';
import { setStatus } from '../utils/utils.js';

export default class PointPresenter {
  #point = null;
  #destinationsNames = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #tripListComponent = null;
  #resetPoints = null;

  #handleDataChange = null;
  #getDestinationDataByName = null;
  #types = null;
  #getOffersByType = null;

  #mod = Mod.DEFAULT;

  constructor({
    tripListComponent,
    onDataChange,
    getDestinationDataByName,
    resetPoints,
    types,
    getOffersByType
  }) {
    this.#tripListComponent = tripListComponent;
    this.#getDestinationDataByName = getDestinationDataByName;
    this.#handleDataChange = onDataChange;
    this.#resetPoints = resetPoints;
    this.#types = types;
    this.#getOffersByType = getOffersByType;
  }

  init(point, destinationsNames) {
    this.#point = point;
    this.#destinationsNames = destinationsNames;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new TripItemView({
      point: this.#point,
      onArrowClick: this.#openForm,
      onFavoriteChange: this.#handleFavoriteChange,
    });

    this.#pointEditComponent = new TripItemEditView({
      point: this.#point,
      destinationsNames: this.#destinationsNames,
      getDestinationDataByName: this.#getDestinationDataByName,
      onFormSubmit: this.#handleFormSubmit,
      onArrowClick: this.#closeForm,
      onDeleteClick: this.#handleDeleteClick,
      types: this.#types,
      getOffersByType: this.#getOffersByType
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#tripListComponent.element);
      return;
    }

    if (this.#tripListComponent.element.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (
      this.#tripListComponent.element.contains(prevPointEditComponent.element)
    ) {
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
    this.#handleDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, {
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    });
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(UserAction.UPDATE_POINT, UpdateType.MINOR, point);
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(UserAction.DELETE_POINT, UpdateType.MINOR, point);
  };

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeForm();
    }
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

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#mod = Mod.EDIT;
  }

  #replaceFormToCard() {
    this.#pointEditComponent.updateElement({ ...this.#point });
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mod = Mod.DEFAULT;
  }

  setSaving() {
    if(this.#mod === Mod.EDIT) {
      setStatus(this.#pointEditComponent, {isSaving: true});
    }
  }

  setDeleting() {
    if(this.#mod === Mod.EDIT) {
      setStatus(this.#pointEditComponent, {isDeleting: true});
    }
  }

  setDefaultStatus() {
    if (this.#mod === Mod.DEFAULT) {
      return;
    }

    this.#replaceFormToCard();
  }

  setAborting() {
    if (this.#mod === Mod.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }
}
