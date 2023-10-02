import { UpdateType, UserAction } from '../const.js';
import { RenderPosition } from '../render.js';
import { remove, render } from '../framework/render.js';
import TripItemEditView from '../view/trip-item-edit-view.js';
import { setStatus } from '../utils/utils.js';

export default class NewPointPresenter {
  #handleDataChange = null;
  #handleDestroy = null;
  #getDestinationDataByName = null;
  #getOffersByType = null;
  #renderEmptyList = null;

  #pointListContainer = null;
  #destinationsNames = null;
  #pointEditComponent = null;
  #types = null;

  constructor({
    pointListContainer,
    onDataChange,
    onDestroy,
    getDestinationDataByName,
    destinationsNames,
    getOffersByType,
    types,
    renderEmptyList
  }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#getDestinationDataByName = getDestinationDataByName;
    this.#destinationsNames = destinationsNames;
    this.#getOffersByType = getOffersByType;
    this.#types = types;
    this.#renderEmptyList = renderEmptyList;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }
    this.#pointEditComponent = new TripItemEditView({
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      getDestinationDataByName: this.#getDestinationDataByName,
      destinationsNames: this.#destinationsNames,
      isNewPoint: true,
      types: this.#types,
      getOffersByType: this.#getOffersByType
    });

    render(
      this.#pointEditComponent,
      this.#pointListContainer,
      RenderPosition.AFTERBEGIN
    );

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();
    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    setStatus(this.#pointEditComponent, {isSaving: true});
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(UserAction.ADD_POINT, UpdateType.MINOR, {
      ...point,
    });
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
      this.#renderEmptyList();
    }
  };
}
