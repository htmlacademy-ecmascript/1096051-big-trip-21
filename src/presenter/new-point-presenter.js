import { nanoid } from 'nanoid';
import { UpdateType, UserAction } from '../const.js';
import { RenderPosition } from '../render.js';
import { remove, render } from '../framework/render.js';
import TripItemEditView from '../view/trip-item-edit.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #getDestinationDataByName = null;
  #destinationsNames = null;

  #pointEditComponent = null;

  constructor({
    pointListContainer,
    onDataChange,
    onDestroy,
    getDestinationDataByName,
    destinationsNames,
  }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#getDestinationDataByName = getDestinationDataByName;
    this.#destinationsNames = destinationsNames;
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

  #handleFormSubmit = (point) => {
    this.#handleDataChange(UserAction.ADD_POINT, UpdateType.MINOR, {
      id: nanoid(),
      ...point,
    });
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.ket === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
